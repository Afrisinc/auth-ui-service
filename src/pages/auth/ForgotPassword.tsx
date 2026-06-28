import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Loader2, CheckCircle, Mail } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { resetPassword } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await resetPassword(email);

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    setSent(true);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero p-6">
      <div className="w-full max-w-md animate-fade-in">
        {/* Header */}
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

          <h1 className="heading-subsection mb-3">Reset your password</h1>
          <p className="text-sm text-muted-foreground">
            No worries. We'll send you instructions to recover your account.
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-card rounded-2xl p-8 shadow-card border border-border/50">
          {sent ? (
            <div className="text-center space-y-6 animate-fade-up">
              {/* Success Icon */}
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto border border-primary/20">
                <CheckCircle className="w-8 h-8 text-primary" />
              </div>

              {/* Success Message */}
              <div className="space-y-3">
                <h2 className="heading-label">Check your inbox</h2>
                <p className="text-secondary text-sm leading-relaxed">
                  We've sent password reset instructions to{" "}
                  <span className="font-semibold text-foreground">{email}</span>
                </p>
                <p className="text-xs text-muted-foreground">
                  The reset link will expire in 24 hours for security reasons.
                </p>
              </div>

              {/* Back Button */}
              <Link to="/login" className="block">
                <Button variant="default" className="w-full h-11 font-semibold">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Sign In
                </Button>
              </Link>
            </div>
          ) : (
            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Email Field */}
              <div className="space-y-2.5">
                <label
                  htmlFor="email"
                  className="text-sm font-semibold text-foreground"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-11 bg-muted/40 border-border/60 focus:border-primary/40 transition-all pl-11"
                  />
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                </div>
                <p className="text-xs text-muted-foreground">
                  Enter the email associated with your Afrisinc account
                </p>
              </div>

              {/* Send Button */}
              <Button
                variant="default"
                className="w-full h-11 font-semibold rounded-lg shadow-primary hover:shadow-lg transition-all mt-6"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending reset link...
                  </>
                ) : (
                  "Send Reset Link"
                )}
              </Button>
            </form>
          )}

          {/* Footer Divider & Back Link */}
          {!sent && (
            <div className="mt-6 pt-6 border-t border-border/50">
              <Link
                to="/login"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Sign In
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
