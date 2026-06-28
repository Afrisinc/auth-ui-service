import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Building2, CheckCircle2 } from "lucide-react";
import type { AccountType } from "./schemas";

interface StepAccountTypeProps {
  selected: AccountType | null;
  onSelect: (type: AccountType) => void;
  onNext: () => void;
  onBack: () => void;
}

const options: {
  type: AccountType;
  title: string;
  description: string;
  features: string[];
  icon: typeof User;
}[] = [
  {
    type: "personal",
    title: "Personal Account",
    description: "Manage your individual identity and access",
    features: ["One profile", "Personal vault", "Mobile access"],
    icon: User,
  },
  {
    type: "company",
    title: "Organization Account",
    description: "Team management and enterprise features",
    features: ["Team members", "Advanced controls", "Analytics"],
    icon: Building2,
  },
];

const StepAccountType = ({
  selected,
  onSelect,
  onNext,
  onBack,
}: StepAccountTypeProps) => {
  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="pb-4 border-b border-border/50">
        <h2 className="text-lg font-semibold text-foreground mb-1">
          Account Type
        </h2>
        <p className="text-xs text-muted-foreground">
          Choose what best fits your needs
        </p>
      </div>

      {/* Account Type Options */}
      <div className="grid gap-4">
        {options.map(({ type, title, description, features, icon: Icon }) => (
          <Card
            key={type}
            onClick={() => onSelect(type)}
            className={`cursor-pointer transition-all duration-300 ${
              selected === type
                ? "border-primary bg-primary/5 shadow-card hover:shadow-card-hover"
                : "border-border/50 hover:border-primary/30 hover:shadow-md"
            }`}
          >
            <CardContent className="p-5">
              <div className="flex gap-4">
                {/* Icon Container */}
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-lg flex-shrink-0 ${
                    selected === type
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted/50 text-muted-foreground"
                  }`}
                >
                  <Icon className="h-6 w-6" />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-foreground text-sm">
                        {title}
                      </h3>
                      <p className="text-secondary text-xs mt-1">
                        {description}
                      </p>
                    </div>
                    {selected === type && (
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    )}
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-muted/50 text-muted-foreground"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-2">
        <Button
          type="button"
          variant="outline"
          className="flex-1 h-11 font-semibold"
          onClick={onBack}
        >
          ← Back
        </Button>
        <Button
          type="button"
          variant="default"
          className="flex-1 h-11 font-semibold rounded-lg shadow-primary hover:shadow-lg transition-all"
          disabled={!selected}
          onClick={onNext}
        >
          Continue to Details →
        </Button>
      </div>
    </div>
  );
};

export default StepAccountType;
