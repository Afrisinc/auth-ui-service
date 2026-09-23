import { Link, useLocation, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { LoginSchema, type LoginSchemaType } from "@/lib/schemas/auth";
import { jwtDecode } from "jwt-decode";
import { useLogin } from "@/hooks/useAuth";
import { getApiErrorMessage } from "@/lib/authUtils";

const Login = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: "", password: "", remember_me: false },
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
            description: getApiErrorMessage(res, "Invalid credentials"),
            variant: "destructive",
          });
        }
      },
      onError: (error: Error) => {
        toast({
          title: "Login Failed",
          description: getApiErrorMessage(error, "Login failed"),
          variant: "destructive",
        });
      },
    });
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle={
        productParam
          ? `Access ${productParam.charAt(0).toUpperCase()}${productParam.slice(1)} and manage your identity`
          : "Sign in to your Afrisinc account"
      }
      cardClassName="transition-all duration-300 hover:shadow-card-hover"
    >
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
            autoComplete="email"
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
          <div className="flex items-center justify-between gap-3">
            <Label
              htmlFor="password"
              className="text-sm font-semibold text-foreground"
            >
              Password
            </Label>
            <Link
              to="/forgot-password"
              className="-my-2 inline-flex min-h-10 items-center px-1 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              Forgot?
            </Link>
          </div>
          <PasswordInput
            id="password"
            autoComplete="current-password"
            placeholder="Enter your password"
            {...register("password")}
            className="h-11 bg-muted/40 border-border/60 focus:border-primary/40 transition-all"
          />
          {errors.password && (
            <p className="text-xs text-destructive font-medium">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Remember Me Checkbox */}
        <label
          htmlFor="remember"
          className="flex min-h-10 w-fit cursor-pointer items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <input
            type="checkbox"
            id="remember"
            {...register("remember_me")}
            className="w-4 h-4 shrink-0 rounded border-border bg-muted cursor-pointer accent-primary"
          />
          Keep me signed in
        </label>

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
    </AuthLayout>
  );
};

export default Login;
