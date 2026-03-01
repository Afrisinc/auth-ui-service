import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useArticle, useArticles } from "@/hooks/useArticles";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { formatDistanceToNow, format } from "date-fns";
import { 
  ArrowLeft, 
  Clock, 
  Calendar, 
  ExternalLink, 
  Share2,
  Twitter,
  Linkedin,
  Facebook,
  Link2,
  RefreshCw
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { getCategoryPlaceholderImage } from "@/services/articlesService";

const typeStyles = {
  news: "bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/30",
  editorial: "bg-primary/10 text-primary border-primary/30",
  opinion: "bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/30",
};

const typeLabels = {
  news: "News",
  editorial: "Afrisinc Editorial",
  opinion: "Opinion",
};

const ArticleDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: article, isLoading, error } = useArticle(slug || "");
  const { data: relatedData } = useArticles({ 
    category: article?.category[0], 
    per_page: 3 
  });
  
  const relatedArticles = relatedData?.articles.filter(a => a.id !== article?.id).slice(0, 3) || [];
  
  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = article?.title || "";
    
    const urls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    };
    
    if (platform === "copy") {
      navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard");
      return;
    }
    
    window.open(urls[platform], "_blank", "width=600,height=400");
  };

  if (isLoading) {
    return (
      <PublicLayout>
        <div className="pt-32 pb-20">
          <div className="container mx-auto px-6">
            <Skeleton className="h-6 w-48 mb-6" />
            <Skeleton className="h-12 w-3/4 mb-4" />
            <Skeleton className="h-6 w-full max-w-2xl mb-8" />
            <Skeleton className="aspect-[21/9] rounded-2xl mb-8" />
            <div className="max-w-3xl mx-auto space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </div>
      </PublicLayout>
    );
  }

  if (error || !article) {
    return (
      <PublicLayout>
        <div className="pt-32 pb-20">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">Article Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The article you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild>
              <Link to="/media/articles">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Articles
              </Link>
            </Button>
          </div>
        </div>
      </PublicLayout>
    );
  }

  const publishedDate = new Date(article.published_at);
  const updatedDate = new Date(article.updated_at);
  const wasUpdated = updatedDate.getTime() !== publishedDate.getTime();

  return (
    <PublicLayout>
      <Helmet>
        <title>{article.seo.meta_title}</title>
        <meta name="description" content={article.seo.meta_description} />
        <meta property="og:title" content={article.seo.meta_title} />
        <meta property="og:description" content={article.seo.meta_description} />
        <meta property="og:image" content={article.seo.og_image || article.featured_image} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            "headline": article.title,
            "image": getCategoryPlaceholderImage(article.category),
            "datePublished": article.published_at,
            "dateModified": article.updated_at,
            "author": article.author ? {
              "@type": "Person",
              "name": article.author.name
            } : undefined,
            "publisher": {
              "@type": "Organization",
              "name": "Afrisinc",
              "logo": {
                "@type": "ImageObject",
                "url": "https://afrisinc.com/logo.png"
              }
            },
            "description": article.summary
          })}
        </script>
      </Helmet>

      {/* Article Header */}
      <section className="pt-32 pb-8 bg-gradient-hero">
        <div className="container mx-auto px-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/media" className="hover:text-foreground transition-colors">
              Media
            </Link>
            <span>/</span>
            <Link to="/media/articles" className="hover:text-foreground transition-colors">
              Articles
            </Link>
            <span>/</span>
            <span className="text-foreground truncate max-w-[200px]">{article.title}</span>
          </div>
          
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <Badge variant="outline">{article.category}</Badge>
            <Badge variant="outline" className={typeStyles[article.type]}>
              {typeLabels[article.type]}
            </Badge>
            {article.source && (
              <Badge variant="outline" className="bg-muted">
                <ExternalLink className="w-3 h-3 mr-1" />
                {article.source.name}
              </Badge>
            )}
          </div>
          
          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 max-w-4xl leading-[1.1] tracking-tight">
            {article.title}
          </h1>
          
          {/* Summary */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mb-8 leading-relaxed">
            {article.summary}
          </p>
          
          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            {article.author && (
              <div className="flex items-center gap-3">
                {article.author.avatar && (
                  <img 
                    src={article.author.avatar} 
                    alt={article.author.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                )}
                <div>
                  <div className="font-medium text-foreground">{article.author.name}</div>
                  {article.author.role && (
                    <div className="text-xs">{article.author.role}</div>
                  )}
                </div>
              </div>
            )}
            
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{format(publishedDate, "MMM d, yyyy")}</span>
            </div>
            
            {wasUpdated && (
              <div className="flex items-center gap-1 text-primary">
                <RefreshCw className="w-4 h-4" />
                <span>Updated {formatDistanceToNow(updatedDate, { addSuffix: true })}</span>
              </div>
            )}
            
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{article.read_time} min read</span>
            </div>
            
            {/* Share */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="rounded-full">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleShare("twitter")}>
                  <Twitter className="w-4 h-4 mr-2" />
                  Twitter
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleShare("linkedin")}>
                  <Linkedin className="w-4 h-4 mr-2" />
                  LinkedIn
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleShare("facebook")}>
                  <Facebook className="w-4 h-4 mr-2" />
                  Facebook
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleShare("copy")}>
                  <Link2 className="w-4 h-4 mr-2" />
                  Copy Link
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="py-8">
        <div className="container mx-auto px-6">
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <img
              src={article.featured_image}
              alt={article.title}
              className="w-full aspect-[21/9] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            {/* Source Attribution for News */}
            {article.source && (
              <div className="bg-muted/50 border border-border rounded-lg p-4 mb-8">
                <p className="text-sm text-muted-foreground">
                  This article is summarized from{" "}
                  <a 
                    href={article.source.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline inline-flex items-center gap-1"
                  >
                    {article.source.name}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  . Visit the original source for the full article.
                </p>
              </div>
            )}
            
            {/* Content */}
            <article 
              className="prose prose-lg dark:prose-invert max-w-none 
                prose-headings:font-bold prose-headings:text-foreground prose-headings:tracking-tight
                prose-p:text-foreground/80 prose-p:leading-relaxed
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                prose-strong:text-foreground prose-strong:font-semibold
                prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground
                prose-li:text-foreground/80"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-border">
              {article.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="rounded-full">
                  #{tag}
                </Badge>
              ))}
            </div>
            
            {/* Read Original (for aggregated) */}
            {article.source && (
              <div className="mt-8 p-6 bg-muted/30 rounded-xl border border-border text-center">
                <p className="text-muted-foreground mb-4">
                  Want to read the full original article?
                </p>
                <Button variant="gold" asChild>
                  <a href={article.source.url} target="_blank" rel="noopener noreferrer">
                    Visit {article.source.name}
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl font-bold text-foreground mb-8">Related Articles</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedArticles.map((related, index) => (
                <div 
                  key={related.id}
                  className="animate-fade-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <ArticleCard article={related} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back to Articles */}
      <section className="py-12">
        <div className="container mx-auto px-6 text-center">
          <Button variant="outline" size="lg" asChild>
            <Link to="/media/articles">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to All Articles
            </Link>
          </Button>
        </div>
      </section>
    </PublicLayout>
  );
};

export default ArticleDetail;
