import { Target, Eye, Rocket } from "lucide-react";

const values = [
  {
    icon: Eye,
    title: "Vision",
    description:
      "To become Africa's leading technology and media conglomerate, setting global standards while staying rooted in African excellence.",
  },
  {
    icon: Target,
    title: "Mission",
    description:
      "Empowering businesses and individuals through innovative technology solutions and compelling media content that inspires and connects.",
  },
  {
    icon: Rocket,
    title: "Growth",
    description:
      "Starting with media, expanding into technology, SaaS platforms, digital products, and ultimately transforming industries.",
  },
];

export const AboutSection = () => {
  return (
    <section id="about" className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-muted/50 to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <span className="text-primary font-semibold text-sm uppercase tracking-widest mb-4 block">
              About Afrisinc
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6">
              African Excellence,
              <span className="text-gradient-gold block">Global Standards</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Afrisinc is more than a company—it's a movement. We're building a 
              multi-department ecosystem that bridges the gap between African innovation 
              and global markets. From media to technology, we're crafting solutions 
              that matter.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our philosophy is simple: start with stories, scale with software, 
              and succeed with systems. Every department, every product, every 
              service is designed to uplift and empower.
            </p>
          </div>

          {/* Right Content - Values Cards */}
          <div className="space-y-6">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="group bg-gradient-card rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-500 border border-border/50 hover:border-primary/20 hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
