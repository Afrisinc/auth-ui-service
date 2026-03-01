import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { fetchMyAccounts } from "@/services/userService";
import { EnrollProductDialog } from "@/components/platform/EnrollProductDialog";
import { ArrowLeft, Layers, Plus, Repeat2 } from "lucide-react";
import type { PlatformAccount } from "@/types/platform";

const PLAN_VARIANT: Record<string, "default" | "secondary" | "outline"> = {
  FREE: "outline",
  PRO: "secondary",
  ENTERPRISE: "default",
};

const AccountProducts = () => {
  const { accountId } = useParams<{ accountId: string }>();
  const { user } = useAuth();
  const [enrollOpen, setEnrollOpen] = useState(false);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["my-accounts", user?.id],
    queryFn: () => fetchMyAccounts(user!.id),
    enabled: !!user?.id,
  });

  const account = data?.accounts.find((a) => a.id === accountId);
  const products = account?.products || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to={`/accounts/${accountId}`}>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-foreground">Product Access</h1>
          <p className="text-muted-foreground font-mono text-sm">
            {accountId?.slice(0, 16)}...
          </p>
        </div>
        <Button variant="gold" onClick={() => setEnrollOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Enroll Product
        </Button>
      </div>

      {isLoading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => <Skeleton key={i} className="h-40" />)}
        </div>
      ) : products.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <Layers className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold">No products enrolled</h3>
            <p className="text-muted-foreground text-sm mt-1 mb-4">
              Enroll this account in a product to get access.
            </p>
            <Button variant="gold" onClick={() => setEnrollOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Enroll Product
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <Card key={product.id} className="flex flex-col">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Layers className="w-5 h-5 text-primary" />
                  </div>
                  <CardTitle className="text-sm font-semibold">
                    {product.product?.name || product.product_id}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex-1 space-y-3">
                {product.product?.code && (
                  <p className="text-xs font-mono text-muted-foreground">{product.product.code}</p>
                )}
                <div className="flex items-center gap-2">
                  <Badge variant={PLAN_VARIANT[product.plan] || "outline"} className="text-xs">
                    {product.plan}
                  </Badge>
                  <Badge
                    variant={product.status === "ACTIVE" ? "default" : "destructive"}
                    className="text-xs"
                  >
                    {product.status}
                  </Badge>
                </div>
                {product.status === "ACTIVE" && (
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link to="/switch-product">
                      <Repeat2 className="w-3.5 h-3.5 mr-1.5" />
                      Switch Here
                    </Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {accountId && account && (
        <EnrollProductDialog
          isOpen={enrollOpen}
          onClose={() => {
            setEnrollOpen(false);
            refetch();
          }}
          account={
            {
              id: account.id,
              type: account.type,
              owner_user_id: account.owner_user_id,
              organization_id: account.organization_id,
              createdAt: "",
              products: account.products,
            } as PlatformAccount
          }
        />
      )}
    </div>
  );
};

export default AccountProducts;
