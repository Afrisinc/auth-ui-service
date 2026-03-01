import { PublicLayout } from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Target, Eye, Rocket, Globe, Users, TrendingUp, Award, Heart } from "lucide-react";

const values = [
  {
    icon: Rocket,
    title: "Innovation First",
    description: "We push boundaries and embrace cutting-edge technology to solve real-world problems.",
  },
  {
    icon: Globe,
    title: "Global Standards",
    description: "African excellence meeting international quality in every product we deliver.",
  },
  {
    icon: Users,
    title: "People-Centric",
    description: "Building technology that empowers individuals and transforms communities.",
  },
  {
    icon: TrendingUp,
    title: "Sustainable Growth",
    description: "Long-term thinking that balances business success with social responsibility.",
  },
];

const milestones = [
  { year: "2020", title: "Founded", description: "Afrisinc established with a vision for African tech excellence" },
  { year: "2021", title: "Media Launch", description: "Launched our media division with news and content platforms" },
  { year: "2022", title: "Tech Expansion", description: "Expanded into enterprise software and SaaS platforms" },
  { year: "2023", title: "Global Reach", description: "Partnerships across 15+ countries and growing" },
  { year: "2024", title: "Innovation Hub", description: "Opened our flagship technology innovation center" },
];

const About = () => {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-hero">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-up">
              About Afrisinc
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 animate-fade-up animation-delay-100">
              Building Africa's
              <span className="text-gradient-gold block">Technology Future</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-up animation-delay-200">
              We are a technology-first company with deep African roots and global ambitions. 
              From enterprise software to digital media, we're shaping the future of innovation.
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-card rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-shadow animate-fade-up">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed">
                To become Africa's leading technology conglomerate, setting global standards 
                in software innovation, digital media, and enterprise solutions. We envision 
                a future where African technology talent and solutions power businesses worldwide.
              </p>
            </div>
            <div className="bg-card rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-shadow animate-fade-up animation-delay-100">
              <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-secondary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                To build world-class technology products and platforms that solve real problems, 
                create value for businesses and individuals, and showcase African excellence 
                on the global stage. We commit to innovation, quality, and sustainable growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Core Values
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do at Afrisinc
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="bg-card rounded-xl p-6 text-center shadow-card hover:shadow-card-hover transition-all hover:-translate-y-1 animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Journey
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Key milestones in our path to becoming a global technology leader
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-0.5" />
              {milestones.map((milestone, index) => (
                <div
                  key={milestone.year}
                  className={`relative flex items-center gap-8 mb-12 animate-fade-up ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"} hidden md:block`}>
                    <div className="bg-card rounded-xl p-6 shadow-card">
                      <span className="text-primary font-bold text-lg">{milestone.year}</span>
                      <h3 className="text-xl font-semibold text-foreground mt-1">{milestone.title}</h3>
                      <p className="text-muted-foreground text-sm mt-2">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background -translate-x-2 md:-translate-x-2 z-10" />
                  <div className="flex-1 ml-16 md:ml-0 md:hidden">
                    <div className="bg-card rounded-xl p-6 shadow-card">
                      <span className="text-primary font-bold text-lg">{milestone.year}</span>
                      <h3 className="text-xl font-semibold text-foreground mt-1">{milestone.title}</h3>
                      <p className="text-muted-foreground text-sm mt-2">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-charcoal text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Build the Future Together?
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto mb-8">
            Whether you're looking to partner, invest, or join our team, we'd love to hear from you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="gold" size="lg" asChild>
              <Link to="/contact">Get in Touch</Link>
            </Button>
            <Button variant="outline" size="lg" className="border-white/20 hover:bg-white/10" asChild>
              <Link to="/careers">View Careers</Link>
            </Button>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default About;
