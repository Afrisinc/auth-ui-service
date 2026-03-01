import { PublicLayout } from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Newspaper, 
  Youtube, 
  Mic, 
  FileText, 
  Play,
  Clock,
  ArrowRight,
  TrendingUp
} from "lucide-react";
import { useFeaturedArticle, useArticles } from "@/hooks/useArticles";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { formatDistanceToNow } from "date-fns";

const videos = [
  {
    title: "Afrisinc Cloud Platform Demo",
    duration: "12:45",
    views: "15K views",
    thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
  },
  {
    title: "Building Enterprise Software in Africa",
    duration: "24:30",
    views: "32K views",
    thumbnail: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&q=80",
  },
  {
    title: "Tech Leadership Panel Discussion",
    duration: "45:00",
    views: "28K views",
    thumbnail: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&q=80",
  },
];

const podcasts = [
  {
    title: "The Afrisinc Podcast",
    episode: "EP 42: Scaling Tech Teams Remotely",
    duration: "58 min",
    guest: "With Sarah Mensah, CTO",
  },
  {
    title: "The Afrisinc Podcast",
    episode: "EP 41: Future of Cloud Computing",
    duration: "45 min",
    guest: "With James Okonkwo, Head of Cloud",
  },
  {
    title: "The Afrisinc Podcast",
    episode: "EP 40: Startup to Enterprise Journey",
    duration: "52 min",
    guest: "With Amina Diallo, CEO",
  },
];

const Media = () => {
  const { data: featuredArticle, isLoading: isLoadingFeatured } = useFeaturedArticle();
  const { data: articlesData, isLoading: isLoadingArticles } = useArticles({ per_page: 4 });

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-hero">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-6 animate-fade-up">
              <Newspaper className="w-4 h-4 mr-2" />
              Afrisinc Media
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 animate-fade-up animation-delay-100">
              Insights & Stories from the
              <span className="text-gradient-gold block">Tech Frontier</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-up animation-delay-200">
              Stay informed with the latest news, insights, and stories from 
              Africa's technology ecosystem and beyond.
            </p>
          </div>
        </div>
      </section>

      {/* Content Tabs */}
      <section className="py-8 border-b border-border sticky top-[72px] bg-background z-40">
        <div className="container mx-auto px-6">
          <div className="flex gap-8 overflow-x-auto">
            <button className="flex items-center gap-2 pb-4 border-b-2 border-primary text-foreground font-medium whitespace-nowrap">
              <TrendingUp className="w-4 h-4" />
              All
            </button>
            <Link 
              to="/media/articles" 
              className="flex items-center gap-2 pb-4 border-b-2 border-transparent hover:border-primary text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
            >
              <FileText className="w-4 h-4" />
              Articles
            </Link>
            <button className="flex items-center gap-2 pb-4 border-b-2 border-transparent hover:border-primary text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap">
              <Youtube className="w-4 h-4" />
              Videos
            </button>
            <button className="flex items-center gap-2 pb-4 border-b-2 border-transparent hover:border-primary text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap">
              <Mic className="w-4 h-4" />
              Podcasts
            </button>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          {isLoadingFeatured ? (
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <Skeleton className="aspect-video rounded-2xl" />
              <div className="space-y-4">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-3/4" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-10 w-32" />
              </div>
            </div>
          ) : featuredArticle ? (
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <Link 
                to={`/media/articles/${featuredArticle.slug}`}
                className="relative rounded-2xl overflow-hidden aspect-video animate-fade-up group"
              >
                <img
                  src={featuredArticle.featured_image}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                  Featured
                </Badge>
              </Link>
              <div className="animate-fade-up animation-delay-100">
                <Badge variant="outline" className="mb-4">
                  {featuredArticle.category.name}
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {featuredArticle.title}
                </h2>
                <p className="text-muted-foreground mb-6">
                  {featuredArticle.summary}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                  <span>{formatDistanceToNow(new Date(featuredArticle.published_at), { addSuffix: true })}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {featuredArticle.read_time} min read
                  </span>
                </div>
                <Button variant="gold" asChild>
                  <Link to={`/media/articles/${featuredArticle.slug}`}>
                    Read Article
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      {/* Latest Articles */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-foreground">Latest Articles</h2>
            <Button variant="ghost" asChild>
              <Link to="/media/articles">
                View All
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
          {isLoadingArticles ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-card rounded-xl overflow-hidden">
                  <Skeleton className="aspect-[16/10] w-full" />
                  <div className="p-5 space-y-3">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {articlesData?.articles.slice(0, 4).map((article, index) => (
                <div
                  key={article.id}
                  className="animate-fade-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <ArticleCard article={article} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Videos */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                <Youtube className="w-5 h-5 text-destructive" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Video Content</h2>
            </div>
            <Button variant="ghost">
              View Channel
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video, index) => (
              <div
                key={video.title}
                className="group cursor-pointer animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative rounded-xl overflow-hidden aspect-video mb-4">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-14 h-14 rounded-full bg-background flex items-center justify-center">
                      <Play className="w-6 h-6 text-foreground fill-current ml-1" />
                    </div>
                  </div>
                  <span className="absolute bottom-2 right-2 px-2 py-1 bg-charcoal text-primary-foreground text-xs rounded">
                    {video.duration}
                  </span>
                </div>
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {video.title}
                </h3>
                <p className="text-sm text-muted-foreground">{video.views}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Podcasts */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Mic className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">The Afrisinc Podcast</h2>
            </div>
            <Button variant="ghost">
              All Episodes
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
          <div className="space-y-4">
            {podcasts.map((podcast, index) => (
              <div
                key={podcast.episode}
                className="group flex items-center gap-6 bg-card rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all cursor-pointer animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Play className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {podcast.episode}
                  </h3>
                  <p className="text-sm text-muted-foreground">{podcast.guest}</p>
                </div>
                <div className="text-sm text-muted-foreground hidden sm:block">
                  {podcast.duration}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-charcoal">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary-foreground">
            Stay Updated
          </h2>
          <p className="text-primary-foreground/70 max-w-xl mx-auto mb-8">
            Get the latest insights, news, and updates delivered directly to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg bg-background/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button variant="gold" size="lg">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default Media;
