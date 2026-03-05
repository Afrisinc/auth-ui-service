import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Building2 } from "lucide-react";
import type { AccountType } from "./schemas";

interface StepAccountTypeProps {
  selected: AccountType | null;
  onSelect: (type: AccountType) => void;
  onNext: () => void;
  onBack: () => void;
}

const options: { type: AccountType; title: string; description: string; icon: typeof User }[] = [
  {
    type: "personal",
    title: "Personal Account",
    description: "For individual use.",
    icon: User,
  },
  {
    type: "company",
    title: "Organization Account",
    description: "For teams and companies.",
    icon: Building2,
  },
];

const StepAccountType = ({ selected, onSelect, onNext, onBack }: StepAccountTypeProps) => {
  return (
    <div className="space-y-5">
      <p className="heading-4 text-foreground text-center">How will you use Afrisinc?</p>
      <div className="grid gap-3">
        {options.map(({ type, title, description, icon: Icon }) => (
          <Card
            key={type}
            onClick={() => onSelect(type)}
            className={`cursor-pointer transition-colors hover:border-primary ${
              selected === type
                ? "border-primary bg-secondary"
                : "border-border"
            }`}
          >
            <CardContent className="flex items-center gap-4 p-4">
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                selected === type ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}>
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="heading-4 text-foreground">{title}</p>
                <p className="body-sm text-muted-foreground mt-1">{description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex gap-3">
        <Button type="button" variant="outline" className="flex-1" onClick={onBack}>
          ← Back
        </Button>
        <Button type="button" variant="default" className="flex-1" disabled={!selected} onClick={onNext}>
          Continue →
        </Button>
      </div>
    </div>
  );
};

export default StepAccountType;
