import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface AuthLayoutProps {
  title: ReactNode;
  subtitle?: ReactNode;
  brandHref?: string;
  cardClassName?: string;
  children: ReactNode;
}

export const AuthLayout = ({
  title,
  subtitle,
  brandHref = "/",
  cardClassName,
  children,
}: AuthLayoutProps) => (
  <div className="flex min-h-dvh items-center justify-center bg-gradient-hero p-4 sm:p-6">
    <div className="w-full min-w-0 max-w-md animate-fade-in">
      <div className="mb-6 text-center sm:mb-10">
        <Link
          to={brandHref}
          className="group mb-5 inline-flex items-center justify-center gap-2.5 sm:mb-8"
        >
          <img
            src="/afrisic-logo.png"
            alt="Afrisinc Logo"
            width={44}
            height={44}
            className="h-11 w-11 shrink-0 rounded-xl object-cover transition-shadow group-hover:shadow-lg"
          />
          <span className="text-xl font-bold text-foreground">Afrisinc</span>
        </Link>

        <h1 className="heading-subsection mb-2 text-balance break-words sm:mb-3">
          {title}
        </h1>
        {subtitle && (
          <p className="text-balance break-words text-sm text-muted-foreground">
            {subtitle}
          </p>
        )}
      </div>

      <div
        className={cn(
          "rounded-2xl border border-border/50 bg-card p-6 shadow-card sm:p-8",
          cardClassName
        )}
      >
        {children}
      </div>

      <div className="mt-6 space-y-1 text-center">
        <p className="text-xs text-muted-foreground/60">
          Your data is encrypted and secured with industry-standard protocols
        </p>
        <a
          href="https://afrisinc.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-10 items-center px-2 text-xs font-medium text-primary/70 transition-colors hover:text-primary"
        >
          Visit Website
        </a>
      </div>
    </div>
  </div>
);
