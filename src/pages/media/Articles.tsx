import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FeaturedArticle } from "@/components/articles/FeaturedArticle";
import { ArticleFiltersComponent } from "@/components/articles/ArticleFilters";
import { ArticlesList } from "@/components/articles/ArticlesList";
import { ArticlePagination } from "@/components/articles/ArticlePagination";
import { AggregatedDisclaimer } from "@/components/articles/AggregatedDisclaimer";
import { useArticles, useFeaturedArticle } from "@/hooks/useArticles";
import type { ArticleFilters } from "@/types/article";
import { 
  FileText, 
  ArrowLeft,
  LayoutGrid,
  LayoutList
} from "lucide-react";

const ArticlesPage = () => {
  const [filters, setFilters] = useState<ArticleFilters>({ page: 1, per_page: 9 });
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  
  const { data: articlesData, isLoading: isLoadingArticles } = useArticles(filters);
  const { data: featuredArticle, isLoading: isLoadingFeatured } = useFeaturedArticle();
  
  const handlePageChange = (page: number) => {
    setFilters(prev => ({ ...prev, page }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <PublicLayout>
      <Helmet>
        <title>Articles | Afrisinc Media</title>
        <meta 
          name="description" 
          content="Stay informed with the latest technology news, insights, and editorial content from Africa's tech ecosystem." 
        />
        <meta property="og:title" content="Articles | Afrisinc Media" />
        <meta property="og:description" content="Technology news, insights, and editorial content from Africa's tech ecosystem." />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Hero Section */}
      <section className="pt-32 pb-12 bg-gradient-hero">
        <div className="container mx-auto px-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/media" className="hover:text-foreground transition-colors flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" />
              Media
            </Link>
            <span>/</span>
            <span className="text-foreground">Articles</span>
          </div>
          
          <div className="max-w-3xl">
            <Badge variant="outline" className="mb-6 animate-fade-up text-sm font-medium">
              <FileText className="w-4 h-4 mr-2" />
              Afrisinc Articles
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-fade-up animation-delay-100 tracking-tight leading-[1.1]">
              Insights & Analysis from the
              <span className="text-gradient-gold block mt-2">Tech Frontier</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground animate-fade-up animation-delay-200 leading-relaxed">
              Original editorials, curated news, and expert opinions covering technology, 
              business, and innovation across Africa and beyond.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-12 border-b border-border">
        <div className="container mx-auto px-6">
          <FeaturedArticle 
            article={featuredArticle || null} 
            isLoading={isLoadingFeatured} 
          />
        </div>
      </section>

      {/* Articles Section */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2 tracking-tight">Latest Articles</h2>
              <p className="text-muted-foreground text-base">
                {articlesData?.total || 0} articles
              </p>
            </div>
            
            {/* View Toggle */}
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("grid")}
                className="rounded-lg"
              >
                <LayoutGrid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("list")}
                className="rounded-lg"
              >
                <LayoutList className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          {/* Filters */}
          <div className="mb-8">
            <ArticleFiltersComponent 
              filters={filters} 
              onFiltersChange={setFilters} 
            />
          </div>
          
          {/* Disclaimer */}
          <div className="mb-8">
            <AggregatedDisclaimer />
          </div>
          
          {/* Articles Grid/List */}
          <ArticlesList 
            articles={articlesData?.articles || []} 
            isLoading={isLoadingArticles}
            variant={viewMode}
          />
          
          {/* Pagination */}
          {articlesData && (
            <ArticlePagination
              currentPage={articlesData.page}
              totalPages={articlesData.total_pages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-charcoal">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
            Never Miss a Story
          </h2>
          <p className="text-white/70 max-w-xl mx-auto mb-8 text-base md:text-lg leading-relaxed">
            Get the latest articles, insights, and analysis delivered directly to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-primary text-base"
            />
            <Button variant="gold" size="lg" className="font-medium">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default ArticlesPage;
