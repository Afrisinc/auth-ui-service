import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { accountDetailsSchema, type AccountDetailsValues, type AccountType } from "./schemas";
import { Loader2 } from "lucide-react";

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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {accountType === "personal" ? (
        <div className="space-y-2">
          <Label htmlFor="displayName" className="text-sm font-semibold">
            Display Name <span className="text-muted-foreground font-normal">(optional)</span>
          </Label>
          <Input
            id="displayName"
            placeholder="How you'd like to be known"
            {...register("displayName")}
          />
        </div>
      ) : (
        <>
          <div className="space-y-2">
            <Label htmlFor="organizationName" className="text-sm font-semibold">
              Organization Name
            </Label>
            <Input
              id="organizationName"
              placeholder="Your company name"
              {...register("organizationName")}
            />
            {errors.organizationName && (
              <p className="text-sm text-destructive">{errors.organizationName.message}</p>
            )}
            {slug && (
              <p className="text-sm text-muted-foreground">
                Slug: <span className="font-mono text-foreground">{slug}</span>
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="jobTitle" className="text-sm font-semibold">
              Your Job Title <span className="text-muted-foreground font-normal">(optional)</span>
            </Label>
            <Input
              id="jobTitle"
              placeholder="e.g. CTO, Product Manager"
              {...register("jobTitle")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="industry" className="text-sm font-semibold">
              Industry <span className="text-muted-foreground font-normal">(optional)</span>
            </Label>
            <Input
              id="industry"
              placeholder="e.g. Fintech, Healthcare"
              {...register("industry")}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-semibold">
              Company Size <span className="text-muted-foreground font-normal">(optional)</span>
            </Label>
            <Select onValueChange={(val) => setValue("companySize", val)}>
              <SelectTrigger>
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

          <div className="space-y-2">
            <Label htmlFor="website" className="text-sm font-semibold">
              Website <span className="text-muted-foreground font-normal">(optional)</span>
            </Label>
            <Input
              id="website"
              placeholder="https://yourcompany.com"
              {...register("website")}
            />
            {errors.website && (
              <p className="text-sm text-destructive">{errors.website.message}</p>
            )}
          </div>
        </>
      )}

      <div className="text-sm">
        <label className="flex items-start gap-2 cursor-pointer">
          <input
            type="checkbox"
            className="mt-1 rounded"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
          />
          <span className="text-muted-foreground">
            I agree to the{" "}
            <Link to="/terms" className="text-primary hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
          </span>
        </label>
      </div>

      <div className="flex gap-3">
        <Button type="button" variant="outline" className="flex-1" onClick={onBack} disabled={isSubmitting}>
          ← Back
        </Button>
        <Button variant="gold" type="submit" className="flex-1" disabled={isSubmitting || !termsAccepted}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating…
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
