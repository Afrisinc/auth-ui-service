import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex min-h-dvh items-center justify-center bg-muted p-4 sm:p-6">
      <div className="min-w-0 text-center">
        <h1 className="heading-hero mb-4">404</h1>
        <p className="mb-2 text-secondary text-xl">Oops! Page not found</p>
        <a
          href="/"
          className="inline-flex min-h-10 items-center px-2 text-primary underline hover:text-primary/90"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
