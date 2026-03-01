import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { fetchMyAccounts } from "@/services/userService";
import { CreditCard, Plus, ArrowRight, Layers, Users } from "lucide-react";

const AccountsList = () => {
  const { user } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ["my-accounts", user?.id],
    queryFn: () => fetchMyAccounts(user!.id),
    enabled: !!user?.id,
  });

  const accounts = data?.accounts || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Accounts</h1>
          <p className="text-muted-foreground">View and manage your accounts</p>
        </div>
        <Button variant="gold" asChild>
          <Link to="/accounts/create">
            <Plus className="w-4 h-4 mr-2" />
            New Account
          </Link>
        </Button>
      </div>

      {isLoading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-48 w-full" />
          ))}
        </div>
      ) : accounts.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <CreditCard className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold">No accounts yet</h3>
            <p className="text-muted-foreground text-sm mt-1 mb-4">
              Create your first account to get started.
            </p>
            <Button variant="gold" asChild>
              <Link to="/accounts/create">
                <Plus className="w-4 h-4 mr-2" />
                Create Account
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {accounts.map((account) => {
            const isOwner = account.owner_user_id === user?.id;
            const productCount = account.products?.length || 0;

            return (
              <Card
                key={account.id}
                className="hover:shadow-md transition-shadow cursor-pointer"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-semibold font-mono">
                      {account.id.slice(0, 12)}...
                    </CardTitle>
                    <Badge variant={isOwner ? "default" : "secondary"} className="text-xs">
                      {isOwner ? "Owner" : "Member"}
                    </Badge>
                  </div>
                  <Badge variant="outline" className="w-fit text-xs">
                    {account.type}
                  </Badge>
                </CardHeader>

                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5" />
                      <span>{productCount} product{productCount !== 1 ? "s" : ""}</span>
                    </div>
                    {account.organization_id && (
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5" />
                        <span>Org</span>
                      </div>
                    )}
                  </div>

                  {account.products && account.products.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {account.products.slice(0, 3).map((p) => (
                        <Badge key={p.id} variant="secondary" className="text-xs">
                          {p.product?.name || p.product_id}
                        </Badge>
                      ))}
                      {account.products.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{account.products.length - 3}
                        </Badge>
                      )}
                    </div>
                  )}

                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link to={`/accounts/${account.id}`}>
                      View Details
                      <ArrowRight className="w-3.5 h-3.5 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AccountsList;
