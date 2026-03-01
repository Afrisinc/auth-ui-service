import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAccount } from "@/services/userService";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, User, Building2, Loader2 } from "lucide-react";

type AccountType = "INDIVIDUAL" | "ORGANIZATION";

const ACCOUNT_TYPES: { type: AccountType; label: string; description: string; icon: React.ElementType }[] = [
  {
    type: "INDIVIDUAL",
    label: "Individual",
    description: "Personal account for a single user",
    icon: User,
  },
  {
    type: "ORGANIZATION",
    label: "Organization",
    description: "Shared account for teams and companies",
    icon: Building2,
  },
];

const CreateAccount = () => {
  const [selectedType, setSelectedType] = useState<AccountType>("INDIVIDUAL");
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => createAccount({ type: selectedType }),
    onSuccess: (account) => {
      queryClient.invalidateQueries({ queryKey: ["my-accounts", user?.id] });
      toast({
        title: "Account created",
        description: `Your ${selectedType.toLowerCase()} account is ready.`,
      });
      navigate(`/accounts/${account.id}`);
    },
    onError: () => {
      toast({
        title: "Creation failed",
        description: "Could not create account. Please try again.",
        variant: "destructive",
      });
    },
  });

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/accounts">
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Create Account</h1>
          <p className="text-muted-foreground">Choose your account type</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {ACCOUNT_TYPES.map(({ type, label, description, icon: Icon }) => (
          <button
            key={type}
            type="button"
            onClick={() => setSelectedType(type)}
            className={`text-left rounded-xl border-2 p-5 transition-all ${
              selectedType === type
                ? "border-primary bg-primary/5"
                : "border-border hover:border-muted-foreground/40"
            }`}
          >
            <div className="flex items-center gap-3 mb-2">
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  selectedType === type ? "bg-primary text-primary-foreground" : "bg-muted"
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span className="font-semibold">{label}</span>
            </div>
            <p className="text-sm text-muted-foreground">{description}</p>
          </button>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Account Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Type</span>
            <span className="font-medium">{selectedType}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Owner</span>
            <span className="font-medium truncate max-w-48">{user?.email}</span>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button variant="outline" asChild>
          <Link to="/accounts">Cancel</Link>
        </Button>
        <Button variant="gold" onClick={() => mutate()} disabled={isPending}>
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Creating...
            </>
          ) : (
            "Create Account"
          )}
        </Button>
      </div>
    </div>
  );
};

export default CreateAccount;
