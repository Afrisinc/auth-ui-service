import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { fetchMyAccounts } from "@/services/userService";
import { Skeleton } from "@/components/ui/skeleton";
import { CreditCard, Repeat2, User, ArrowRight, Layers } from "lucide-react";

const DashboardOverview = () => {
  const { user } = useAuth();

  const { data: accountsData, isLoading } = useQuery({
    queryKey: ["my-accounts", user?.id],
    queryFn: () => fetchMyAccounts(user!.id),
    enabled: !!user?.id,
  });

  const accounts = accountsData?.accounts || [];
  const totalProducts = accounts.reduce((acc, a) => acc + (a.products?.length || 0), 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Welcome back</h1>
        <p className="text-muted-foreground">{user?.email}</p>
      </div>

      {/* Quick Stats */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-primary" />
            </div>
            <div>
              {isLoading ? (
                <Skeleton className="h-7 w-12 mb-1" />
              ) : (
                <p className="text-2xl font-bold">{accounts.length}</p>
              )}
              <p className="text-sm text-muted-foreground">Accounts</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
              <Layers className="w-5 h-5 text-secondary" />
            </div>
            <div>
              {isLoading ? (
                <Skeleton className="h-7 w-12 mb-1" />
              ) : (
                <p className="text-2xl font-bold">{totalProducts}</p>
              )}
              <p className="text-sm text-muted-foreground">Enrolled Products</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <User className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold">Active</p>
              <p className="text-sm text-muted-foreground">Account Status</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions + Account List */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-between" asChild>
              <Link to="/accounts">
                <span className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  Manage Accounts
                </span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-between" asChild>
              <Link to="/switch-product">
                <span className="flex items-center gap-2">
                  <Repeat2 className="w-4 h-4" />
                  Switch Product
                </span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-between" asChild>
              <Link to="/profile">
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Edit Profile
                </span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">My Accounts</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-3">
                {[1, 2].map((i) => (
                  <Skeleton key={i} className="h-14 w-full" />
                ))}
              </div>
            ) : accounts.length === 0 ? (
              <div className="text-center py-6 text-muted-foreground text-sm">
                <p>No accounts yet.</p>
                <Button variant="link" className="mt-1 p-0 h-auto" asChild>
                  <Link to="/accounts/create">Create one</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                {accounts.slice(0, 3).map((account) => (
                  <Link
                    key={account.id}
                    to={`/accounts/${account.id}`}
                    className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center">
                        <CreditCard className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium font-mono">
                          {account.id.slice(0, 8)}...
                        </p>
                        <Badge variant="outline" className="text-xs">
                          {account.type}
                        </Badge>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {account.products?.length || 0} product
                      {account.products?.length !== 1 ? "s" : ""}
                    </span>
                  </Link>
                ))}
                {accounts.length > 3 && (
                  <Button variant="ghost" size="sm" className="w-full" asChild>
                    <Link to="/accounts">View all {accounts.length} accounts</Link>
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardOverview;
