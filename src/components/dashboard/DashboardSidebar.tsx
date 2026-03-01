import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  CreditCard,
  Repeat2,
  User,
  Settings,
  LogOut,
  Shield,
  Users,
  BarChart3,
  Layers,
  FileText,
  TrendingUp,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const identityItems = [
  { title: "Overview", url: "/dashboard", icon: LayoutDashboard },
];

const accountItems = [
  { title: "My Accounts", url: "/accounts", icon: CreditCard },
  { title: "Switch Product", url: "/switch-product", icon: Repeat2 },
];

const preferenceItems = [
  { title: "Profile", url: "/profile", icon: User },
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
];

const adminItems = [
  { title: "Admin Dashboard", url: "/admin/dashboard", icon: BarChart3 },
  { title: "Users", url: "/admin/users", icon: Users },
  { title: "Accounts", url: "/admin/accounts", icon: CreditCard },
  { title: "Products", url: "/admin/products", icon: Layers },
  { title: "Analytics", url: "/admin/analytics", icon: TrendingUp },
  { title: "Audit Logs", url: "/admin/audit-logs", icon: FileText },
];

export const DashboardSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut, isAdmin } = useAuth();

  const isActive = (url: string) => location.pathname === url;
  const isInSection = (prefix: string) =>
    location.pathname.startsWith(prefix) && prefix !== "/";

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <Sidebar className="border-r border-border">
      <div className="p-4 border-b border-border">
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">A</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-foreground text-sm leading-tight">Afrisinc</span>
            <span className="text-xs text-muted-foreground leading-tight">Identity Platform</span>
          </div>
        </Link>
      </div>

      <SidebarContent>
        {/* Identity */}
        <SidebarGroup>
          <SidebarGroupLabel>Identity</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {identityItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={isActive(item.url) ? "bg-primary/10 text-primary" : ""}
                  >
                    <Link to={item.url}>
                      <item.icon className="w-4 h-4 mr-2" />
                      {item.title}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Accounts */}
        <SidebarGroup>
          <SidebarGroupLabel>Accounts</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {accountItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={
                      isActive(item.url) || isInSection(item.url + "/")
                        ? "bg-primary/10 text-primary"
                        : ""
                    }
                  >
                    <Link to={item.url}>
                      <item.icon className="w-4 h-4 mr-2" />
                      {item.title}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Preferences */}
        <SidebarGroup>
          <SidebarGroupLabel>Preferences</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {preferenceItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={isActive(item.url) ? "bg-primary/10 text-primary" : ""}
                  >
                    <Link to={item.url}>
                      <item.icon className="w-4 h-4 mr-2" />
                      {item.title}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Platform Admin — role-gated */}
        {isAdmin && (
          <>
            <SidebarSeparator />
            <SidebarGroup>
              <SidebarGroupLabel className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5" />
                Platform Admin
                <Badge variant="secondary" className="ml-auto text-xs px-1.5 py-0">
                  Admin
                </Badge>
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {adminItems.map((item) => (
                    <SidebarMenuItem key={item.url}>
                      <SidebarMenuButton
                        asChild
                        className={isActive(item.url) ? "bg-primary/10 text-primary" : ""}
                      >
                        <Link to={item.url}>
                          <item.icon className="w-4 h-4 mr-2" />
                          {item.title}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </>
        )}
      </SidebarContent>

      <div className="mt-auto p-4 border-t border-border">
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start text-muted-foreground hover:text-destructive"
          onClick={handleSignOut}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </Sidebar>
  );
};
