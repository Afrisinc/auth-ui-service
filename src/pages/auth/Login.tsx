import { useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { LoginSchema, type LoginSchemaType } from "@/lib/schemas/auth";
import { jwtDecode } from "jwt-decode";
import { useLogin } from "@/hooks/useAuth";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: "", password: "" },
  });

  // Priority: redirect_uri param → router state → /dashboard
  const redirectUri = searchParams.get("redirect_uri");
  const productParam = searchParams.get("product");
  const from = redirectUri || location.state?.from?.pathname || "/dashboard";

  const { mutate, isPending } = useLogin();

  const onSubmit = (data: LoginSchemaType) => {
    const payload = {
      ...data,
      ...(productParam && { product_code: productParam }),
    };
    mutate(payload as LoginSchemaType, {
      onSuccess: (res: any) => {
        if (res.success && res.resp_code === 1000) {
          const token: string = res.data.token || "";

          // Extract roles from response or JWT
          let roles: string[] = [];
          if (Array.isArray(res.data.roles)) {
            roles = res.data.roles;
          } else if (res.data.role) {
            roles = [res.data.role];
          } else {
            try {
              const decoded = jwtDecode<{ roles?: string[]; role?: string }>(
                token
              );
              roles = Array.isArray(decoded.roles)
                ? decoded.roles
                : decoded.role
                  ? [decoded.role]
                  : [];
            } catch {
              roles = [];
            }
          }

          localStorage.setItem("token", token);
          localStorage.setItem(
            "user",
            JSON.stringify({
              id: res.data.user_id,
              email: res.data.email,
              accountIds: res.data.account_ids || [],
              roles,
            })
          );

          toast({
            title: "Welcome back!",
            description: "You've successfully signed in.",
          });

          // Priority: backend redirectUrl (with code) → token passthrough → default destination
          let destination: string;

          // If backend returned a redirect URL (for OAuth/code flow), use it
          if (res.data.redirect && res.data.callback) {
            destination = res.data.callback;
          } else {
            // Build destination; append product param if present
            destination = productParam
              ? `${from}?product=${productParam}`
              : from;

            // For cross-domain SSO (e.g. notify.afrisinc.com), pass the token
            // in the URL so the receiving app can bootstrap its session.
            try {
              const destUrl = new URL(destination, window.location.href);
              if (destUrl.origin !== window.location.origin) {
                destUrl.searchParams.set("_at", token);
                destination = destUrl.toString();
              }
            } catch {
              // destination is a relative path — same-origin, no token needed in URL
            }
          }
          // console.log("Redirecting to:",res.data, destination);

          window.location.href = destination;
        } else {
          toast({
            title: "Login Failed",
            description: res.resp_msg || "Invalid credentials",
            variant: "destructive",
          });
        }
      },
      onError: (error: Error) => {
        toast({
          title: "Login Failed",
          description: error.message || "Login failed",
          variant: "destructive",
        });
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero p-6">
      <div className="w-full max-w-md animate-fade-in">
        {/* Header Section */}
        <div className="text-center mb-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2.5 mb-8 justify-center group"
          >
            <img
              src="/afrisic-logo.png"
              alt="Afrisinc Logo"
              className="w-11 h-11 rounded-xl object-cover group-hover:shadow-lg transition-shadow"
            />
            <span className="text-xl font-bold text-foreground">Afrisinc</span>
          </Link>

          <h1 className="heading-subsection mb-3">Welcome back</h1>
          <p className="text-sm text-muted-foreground">
            {productParam
              ? `Access ${productParam.charAt(0).toUpperCase()}${productParam.slice(1)} and manage your identity`
              : "Sign in to your Afrisinc account"}
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-card rounded-2xl p-8 shadow-card border border-border/50 hover:shadow-card-hover transition-all duration-300">
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            {/* Email Field */}
            <div className="space-y-2.5">
              <Label
                htmlFor="email"
                className="text-sm font-semibold text-foreground"
              >
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                {...register("email")}
                className="h-11 bg-muted/40 border-border/60 focus:border-primary/40 transition-all"
              />
              {errors.email && (
                <p className="text-xs text-destructive font-medium">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="password"
                  className="text-sm font-semibold text-foreground"
                >
                  Password
                </Label>
                <Link
                  to="/forgot-password"
                  className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
                >
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  {...register("password")}
                  className="h-11 bg-muted/40 border-border/60 focus:border-primary/40 transition-all pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-destructive font-medium">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 rounded border-border bg-muted cursor-pointer"
              />
              <label
                htmlFor="remember"
                className="text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
              >
                Keep me signed in
              </label>
            </div>

            {/* Sign In Button */}
            <Button
              variant="default"
              className="w-full h-11 font-semibold rounded-lg shadow-primary hover:shadow-lg transition-all mt-6"
              type="submit"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 pt-6 border-t border-border/50 text-center">
            <p className="text-sm text-muted-foreground">
              New to Afrisinc?{" "}
              <Link
                to="/register"
                className="font-semibold text-primary hover:text-primary/80 transition-colors"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>

        {/* Security Note */}
        <p className="text-center text-xs text-muted-foreground/60 mt-6">
          Your data is encrypted and secured with industry-standard protocols
        </p>
      </div>
    </div>
  );
};

export default Login;
