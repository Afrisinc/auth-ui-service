import { Link } from "react-router-dom";
import { Clock, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { Article } from "@/types/article";
import { formatDistanceToNow } from "date-fns";

interface FeaturedArticleProps {
  article: Article | null;
  isLoading?: boolean;
}

export function FeaturedArticle({ article, isLoading }: FeaturedArticleProps) {
  if (isLoading) {
    return (
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
    );
  }
  
  if (!article) return null;

  const timeAgo = formatDistanceToNow(new Date(article.published_at), { addSuffix: true });
  const categories = Array.isArray(article.category) ? article.category : [article.category];

  return (
    <div className="grid lg:grid-cols-2 gap-8 items-center">
      {/* Image */}
      <Link
        to={`/media/articles/${article.slug}`}
        className="relative rounded-2xl overflow-hidden aspect-video group"
      >
        <img
          src={article.featured_image}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
          Featured
        </Badge>
      </Link>

      {/* Content */}
      <div className="animate-fade-up animation-delay-100">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {categories.map((cat) => (
            <Badge key={cat} variant="outline" className="bg-primary/5 text-primary border-primary/30">
              {cat}
            </Badge>
          ))}
          <Badge 
            variant="outline" 
            className={
              article.type === "editorial" 
                ? "bg-primary/10 text-primary border-primary/20" 
                : article.type === "opinion"
                  ? "bg-purple-500/10 text-purple-600 border-purple-500/20"
                  : "bg-blue-500/10 text-blue-600 border-blue-500/20"
            }
          >
            {article.type === "editorial" ? "Afrisinc Editorial" : article.type === "opinion" ? "Opinion" : "News"}
          </Badge>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
          {article.title}
        </h2>
        
        <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
          {article.summary}
        </p>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
          {article.author && (
            <>
              <div className="flex items-center gap-2">
                {article.author.avatar && (
                  <img 
                    src={article.author.avatar} 
                    alt={article.author.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                )}
                <span className="font-medium text-foreground">{article.author.name}</span>
              </div>
              <span>•</span>
            </>
          )}
          <span>{timeAgo}</span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {article.read_time} min read
          </span>
        </div>
        
        <Button variant="gold" asChild>
          <Link to={`/media/articles/${article.slug}`}>
            Read Article
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
