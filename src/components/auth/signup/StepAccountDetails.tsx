import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { accountDetailsSchema, type AccountDetailsValues, type AccountType } from "./schemas";
import { Loader2, Globe } from "lucide-react";

interface StepAccountDetailsProps {
  accountType: AccountType;
  defaultValues: Partial<AccountDetailsValues>;
  onSubmit: (values: AccountDetailsValues) => void;
  onBack: () => void;
  isSubmitting: boolean;
}

const companySizes = [
  "1-10",
  "11-50",
  "51-200",
  "201-500",
  "500+",
];

const StepAccountDetails = ({
  accountType,
  defaultValues,
  onSubmit,
  onBack,
  isSubmitting,
}: StepAccountDetailsProps) => {
  const [termsAccepted, setTermsAccepted] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<AccountDetailsValues>({
    resolver: zodResolver(accountDetailsSchema),
    defaultValues,
    mode: "onChange",
  });

  const orgName = watch("organizationName");
  const slug = orgName
    ? orgName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
    : "";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Section Header */}
      <div className="pb-4 border-b border-border/50">
        <h2 className="text-lg font-semibold text-foreground mb-1">
          {accountType === "personal" ? "Complete Your Profile" : "Organization Details"}
        </h2>
        <p className="text-xs text-muted-foreground">
          {accountType === "personal"
            ? "Add optional details to personalize your account"
            : "Help us understand your organization better"}
        </p>
      </div>

      {accountType === "personal" ? (
        <div className="space-y-2.5">
          <Label htmlFor="displayName" className="text-sm font-semibold text-foreground">
            Display Name
            <span className="text-xs text-muted-foreground font-normal ml-1">optional</span>
          </Label>
          <Input
            id="displayName"
            placeholder="How you'd like to be known"
            {...register("displayName")}
            className="h-10 bg-muted/40 border-border/60 focus:border-primary/40 transition-all"
          />
          <p className="text-xs text-muted-foreground">
            This will appear in your profile and communications
          </p>
        </div>
      ) : (
        <>
          {/* Organization Name */}
          <div className="space-y-2.5">
            <Label htmlFor="organizationName" className="text-sm font-semibold text-foreground">
              Organization Name
            </Label>
            <Input
              id="organizationName"
              placeholder="Your company or organization name"
              {...register("organizationName")}
              className="h-10 bg-muted/40 border-border/60 focus:border-primary/40 transition-all"
            />
            {errors.organizationName && (
              <p className="text-xs text-destructive font-medium">{errors.organizationName.message}</p>
            )}
            {slug && (
              <div className="bg-muted/30 rounded p-2 mt-2 border border-border/50">
                <p className="text-xs text-muted-foreground">
                  URL slug: <span className="font-mono text-foreground">{slug}</span>
                </p>
              </div>
            )}
          </div>

          {/* Job Title */}
          <div className="space-y-2.5">
            <Label htmlFor="jobTitle" className="text-sm font-semibold text-foreground">
              Your Role
              <span className="text-xs text-muted-foreground font-normal ml-1">optional</span>
            </Label>
            <Input
              id="jobTitle"
              placeholder="e.g., CEO, CTO, Product Manager"
              {...register("jobTitle")}
              className="h-10 bg-muted/40 border-border/60 focus:border-primary/40 transition-all"
            />
          </div>

          {/* Company Email */}
          <div className="space-y-2.5">
            <Label htmlFor="companyEmail" className="text-sm font-semibold text-foreground">
              Company Email Address
            </Label>
            <Input
              id="companyEmail"
              type="email"
              required
              placeholder="name@company.com"
              {...register("companyEmail")}
              className="h-10 bg-muted/40 border-border/60 focus:border-primary/40 transition-all"
            />
            {errors.companyEmail && (
              <p className="text-xs text-destructive font-medium">{errors.companyEmail.message}</p>
            )}
          </div>

          {/* Industry */}
          <div className="space-y-2.5">
            <Label htmlFor="industry" className="text-sm font-semibold text-foreground">
              Industry
              <span className="text-xs text-muted-foreground font-normal ml-1">optional</span>
            </Label>
            <Input
              id="industry"
              placeholder="e.g., Fintech, Healthcare, EdTech"
              {...register("industry")}
              className="h-10 bg-muted/40 border-border/60 focus:border-primary/40 transition-all"
            />
          </div>

          {/* Company Size */}
          <div className="space-y-2.5">
            <Label className="text-sm font-semibold text-foreground">
              Company Size
              <span className="text-xs text-muted-foreground font-normal ml-1">optional</span>
            </Label>
            <Select onValueChange={(val) => setValue("companySize", val)}>
              <SelectTrigger className="h-10 bg-muted/40 border-border/60 focus:border-primary/40 transition-all">
                <SelectValue placeholder="Select company size" />
              </SelectTrigger>
              <SelectContent>
                {companySizes.map((size) => (
                  <SelectItem key={size} value={size}>
                    {size} employees
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Website */}
          <div className="space-y-2.5">
            <Label htmlFor="website" className="text-sm font-semibold text-foreground">
              Company Website
              <span className="text-xs text-muted-foreground font-normal ml-1">optional</span>
            </Label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input
                id="website"
                placeholder="https://yourcompany.com"
                {...register("website")}
                className="h-10 bg-muted/40 border-border/60 focus:border-primary/40 transition-all pl-9"
              />
            </div>
            {errors.website && (
              <p className="text-xs text-destructive font-medium">{errors.website.message}</p>
            )}
          </div>
        </>
      )}

      {/* Terms & Conditions */}
      <div className="bg-muted/30 rounded-lg p-4 border border-border/50 mt-6">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            className="w-4 h-4 mt-0.5 rounded border-border cursor-pointer"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
          />
          <span className="text-sm text-muted-foreground leading-relaxed">
            I agree to the{" "}
            <Link to="/terms" className="font-semibold text-primary hover:text-primary/80 transition-colors">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="font-semibold text-primary hover:text-primary/80 transition-colors">
              Privacy Policy
            </Link>
            . I understand my data will be encrypted and protected.
          </span>
        </label>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-2">
        <Button
          type="button"
          variant="outline"
          className="flex-1 h-11 font-semibold"
          onClick={onBack}
          disabled={isSubmitting}
        >
          ← Back
        </Button>
        <Button
          variant="default"
          type="submit"
          className="flex-1 h-11 font-semibold rounded-lg shadow-primary hover:shadow-lg transition-all"
          disabled={isSubmitting || !termsAccepted}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating account...
            </>
          ) : (
            "Create Account"
          )}
        </Button>
      </div>
    </form>
  );
};

export default StepAccountDetails;
