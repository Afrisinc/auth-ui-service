import { Newspaper, Code2, Package, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Newspaper,
    title: "Afrisinc Media",
    description:
      "News, YouTube channels, podcasts, blogs, and documentaries that tell Africa's story to the world.",
    features: ["Digital News", "Video Content", "Podcasts", "Blogs"],
    color: "primary",
  },
  {
    icon: Code2,
    title: "Technology & Software",
    description:
      "Cutting-edge SaaS platforms, enterprise systems, and custom software solutions built for scale.",
    features: ["SaaS Platforms", "Enterprise Systems", "Custom Development", "API Services"],
    color: "forest",
  },
  {
    icon: Package,
    title: "Digital Products",
    description:
      "Tools, templates, and digital solutions designed to solve real problems for modern businesses.",
    features: ["Business Tools", "Templates", "Automation", "Analytics"],
    color: "accent",
  },
  {
    icon: Sparkles,
    title: "Future Ventures",
    description:
      "Exploring new frontiers in AI, blockchain, and emerging technologies to shape tomorrow.",
    features: ["AI Solutions", "Blockchain", "Innovation Labs", "R&D"],
    color: "gold",
  },
];

const colorClasses = {
  primary: "bg-primary/10 text-primary group-hover:bg-primary/20",
  forest: "bg-forest/10 text-forest group-hover:bg-forest/20",
  accent: "bg-accent/10 text-accent group-hover:bg-accent/20",
  gold: "bg-gold/10 text-gold group-hover:bg-gold/20",
};

export const ServicesSection = () => {
  return (
    <section id="services" className="py-24 md:py-32 bg-muted/30 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-widest mb-4 block">
            Our Departments
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            A Unified Ecosystem of
            <span className="text-gradient-gold"> Innovation</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            From compelling content to cutting-edge technology, our departments 
            work together to deliver comprehensive solutions.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group bg-card rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all duration-500 border border-border/50 hover:border-primary/20 hover:-translate-y-1"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`w-14 h-14 rounded-xl ${colorClasses[service.color as keyof typeof colorClasses]} flex items-center justify-center mb-6 transition-colors duration-300`}>
                <service.icon className="w-7 h-7" />
              </div>

              <h3 className="text-2xl font-bold text-foreground mb-3">
                {service.title}
              </h3>

              <p className="text-muted-foreground leading-relaxed mb-6">
                {service.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {service.features.map((feature) => (
                  <span
                    key={feature}
                    className="px-3 py-1 text-xs font-medium rounded-full bg-muted text-muted-foreground"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button variant="hero-outline" size="lg">
            Explore All Services
          </Button>
        </div>
      </div>
    </section>
  );
};
