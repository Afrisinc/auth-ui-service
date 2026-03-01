import { Users, Handshake, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const opportunities = [
  {
    icon: Users,
    title: "Join Our Team",
    description:
      "Be part of a dynamic team shaping the future of African tech and media. We're always looking for passionate innovators.",
    cta: "View Open Positions",
  },
  {
    icon: Handshake,
    title: "Partner With Us",
    description:
      "Collaborate with Afrisinc to bring your ideas to life. We partner with businesses, creators, and organizations worldwide.",
    cta: "Explore Partnerships",
  },
  {
    icon: TrendingUp,
    title: "Invest in Growth",
    description:
      "Join our journey as an investor and be part of Africa's most ambitious technology and media venture.",
    cta: "Investment Opportunities",
  },
];

export const CareersSection = () => {
  return (
    <section id="careers" className="py-24 md:py-32 bg-charcoal text-cream relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-forest/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-gold font-semibold text-sm uppercase tracking-widest mb-4 block">
            Work With Us
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Be Part of the
            <span className="text-gradient-gold block">Afrisinc Story</span>
          </h2>
          <p className="text-cream/70 text-lg leading-relaxed">
            Whether you're looking to build your career, partner on projects, 
            or invest in innovation—there's a place for you at Afrisinc.
          </p>
        </div>

        {/* Opportunities Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {opportunities.map((opportunity) => (
            <div
              key={opportunity.title}
              className="group bg-cream/5 backdrop-blur-sm rounded-2xl p-8 border border-cream/10 hover:border-gold/30 transition-all duration-500 hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-xl bg-gold/20 flex items-center justify-center mb-6 group-hover:bg-gold/30 transition-colors duration-300">
                <opportunity.icon className="w-7 h-7 text-gold" />
              </div>

              <h3 className="text-2xl font-bold text-cream mb-3">
                {opportunity.title}
              </h3>

              <p className="text-cream/60 leading-relaxed mb-6">
                {opportunity.description}
              </p>

              <Button variant="ghost" className="text-gold hover:text-gold-light hover:bg-gold/10 p-0 h-auto font-medium">
                {opportunity.cta} →
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
