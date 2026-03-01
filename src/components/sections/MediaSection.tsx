import { Play, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const mediaItems = [
  {
    type: "Video",
    title: "The Rise of African Tech Startups",
    description: "Exploring the booming startup ecosystem across the continent.",
    duration: "12:45",
    category: "Documentary",
  },
  {
    type: "Article",
    title: "Innovation in African FinTech",
    description: "How mobile money is transforming financial inclusion.",
    readTime: "5 min read",
    category: "News",
  },
  {
    type: "Podcast",
    title: "Founders Unplugged: Episode 23",
    description: "Conversations with Africa's most innovative entrepreneurs.",
    duration: "45:00",
    category: "Podcast",
  },
];

export const MediaSection = () => {
  return (
    <section id="media" className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-muted/30 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <span className="text-primary font-semibold text-sm uppercase tracking-widest mb-4 block">
              Media Hub
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              Stories That
              <span className="text-gradient-gold"> Inspire</span>
            </h2>
          </div>
          <Button variant="hero-outline" className="self-start md:self-auto">
            View All Content
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Media Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {mediaItems.map((item, index) => (
            <article
              key={item.title}
              className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 border border-border/50 hover:border-primary/20 hover:-translate-y-1"
            >
              {/* Thumbnail Placeholder */}
              <div className="relative aspect-video bg-muted overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-forest/20 to-gold/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  {item.type === "Video" || item.type === "Podcast" ? (
                    <div className="w-16 h-16 rounded-full bg-background/90 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <Play className="w-6 h-6 text-foreground ml-1" />
                    </div>
                  ) : (
                    <span className="text-6xl font-display italic text-foreground/10">A</span>
                  )}
                </div>
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-background/90 text-foreground">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                  <Clock className="w-3 h-3" />
                  <span>{item.duration || item.readTime}</span>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
