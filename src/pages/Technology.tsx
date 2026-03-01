import { PublicLayout } from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Cloud, 
  Database, 
  Shield, 
  Zap, 
  Code2, 
  Cpu, 
  Globe, 
  Lock,
  BarChart3,
  Layers,
  Workflow,
  Server,
  ArrowRight
} from "lucide-react";

const platforms = [
  {
    icon: Cloud,
    name: "Afrisinc Cloud",
    description: "Enterprise-grade cloud infrastructure designed for African businesses. Scalable, secure, and optimized for regional compliance.",
    status: "Live",
    features: ["Auto-scaling", "Multi-region", "99.99% Uptime", "GDPR Compliant"],
  },
  {
    icon: BarChart3,
    name: "Analytics Suite",
    description: "Real-time business intelligence and data analytics platform. Transform your data into actionable insights.",
    status: "Live",
    features: ["Real-time Dashboards", "Custom Reports", "Predictive Analytics", "API Access"],
  },
  {
    icon: Workflow,
    name: "WorkFlow Pro",
    description: "Enterprise workflow automation and process management. Streamline operations across your organization.",
    status: "Beta",
    features: ["Visual Builder", "500+ Integrations", "Custom Triggers", "Audit Logs"],
  },
  {
    icon: Shield,
    name: "SecureID",
    description: "Identity and access management solution with biometric authentication for enhanced security.",
    status: "Live",
    features: ["Biometric Auth", "SSO Integration", "Role Management", "Compliance Tools"],
  },
  {
    icon: Database,
    name: "DataVault",
    description: "Managed database service with automatic backups, scaling, and enterprise-grade security.",
    status: "Beta",
    features: ["Multi-DB Support", "Auto Backups", "Read Replicas", "Encryption"],
  },
  {
    icon: Layers,
    name: "API Gateway",
    description: "Unified API management platform for building, deploying, and monitoring APIs at scale.",
    status: "Coming Soon",
    features: ["Rate Limiting", "Analytics", "Developer Portal", "SDK Generation"],
  },
];

const techStack = [
  { name: "Cloud Infrastructure", icon: Server, description: "Distributed systems built for scale" },
  { name: "Machine Learning", icon: Cpu, description: "AI-powered automation and insights" },
  { name: "Security First", icon: Lock, description: "Enterprise-grade security by design" },
  { name: "Global CDN", icon: Globe, description: "Lightning-fast content delivery" },
];

const Technology = () => {
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
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-6 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-6 animate-fade-up">
              <Code2 className="w-4 h-4 mr-2" />
              Technology & Software
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 animate-fade-up animation-delay-100">
              Enterprise-Grade
              <span className="text-gradient-gold block">Software Platforms</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-up animation-delay-200">
              World-class technology solutions built in Africa for the global market. 
              Scalable, secure, and designed for the modern enterprise.
            </p>
            <div className="flex flex-wrap justify-center gap-4 animate-fade-up animation-delay-300">
              <Button variant="gold" size="lg" asChild>
                <Link to="/contact">Request Demo</Link>
              </Button>
              <Button variant="outline" size="lg">
                View Documentation
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Overview */}
      <section className="py-16 border-b border-border">
        <div className="container mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {techStack.map((tech, index) => (
              <div
                key={tech.name}
                className="flex items-center gap-4 animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <tech.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{tech.name}</h3>
                  <p className="text-sm text-muted-foreground">{tech.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Platforms & Products
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive suite of software solutions designed to power modern businesses
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {platforms.map((platform, index) => (
              <div
                key={platform.name}
                className="group bg-card rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all hover:-translate-y-1 animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <platform.icon className="w-7 h-7 text-primary" />
                  </div>
                  <Badge className={getStatusColor(platform.status)}>
                    {platform.status}
                  </Badge>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{platform.name}</h3>
                <p className="text-muted-foreground text-sm mb-6">{platform.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {platform.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-3 py-1 text-xs font-medium bg-muted rounded-full text-muted-foreground"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
                <Button variant="ghost" className="w-full justify-between group-hover:text-primary">
                  Learn More
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-charcoal text-white">
        <div className="container mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="animate-fade-up">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">99.99%</div>
              <div className="text-white/70">Uptime SLA</div>
            </div>
            <div className="animate-fade-up animation-delay-100">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">500+</div>
              <div className="text-white/70">Enterprise Clients</div>
            </div>
            <div className="animate-fade-up animation-delay-200">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">15+</div>
              <div className="text-white/70">Countries Served</div>
            </div>
            <div className="animate-fade-up animation-delay-300">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">24/7</div>
              <div className="text-white/70">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Transform Your Business?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Get started with Afrisinc technology solutions today. Our team is ready to help 
              you find the perfect fit for your organization.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="gold" size="lg" asChild>
                <Link to="/contact">Contact Sales</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/dashboard">Try Dashboard</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default Technology;
