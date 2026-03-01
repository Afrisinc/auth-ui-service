import { PublicLayout } from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  ArrowRight,
  Heart,
  Laptop,
  Plane,
  GraduationCap,
  Coffee,
  Users,
  Globe,
  Zap
} from "lucide-react";

const benefits = [
  { icon: Laptop, title: "Remote-First", description: "Work from anywhere in the world" },
  { icon: Heart, title: "Health & Wellness", description: "Comprehensive health coverage" },
  { icon: Plane, title: "Paid Time Off", description: "Generous vacation policy" },
  { icon: GraduationCap, title: "Learning Budget", description: "$2,000 annual development fund" },
  { icon: Coffee, title: "Home Office", description: "Equipment and setup allowance" },
  { icon: Users, title: "Team Events", description: "Regular retreats and meetups" },
];

const openings = [
  {
    title: "Senior Backend Engineer",
    department: "Engineering",
    location: "Remote (Africa)",
    type: "Full-time",
    level: "Senior",
  },
  {
    title: "Product Manager",
    department: "Product",
    location: "Lagos, Nigeria",
    type: "Full-time",
    level: "Mid-Level",
  },
  {
    title: "Senior Frontend Engineer",
    department: "Engineering",
    location: "Remote (Global)",
    type: "Full-time",
    level: "Senior",
  },
  {
    title: "DevOps Engineer",
    department: "Infrastructure",
    location: "Remote (Africa)",
    type: "Full-time",
    level: "Mid-Level",
  },
  {
    title: "UX Designer",
    department: "Design",
    location: "Nairobi, Kenya",
    type: "Full-time",
    level: "Mid-Level",
  },
  {
    title: "Content Writer",
    department: "Media",
    location: "Remote (Global)",
    type: "Full-time",
    level: "Junior",
  },
  {
    title: "Sales Development Representative",
    department: "Sales",
    location: "Johannesburg, SA",
    type: "Full-time",
    level: "Entry Level",
  },
  {
    title: "Data Analyst",
    department: "Analytics",
    location: "Remote (Africa)",
    type: "Full-time",
    level: "Mid-Level",
  },
];

const stats = [
  { value: "150+", label: "Team Members" },
  { value: "20+", label: "Countries" },
  { value: "45%", label: "Women in Tech" },
  { value: "4.8/5", label: "Employee Rating" },
];

const Careers = () => {
  const getLevelColor = (level: string) => {
    switch (level) {
      case "Senior":
        return "bg-primary/10 text-primary";
      case "Mid-Level":
        return "bg-secondary/10 text-secondary";
      case "Junior":
      case "Entry Level":
        return "bg-accent/10 text-accent";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-hero">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-6 animate-fade-up">
              <Briefcase className="w-4 h-4 mr-2" />
              Careers at Afrisinc
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 animate-fade-up animation-delay-100">
              Build the Future of
              <span className="text-gradient-gold block">African Technology</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-up animation-delay-200">
              Join a team of passionate innovators shaping the technology landscape. 
              We offer meaningful work, competitive compensation, and global opportunities.
            </p>
            <Button variant="gold" size="lg" className="animate-fade-up animation-delay-300">
              View Open Positions
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-b border-border">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={stat.label} className="animate-fade-up" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-muted-foreground text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Work With Us
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We believe in taking care of our team so they can do their best work
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={benefit.title}
                className="flex items-start gap-4 p-6 bg-card rounded-xl shadow-card hover:shadow-card-hover transition-all animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                Open Positions
              </h2>
              <p className="text-muted-foreground">
                {openings.length} opportunities available
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="sm">
                All Departments
              </Button>
              <Button variant="outline" size="sm">
                All Locations
              </Button>
            </div>
          </div>
          <div className="space-y-4">
            {openings.map((job, index) => (
              <div
                key={`${job.title}-${job.location}`}
                className="group bg-card rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all cursor-pointer animate-fade-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                        {job.title}
                      </h3>
                      <Badge className={getLevelColor(job.level)}>{job.level}</Badge>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" />
                        {job.department}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {job.type}
                      </span>
                    </div>
                  </div>
                  <Button variant="gold" className="lg:opacity-0 group-hover:opacity-100 transition-opacity">
                    Apply Now
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnerships CTA */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-charcoal rounded-2xl p-8 text-white animate-fade-up">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-6">
                <Globe className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Partner With Us</h3>
              <p className="text-white/70 mb-6">
                Looking for technology partnerships or collaborations? 
                Let's explore opportunities together.
              </p>
              <Button variant="gold" asChild>
                <Link to="/contact">Become a Partner</Link>
              </Button>
            </div>
            <div className="bg-primary/10 rounded-2xl p-8 animate-fade-up animation-delay-100">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">Investment Opportunities</h3>
              <p className="text-muted-foreground mb-6">
                Interested in investing in Africa's technology future? 
                We'd love to hear from you.
              </p>
              <Button variant="outline" asChild>
                <Link to="/contact">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default Careers;
