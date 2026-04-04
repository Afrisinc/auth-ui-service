import { useEffect, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Loader2, Mail } from "lucide-react";
import { useVerifyEmail } from "@/hooks/useAuth";

type VerifyState = "loading" | "success" | "error" | "idle";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [state, setState] = useState<VerifyState>("idle");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { mutate } = useVerifyEmail();

  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      setState("idle");
      return;
    }

    setState("loading");
    mutate(token, {
      onSuccess: (res: any) => {
        if (res.success && res.resp_code === 1000) {
          setState("success");
          setMessage("Your email has been verified successfully.");
        } else {
          setState("error");
          setMessage(res.resp_msg || "Verification failed. The link may have expired.");
        }
      },
      onError: () => {
        setState("error");
        setMessage("Something went wrong. Please try again.");
      },
    });
  }, [token, mutate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero p-6">
      <div className="w-full max-w-md animate-fade-in">
        {/* Header */}
        <div className="text-center mb-10">
          <Link to="/login" className="inline-flex items-center gap-2.5 mb-8 justify-center group">
            <img
              src="/afrisic-logo.png"
              alt="Afrisinc Logo"
              className="w-11 h-11 rounded-xl object-cover group-hover:shadow-lg transition-shadow"
            />
            <span className="text-xl font-bold text-foreground">Afrisinc</span>
          </Link>

          <h1 className="heading-subsection mb-2">Email Verification</h1>
        </div>

        {/* Content Card */}
        <div className="bg-card rounded-2xl p-8 shadow-card border border-border/50 text-center">
          {state === "idle" && (
            <div className="space-y-5 animate-fade-up">
              {/* Envelope Icon */}
              <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto border border-border/50">
                <Mail className="w-8 h-8 text-muted-foreground" />
              </div>

              {/* Idle Message */}
              <div className="space-y-2">
                <h2 className="heading-label">Check your email</h2>
                <p className="text-secondary text-sm leading-relaxed">
                  We've sent a verification link to your inbox. Click it to activate your account.
                </p>
              </div>

              {/* Spam Note */}
              <div className="bg-muted/30 rounded-lg p-3 border border-border/50">
                <p className="text-xs text-muted-foreground">
                  💡 Not seeing the email? Check your spam folder or{" "}
                  <Link to="/login" className="font-semibold text-primary hover:text-primary/80">
                    request a new link
                  </Link>
                </p>
              </div>
            </div>
          )}

          {state === "loading" && (
            <div className="space-y-5 animate-fade-up">
              {/* Loading Spinner */}
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto border border-primary/20">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
              </div>

              {/* Loading Message */}
              <div>
                <h2 className="heading-label">Verifying your email...</h2>
                <p className="text-secondary text-sm mt-2">This should only take a moment.</p>
              </div>
            </div>
          )}

          {state === "success" && (
            <div className="space-y-6 animate-fade-up">
              {/* Success Icon */}
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto border border-primary/20">
                <CheckCircle className="w-8 h-8 text-primary" />
              </div>

              {/* Success Message */}
              <div className="space-y-3">
                <h2 className="heading-label">Email verified!</h2>
                <p className="text-secondary text-sm leading-relaxed">{message}</p>
              </div>

              {/* CTA Button */}
              <Button
                variant="default"
                className="w-full h-11 font-semibold rounded-lg shadow-primary hover:shadow-lg transition-all"
                onClick={() => navigate("/login")}
              >
                Continue to Sign In
              </Button>
            </div>
          )}

          {state === "error" && (
            <div className="space-y-6 animate-fade-up">
              {/* Error Icon */}
              <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto border border-destructive/20">
                <XCircle className="w-8 h-8 text-destructive" />
              </div>

              {/* Error Message */}
              <div className="space-y-3">
                <h2 className="heading-label">Verification failed</h2>
                <p className="text-secondary text-sm leading-relaxed">{message}</p>
                <p className="text-xs text-muted-foreground">
                  Verification links expire after 24 hours for security.
                </p>
              </div>

              {/* Recovery Options */}
              <div className="space-y-2">
                <Button variant="default" className="w-full h-11 font-semibold" asChild>
                  <Link to="/login">Back to Sign In</Link>
                </Button>
                <Button variant="outline" className="w-full h-11 font-semibold" asChild>
                  <Link to="/forgot-password">Request New Link</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
