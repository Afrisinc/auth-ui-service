import { Link, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { fetchMyAccounts } from "@/services/userService";
import { fetchPlatformOrganizationMembers } from "@/services/platformService";
import { ArrowLeft, Users, Plus } from "lucide-react";

const ROLE_VARIANT: Record<string, "default" | "secondary" | "outline"> = {
  OWNER: "default",
  ADMIN: "secondary",
  MEMBER: "outline",
};

const AccountMembers = () => {
  const { accountId } = useParams<{ accountId: string }>();
  const { user } = useAuth();

  const { data: accountsData, isLoading: accountsLoading } = useQuery({
    queryKey: ["my-accounts", user?.id],
    queryFn: () => fetchMyAccounts(user!.id),
    enabled: !!user?.id,
  });

  const account = accountsData?.accounts.find((a) => a.id === accountId);
  const orgId = account?.organization_id;

  const { data: membersData, isLoading: membersLoading } = useQuery({
    queryKey: ["org-members", orgId],
    queryFn: () => fetchPlatformOrganizationMembers(orgId!),
    enabled: !!orgId,
  });

  const members = membersData?.members || [];
  const isLoading = accountsLoading || membersLoading;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to={`/accounts/${accountId}`}>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Account Members</h1>
          <p className="text-muted-foreground font-mono text-sm">
            {accountId?.slice(0, 16)}...
          </p>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base">
            <Users className="w-4 h-4" />
            Members
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => <Skeleton key={i} className="h-12 w-full" />)}
            </div>
          ) : !orgId ? (
            <div className="text-center py-8 text-muted-foreground text-sm">
              <Users className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p>This is an individual account.</p>
              <p className="mt-1">Members are only available for organization accounts.</p>
            </div>
          ) : members.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground text-sm">
              <Users className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p>No members found.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Phone</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {members.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell>
                      <div>
                        <p className="text-sm font-medium">
                          {[member.firstName, member.lastName].filter(Boolean).join(" ") || "—"}
                        </p>
                        <p className="text-xs text-muted-foreground">{member.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={ROLE_VARIANT[member.role] || "outline"} className="text-xs">
                        {member.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={member.status === "ACTIVE" ? "default" : "destructive"}
                        className="text-xs"
                      >
                        {member.status || "ACTIVE"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {member.phone || "—"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountMembers;
