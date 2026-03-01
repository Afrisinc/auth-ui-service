import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import AdminRoute from "@/components/auth/AdminRoute";

// Auth Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import VerifyEmail from "./pages/auth/VerifyEmail";

// App Layout
import DashboardLayout from "./components/dashboard/DashboardLayout";

// Identity — Dashboard
import DashboardOverview from "./pages/dashboard/Overview";
import DashboardSettings from "./pages/dashboard/Settings";

// User — Profile & Product Access
import Profile from "./pages/Profile";
import SwitchProduct from "./pages/SwitchProduct";

// User — Accounts
import AccountsList from "./pages/accounts/AccountsList";
import CreateAccount from "./pages/accounts/CreateAccount";
import AccountDetail from "./pages/accounts/AccountDetail";
import AccountMembers from "./pages/accounts/AccountMembers";
import AccountProducts from "./pages/accounts/AccountProducts";

// Platform Admin
import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/Users";
import AdminAccounts from "./pages/admin/Accounts";
import AdminProducts from "./pages/admin/Products";
import AdminAnalytics from "./pages/admin/Analytics";
import AdminAuditLogs from "./pages/admin/AuditLogs";

// Utility
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AuthProvider>
              <Routes>
                {/* ── Public / Auth ── */}
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/verify-email" element={<VerifyEmail />} />

                {/* ── Authenticated — shared DashboardLayout ── */}
                <Route
                  element={
                    <ProtectedRoute>
                      <DashboardLayout />
                    </ProtectedRoute>
                  }
                >
                  {/* Identity */}
                  <Route path="/dashboard" element={<DashboardOverview />} />

                  {/* Accounts */}
                  <Route path="/accounts" element={<AccountsList />} />
                  <Route path="/accounts/create" element={<CreateAccount />} />
                  <Route path="/accounts/:accountId" element={<AccountDetail />} />
                  <Route path="/accounts/:accountId/members" element={<AccountMembers />} />
                  <Route path="/accounts/:accountId/products" element={<AccountProducts />} />

                  {/* Product Access */}
                  <Route path="/switch-product" element={<SwitchProduct />} />

                  {/* Preferences */}
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/dashboard/settings" element={<DashboardSettings />} />

                  {/* ── Platform Admin — role-guarded ── */}
                  <Route
                    path="/admin/dashboard"
                    element={<AdminRoute><AdminDashboard /></AdminRoute>}
                  />
                  <Route
                    path="/admin/users"
                    element={<AdminRoute><AdminUsers /></AdminRoute>}
                  />
                  <Route
                    path="/admin/accounts"
                    element={<AdminRoute><AdminAccounts /></AdminRoute>}
                  />
                  <Route
                    path="/admin/products"
                    element={<AdminRoute><AdminProducts /></AdminRoute>}
                  />
                  <Route
                    path="/admin/analytics"
                    element={<AdminRoute><AdminAnalytics /></AdminRoute>}
                  />
                  <Route
                    path="/admin/audit-logs"
                    element={<AdminRoute><AdminAuditLogs /></AdminRoute>}
                  />
                </Route>

                {/* /admin → /admin/dashboard */}
                <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />

                {/* Catch-all */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AuthProvider>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
