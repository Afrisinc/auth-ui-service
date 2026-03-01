import { Link, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { fetchMyAccounts } from "@/services/userService";
import { ArrowLeft, CreditCard, Layers, Users, ArrowRight } from "lucide-react";

const AccountDetail = () => {
  const { accountId } = useParams<{ accountId: string }>();
  const { user } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ["my-accounts", user?.id],
    queryFn: () => fetchMyAccounts(user!.id),
    enabled: !!user?.id,
  });

  const account = data?.accounts.find((a) => a.id === accountId);
  const isOwner = account?.owner_user_id === user?.id;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-64" />
        <div className="grid lg:grid-cols-2 gap-6">
          <Skeleton className="h-48" />
          <Skeleton className="h-48" />
        </div>
      </div>
    );
  }

  if (!account) {
    return (
      <div className="text-center py-16">
        <CreditCard className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
        <h2 className="text-lg font-semibold">Account not found</h2>
        <p className="text-muted-foreground text-sm mt-1">
          This account does not exist or you don't have access.
        </p>
        <Button variant="outline" className="mt-4" asChild>
          <Link to="/accounts">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Accounts
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/accounts">
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground font-mono">
            {account.id.slice(0, 16)}...
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="outline">{account.type}</Badge>
            <Badge variant={isOwner ? "default" : "secondary"}>
              {isOwner ? "Owner" : "Member"}
            </Badge>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Account Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <CreditCard className="w-4 h-4" />
              Account Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-y-3 text-sm">
              <span className="text-muted-foreground">Account ID</span>
              <span className="font-mono text-xs break-all">{account.id}</span>

              <span className="text-muted-foreground">Type</span>
              <span>{account.type}</span>

              <span className="text-muted-foreground">Your Role</span>
              <span>{isOwner ? "Owner" : "Member"}</span>

              {account.organization_id && (
                <>
                  <span className="text-muted-foreground">Organization</span>
                  <span className="font-mono text-xs break-all">{account.organization_id}</span>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Links */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Manage</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-between" asChild>
              <Link to={`/accounts/${accountId}/products`}>
                <span className="flex items-center gap-2">
                  <Layers className="w-4 h-4" />
                  Products ({account.products?.length || 0})
                </span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-between" asChild>
              <Link to={`/accounts/${accountId}/members`}>
                <span className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Members
                </span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Products Overview */}
      {account.products && account.products.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Layers className="w-4 h-4" />
              Enrolled Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {account.products.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center gap-3 p-3 rounded-lg border border-border bg-muted/30"
                >
                  <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center">
                    <Layers className="w-4 h-4 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">
                      {product.product?.name || product.product_id}
                    </p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <Badge variant="outline" className="text-xs">
                        {product.plan}
                      </Badge>
                      <Badge
                        variant={product.status === "ACTIVE" ? "default" : "destructive"}
                        className="text-xs"
                      >
                        {product.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AccountDetail;
