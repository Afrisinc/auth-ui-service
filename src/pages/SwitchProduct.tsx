import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchMyAccounts, switchProduct } from "@/services/userService";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, Layers, Repeat2, Loader2, ExternalLink } from "lucide-react";
import type { AccountProductEnrollment } from "@/types/platform";

const PLAN_VARIANT: Record<string, "default" | "secondary" | "outline"> = {
  FREE: "outline",
  PRO: "secondary",
  ENTERPRISE: "default",
};

const SwitchProduct = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [switchingId, setSwitchingId] = useState<string | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["my-accounts", user?.id],
    queryFn: () => fetchMyAccounts(user!.id),
    enabled: !!user?.id,
  });

  const { mutate: doSwitch } = useMutation({
    mutationFn: ({ accountId, productCode }: { accountId: string; productCode: string }) =>
      switchProduct(accountId, productCode),
    onSuccess: (result, variables) => {
      toast({
        title: "Switching product",
        description: `Redirecting to ${variables.productCode}...`,
      });
      if (result.redirect_url) {
        window.location.href = result.redirect_url;
      }
      setSwitchingId(null);
    },
    onError: () => {
      toast({
        title: "Switch failed",
        description: "Could not switch product. Please try again.",
        variant: "destructive",
      });
      setSwitchingId(null);
    },
  });

  const handleSwitch = (accountId: string, product: AccountProductEnrollment) => {
    const key = `${accountId}-${product.id}`;
    setSwitchingId(key);
    doSwitch({ accountId, productCode: product.product?.code || product.product_id });
  };

  const accounts = data?.accounts || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Switch Product</h1>
        <p className="text-muted-foreground">
          Select an account and product to switch to
        </p>
      </div>

      {isLoading ? (
        <div className="grid md:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <Skeleton key={i} className="h-64 w-full" />
          ))}
        </div>
      ) : accounts.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <CreditCard className="w-10 h-10 text-muted-foreground mb-3" />
            <p className="text-muted-foreground">No accounts found.</p>
            <p className="text-sm text-muted-foreground mt-1">
              Create an account to enroll in products.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {accounts.map((account) => {
            const isOwner = account.owner_user_id === user?.id;
            const role = isOwner ? "OWNER" : "MEMBER";

            return (
              <Card key={account.id} className="flex flex-col">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-semibold flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-primary" />
                      <span className="font-mono">{account.id.slice(0, 12)}...</span>
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {account.type}
                      </Badge>
                      <Badge
                        variant={role === "OWNER" ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {role}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="flex-1">
                  {!account.products || account.products.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      No enrolled products
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {account.products.map((product) => {
                        const key = `${account.id}-${product.id}`;
                        const isSwitching = switchingId === key;

                        return (
                          <div
                            key={product.id}
                            className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/30"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center">
                                <Layers className="w-4 h-4 text-primary" />
                              </div>
                              <div>
                                <p className="text-sm font-medium">
                                  {product.product?.name || product.product_id}
                                </p>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                  <Badge
                                    variant={PLAN_VARIANT[product.plan] || "outline"}
                                    className="text-xs"
                                  >
                                    {product.plan}
                                  </Badge>
                                  <Badge
                                    variant={
                                      product.status === "ACTIVE" ? "default" : "destructive"
                                    }
                                    className="text-xs"
                                  >
                                    {product.status}
                                  </Badge>
                                </div>
                              </div>
                            </div>

                            <Button
                              size="sm"
                              variant="outline"
                              disabled={isSwitching || product.status !== "ACTIVE"}
                              onClick={() => handleSwitch(account.id, product)}
                            >
                              {isSwitching ? (
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              ) : (
                                <>
                                  <Repeat2 className="w-3.5 h-3.5 mr-1.5" />
                                  Switch
                                </>
                              )}
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SwitchProduct;
