import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Phone, MapPin } from "lucide-react";
import { useState } from "react";
import { identitySchema, type IdentityValues } from "./schemas";

interface StepIdentityProps {
  defaultValues: Partial<IdentityValues>;
  onNext: (values: IdentityValues) => void;
}

const StepIdentity = ({ defaultValues, onNext }: StepIdentityProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IdentityValues>({
    resolver: zodResolver(identitySchema),
    defaultValues,
    mode: "onChange",
  });

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-6">
      {/* Section Header */}
      <div className="pb-4 border-b border-border/50">
        <h2 className="text-lg font-semibold text-foreground mb-1">Your Identity</h2>
        <p className="text-xs text-muted-foreground">Start with your basic information</p>
      </div>

      {/* Name Fields */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2.5">
          <Label htmlFor="firstName" className="text-sm font-semibold text-foreground">
            First Name
          </Label>
          <Input
            id="firstName"
            placeholder="John"
            {...register("firstName")}
            className="h-10 bg-muted/40 border-border/60 focus:border-primary/40 transition-all"
          />
          {errors.firstName && (
            <p className="text-xs text-destructive font-medium">{errors.firstName.message}</p>
          )}
        </div>
        <div className="space-y-2.5">
          <Label htmlFor="lastName" className="text-sm font-semibold text-foreground">
            Last Name
          </Label>
          <Input
            id="lastName"
            placeholder="Doe"
            {...register("lastName")}
            className="h-10 bg-muted/40 border-border/60 focus:border-primary/40 transition-all"
          />
          {errors.lastName && (
            <p className="text-xs text-destructive font-medium">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      {/* Email Field */}
      <div className="space-y-2.5">
        <Label htmlFor="email" className="text-sm font-semibold text-foreground">
          Email Address
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          {...register("email")}
          className="h-10 bg-muted/40 border-border/60 focus:border-primary/40 transition-all"
        />
        {errors.email && (
          <p className="text-xs text-destructive font-medium">{errors.email.message}</p>
        )}
      </div>

      {/* Contact Fields */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2.5">
          <div className="flex items-center gap-1">
            <Label htmlFor="phone" className="text-sm font-semibold text-foreground">
              Phone
            </Label>
            <span className="text-xs text-muted-foreground font-normal">optional</span>
          </div>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              id="phone"
              type="tel"
              placeholder="+1 (555) 123-4567"
              className="h-10 bg-muted/40 border-border/60 focus:border-primary/40 transition-all pl-9"
              {...register("phone")}
            />
          </div>
        </div>
        <div className="space-y-2.5">
          <div className="flex items-center gap-1">
            <Label htmlFor="location" className="text-sm font-semibold text-foreground">
              Location
            </Label>
            <span className="text-xs text-muted-foreground font-normal">optional</span>
          </div>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              id="location"
              placeholder="City, Country"
              className="h-10 bg-muted/40 border-border/60 focus:border-primary/40 transition-all pl-9"
              {...register("location")}
            />
          </div>
        </div>
      </div>

      {/* Password Field */}
      <div className="space-y-2.5 pt-2">
        <Label htmlFor="password" className="text-sm font-semibold text-foreground">
          Password
        </Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Create a strong password"
            {...register("password")}
            className="h-10 bg-muted/40 border-border/60 focus:border-primary/40 transition-all pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {errors.password && (
          <p className="text-xs text-destructive font-medium">{errors.password.message}</p>
        )}
      </div>

      {/* Confirm Password Field */}
      <div className="space-y-2.5">
        <Label htmlFor="confirmPassword" className="text-sm font-semibold text-foreground">
          Confirm Password
        </Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            type={showConfirm ? "text" : "password"}
            placeholder="Re-enter your password"
            {...register("confirmPassword")}
            className="h-10 bg-muted/40 border-border/60 focus:border-primary/40 transition-all pr-10"
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label={showConfirm ? "Hide password" : "Show password"}
          >
            {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-xs text-destructive font-medium">{errors.confirmPassword.message}</p>
        )}
      </div>

      {/* CTA Button */}
      <Button
        variant="default"
        type="submit"
        className="w-full h-11 font-semibold rounded-lg shadow-primary hover:shadow-lg transition-all mt-8"
        disabled={!isValid}
      >
        Continue to Account Type →
      </Button>
    </form>
  );
};

export default StepIdentity;
