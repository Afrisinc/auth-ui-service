import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/ui/password-input";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { ArrowLeft, Loader2, CheckCircle } from "lucide-react";
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
    <AuthLayout
      title="Create a new password"
      subtitle="Enter a strong password to secure your account"
      brandHref="/login"
    >
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
            <label
              htmlFor="password"
              className="text-sm font-semibold text-foreground"
            >
              New Password
            </label>
            <PasswordInput
              id="password"
              autoComplete="new-password"
              placeholder="Create a strong password"
              {...register("password")}
              className="h-11 bg-muted/40 border-border/60 focus:border-primary/40 transition-all"
            />
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
            <label
              htmlFor="confirmPassword"
              className="text-sm font-semibold text-foreground"
            >
              Confirm Password
            </label>
            <PasswordInput
              id="confirmPassword"
              autoComplete="new-password"
              placeholder="Re-enter your password"
              {...register("confirmPassword")}
              className="h-11 bg-muted/40 border-border/60 focus:border-primary/40 transition-all"
            />
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
          <Button
            variant="outline"
            className="w-full h-11 font-semibold"
            asChild
          >
            <Link to="/login">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Sign In
            </Link>
          </Button>
        </form>
      )}
    </AuthLayout>
  );
};

export default ResetPassword;
