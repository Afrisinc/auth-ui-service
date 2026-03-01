import React, { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

interface CustomUser {
  id: string;
  email: string;
  accountIds: string[];
  roles: string[];
}

interface AuthContextType {
  user: CustomUser | null;
  session: null;
  token: string | null;
  loading: boolean;
  isAdmin: boolean;
  signUp: (email: string, password: string, fullName?: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: Error | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const extractRolesFromToken = (token: string): string[] => {
  try {
    const decoded = jwtDecode<{ roles?: string[]; role?: string }>(token);
    if (Array.isArray(decoded.roles)) return decoded.roles;
    if (decoded.role) return [decoded.role];
  } catch {
    // ignore
  }
  return [];
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<CustomUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      try {
        const parsed = JSON.parse(storedUser);
        // Back-fill roles if stored user predates roles support
        if (!Array.isArray(parsed.roles)) {
          parsed.roles = extractRolesFromToken(storedToken);
        }
        setUser(parsed);
        setToken(storedToken);
      } catch (error) {
        console.error("Failed to parse stored user data", error);
      }
    }

    setLoading(false);
  }, []);

  const isAdmin = user?.roles?.includes("platform_admin") ?? false;

  const signUp = async (email: string, password: string, fullName?: string) => {
    try {
      const { getRuntimeConfig } = await import("@/lib/config");
      const config = getRuntimeConfig();
      const response = await fetch(`${config.serverUrl}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, fullName }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return { error: new Error(errorData.resp_msg || "Registration failed") };
      }

      return { error: null };
    } catch (error) {
      return { error: error instanceof Error ? error : new Error("Registration failed") };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { getRuntimeConfig } = await import("@/lib/config");
      const config = getRuntimeConfig();
      const response = await fetch(`${config.serverUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return { error: new Error(errorData.resp_msg || "Login failed") };
      }

      const data = await response.json();

      if (data.success && data.data?.token && data.data?.user_id) {
        const tokenValue: string = data.data.token;
        // Roles may come from response or JWT
        const roles: string[] =
          Array.isArray(data.data.roles)
            ? data.data.roles
            : data.data.role
            ? [data.data.role]
            : extractRolesFromToken(tokenValue);

        const customUser: CustomUser = {
          id: data.data.user_id,
          email: data.data.email,
          accountIds: data.data.account_ids || [],
          roles,
        };
        setUser(customUser);
        setToken(tokenValue);
        localStorage.setItem("user", JSON.stringify(customUser));
        localStorage.setItem("token", tokenValue);
        return { error: null };
      }

      return { error: new Error(data.resp_msg || "Login failed") };
    } catch (error) {
      return { error: error instanceof Error ? error : new Error("Login failed") };
    }
  };

  const signOut = async () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const resetPassword = async (email: string) => {
    try {
      const { getRuntimeConfig } = await import("@/lib/config");
      const config = getRuntimeConfig();
      const response = await fetch(`${config.serverUrl}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return { error: new Error(errorData.resp_msg || "Password reset failed") };
      }

      return { error: null };
    } catch (error) {
      return { error: error instanceof Error ? error : new Error("Password reset failed") };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session: null,
        token,
        loading,
        isAdmin,
        signUp,
        signIn,
        signOut,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
