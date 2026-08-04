import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Eye, EyeOff, Loader2, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getRuntimeConfig } from "@/lib/config";
import { getApiErrorMessage } from "@/lib/authUtils";

const ResetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Please confirm your password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ResetPasswordForm = z.infer<typeof ResetPasswordSchema>;

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const token = searchParams.get("token") || "";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordForm>({
    resolver: zodResolver(ResetPasswordSchema),
  });

  const onSubmit = async (formData: ResetPasswordForm) => {
    if (!token) {
      toast({
        title: "Invalid Link",
        description: "Reset token is missing. Please request a new reset link.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const config = getRuntimeConfig();
      const response = await fetch(
        `${config.serverUrl}/auth/reset-password/confirm`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, password: formData.password }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        toast({
          title: "Reset Failed",
          description: getApiErrorMessage(
            errorData,
            "Password reset failed. Please try again."
          ),
          variant: "destructive",
        });
        return;
      }

      setDone(true);
    } catch {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero p-6">
      <div className="w-full max-w-md animate-fade-in">
        {/* Header */}
        <div className="text-center mb-10">
          <Link
            to="/login"
            className="inline-flex items-center gap-2.5 mb-8 justify-center group"
          >
            <img
              src="/afrisic-logo.png"
              alt="Afrisinc Logo"
              className="w-11 h-11 rounded-xl object-cover group-hover:shadow-lg transition-shadow"
            />
            <span className="text-xl font-bold text-foreground">Afrisinc</span>
          </Link>

          <h1 className="heading-subsection mb-3">Create a new password</h1>
          <p className="text-sm text-muted-foreground">
            Enter a strong password to secure your account
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-card rounded-2xl p-8 shadow-card border border-border/50">
          {done ? (
            <div className="text-center space-y-6 animate-fade-up">
              {/* Success Icon */}
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto border border-primary/20">
                <CheckCircle className="w-8 h-8 text-primary" />
              </div>

              {/* Success Message */}
              <div className="space-y-2">
                <h2 className="heading-label">Password updated</h2>
                <p className="text-secondary text-sm leading-relaxed">
                  Your password has been reset successfully. You can now sign in
                  with your new password.
                </p>
              </div>

              {/* Sign In Button */}
              <Button
                variant="default"
                className="w-full h-11 font-semibold rounded-lg shadow-primary hover:shadow-lg transition-all"
                onClick={() => navigate("/login")}
              >
                Continue to Sign In
              </Button>
            </div>
          ) : (
            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
              {/* New Password Field */}
              <div className="space-y-2.5">
                <label className="text-sm font-semibold text-foreground">
                  New Password
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    {...register("password")}
                    className="h-11 bg-muted/40 border-border/60 focus:border-primary/40 transition-all pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-destructive font-medium">
                    {errors.password.message}
                  </p>
                )}
                <p className="text-xs text-muted-foreground">
                  Use 6+ characters with a mix of letters, numbers, and symbols
                </p>
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2.5">
                <label className="text-sm font-semibold text-foreground">
                  Confirm Password
                </label>
                <div className="relative">
                  <Input
                    type={showConfirm ? "text" : "password"}
                    placeholder="Re-enter your password"
                    {...register("confirmPassword")}
                    className="h-11 bg-muted/40 border-border/60 focus:border-primary/40 transition-all pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-xs text-destructive font-medium">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* CTA Button */}
              <Button
                variant="default"
                className="w-full h-11 font-semibold rounded-lg shadow-primary hover:shadow-lg transition-all mt-6"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Updating password...
                  </>
                ) : (
                  "Reset Password"
                )}
              </Button>

              {/* Back Link */}
              <Link to="/login" className="block">
                <Button
                  variant="outline"
                  className="w-full h-11 font-semibold mt-2"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Sign In
                </Button>
              </Link>
            </form>
          )}
        </div>

        {/* Footer Section */}
        <div className="text-center mt-6 space-y-2">
          <p className="text-xs text-muted-foreground/60">
            Your data is encrypted and secured with industry-standard protocols
          </p>
          <a
            href="https://afrisinc.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-xs text-primary/70 hover:text-primary transition-colors font-medium"
          >
            Visit Website
          </a>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
