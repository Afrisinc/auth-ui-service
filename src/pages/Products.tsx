import { PublicLayout } from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Package, 
  Sparkles, 
  Check,
  ArrowRight,
  Smartphone,
  Globe,
  CreditCard,
  ShoppingCart,
  MessageSquare,
  Calendar
} from "lucide-react";

const products = [
  {
    icon: Globe,
    name: "Afrisinc Commerce",
    tagline: "Complete e-commerce platform",
    description: "Full-featured e-commerce solution with payment processing, inventory management, and analytics built for African markets.",
    status: "Live",
    pricing: "From $49/month",
    features: [
      "Multi-currency support",
      "Local payment gateways",
      "Inventory management",
      "Order tracking",
      "Analytics dashboard",
      "Mobile-first design",
    ],
  },
  {
    icon: MessageSquare,
    name: "Afrisinc Connect",
    tagline: "Customer engagement platform",
    description: "Unified communication platform for businesses to engage with customers across WhatsApp, SMS, email, and social media.",
    status: "Live",
    pricing: "From $29/month",
    features: [
      "Omnichannel messaging",
      "AI-powered chatbots",
      "Campaign management",
      "Customer analytics",
      "Team collaboration",
      "API integrations",
    ],
  },
  {
    icon: CreditCard,
    name: "Afrisinc Pay",
    tagline: "Payment infrastructure",
    description: "Accept payments from anywhere in Africa with support for mobile money, cards, bank transfers, and crypto.",
    status: "Beta",
    pricing: "2.5% + $0.25 per transaction",
    features: [
      "Mobile money integration",
      "Card processing",
      "Bank transfers",
      "Recurring payments",
      "Fraud detection",
      "Instant settlements",
    ],
  },
  {
    icon: Calendar,
    name: "Afrisinc Schedule",
    tagline: "Booking & scheduling tool",
    description: "Smart scheduling solution for businesses. Manage appointments, meetings, and resources effortlessly.",
    status: "Coming Soon",
    pricing: "From $19/month",
    features: [
      "Online booking",
      "Calendar sync",
      "Automated reminders",
      "Resource management",
      "Customer portal",
      "Payment collection",
    ],
  },
];

const integrations = [
  { name: "Stripe", logo: "💳" },
  { name: "Flutterwave", logo: "🌊" },
  { name: "Paystack", logo: "📦" },
  { name: "Slack", logo: "💬" },
  { name: "Shopify", logo: "🛒" },
  { name: "Zapier", logo: "⚡" },
];

const Products = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Live":
        return "bg-secondary text-secondary-foreground";
      case "Beta":
        return "bg-primary text-primary-foreground";
      case "Coming Soon":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-40 right-20 w-72 h-72 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-secondary rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-6 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-6 animate-fade-up">
              <Package className="w-4 h-4 mr-2" />
              Digital Products
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 animate-fade-up animation-delay-100">
              Tools That Power
              <span className="text-gradient-gold block">Modern Business</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-up animation-delay-200">
              A suite of digital products designed to help businesses grow, 
              engage customers, and scale operations efficiently.
            </p>
            <div className="flex flex-wrap justify-center gap-4 animate-fade-up animation-delay-300">
              <Button variant="gold" size="lg" asChild>
                <Link to="/contact">Get Started</Link>
              </Button>
              <Button variant="outline" size="lg">
                Compare Products
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="space-y-16">
            {products.map((product, index) => (
              <div
                key={product.name}
                className={`grid lg:grid-cols-2 gap-12 items-center animate-fade-up ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <product.icon className="w-6 h-6 text-primary" />
                    </div>
                    <Badge className={getStatusColor(product.status)}>
                      {product.status}
                    </Badge>
                  </div>
                  <h2 className="text-3xl font-bold text-foreground mb-2">
                    {product.name}
                  </h2>
                  <p className="text-primary font-medium mb-4">{product.tagline}</p>
                  <p className="text-muted-foreground mb-6">{product.description}</p>
                  <p className="text-lg font-semibold text-foreground mb-6">
                    {product.pricing}
                  </p>
                  <div className="flex flex-wrap gap-3 mb-8">
                    <Button variant="gold" asChild>
                      <Link to="/contact">Get Started</Link>
                    </Button>
                    <Button variant="outline">Learn More</Button>
                  </div>
                </div>
                <div className={`bg-card rounded-2xl p-8 shadow-card ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                  <h4 className="font-semibold text-foreground mb-4">Key Features</h4>
                  <ul className="space-y-3">
                    {product.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-muted-foreground">
                        <div className="w-5 h-5 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-secondary" />
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Seamless Integrations
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Connect with the tools you already use. Our products integrate with 
              popular platforms to streamline your workflow.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
            {integrations.map((integration, index) => (
              <div
                key={integration.name}
                className="flex items-center gap-3 px-6 py-3 bg-card rounded-full shadow-sm hover:shadow-card transition-shadow animate-fade-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className="text-2xl">{integration.logo}</span>
                <span className="font-medium text-foreground">{integration.name}</span>
              </div>
            ))}
            <div className="flex items-center gap-2 px-6 py-3 text-muted-foreground">
              <Sparkles className="w-4 h-4" />
              <span>+ 100 more</span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing CTA */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="bg-charcoal rounded-3xl p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto mb-8">
              Choose the products that fit your business needs. Bundle multiple 
              products for additional savings.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="gold" size="lg" asChild>
                <Link to="/contact">Contact Sales</Link>
              </Button>
              <Button variant="outline" size="lg" className="border-white/20 hover:bg-white/10">
                View Pricing
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default Products;
