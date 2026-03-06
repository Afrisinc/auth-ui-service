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

  const { register, handleSubmit, formState: { errors } } = useForm<LoginSchemaType>({
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
      ...(productParam && { product_code: productParam })    
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
              const decoded = jwtDecode<{ roles?: string[]; role?: string }>(token);
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

          toast({ title: "Welcome back!", description: "You've successfully signed in." });

          // Priority: backend redirectUrl (with code) → token passthrough → default destination
          let destination: string;

          // If backend returned a redirect URL (for OAuth/code flow), use it
          if (res.data.redirect && res.data.callback) {
            destination = res.data.callback;
          } else {
            // Build destination; append product param if present
            destination = productParam ? `${from}?product=${productParam}` : from;

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
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
         <Link to="/" className="inline-flex items-center gap-2 mb-6 justify-center">
            <img
              src="/afrisic-logo.png"
              alt="Afrisinc Logo"
              className="w-10 h-10 rounded-xl object-cover"
            />
            <span className="text-xl font-bold text-foreground">Afrisinc</span>
          </Link>
          <h1 className="heading-subsection">Welcome back</h1>
          <p className="text-secondary text-sm mt-2">
            {productParam
              ? `Sign in to access ${productParam}`
              : "Sign in to your account"}
          </p>
        </div>

        <div className="bg-card rounded-2xl p-8 shadow-card">
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <Label htmlFor="email" className="heading-label">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" {...register("email")} />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="heading-label">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password.message}</p>
              )}
            </div>

            <div className="flex justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" /> Remember me
              </label>
              <Link to="/forgot-password" className="text-primary hover:underline">
                Forgot password?
              </Link>
            </div>

            <Button variant="default" className="w-full" type="submit" disabled={isPending}>
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

          <p className="text-secondary text-sm text-center mt-6">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary hover:underline font-semibold">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
