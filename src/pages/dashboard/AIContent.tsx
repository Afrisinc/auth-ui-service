import { Sparkles, TrendingUp, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import CreatePostForm from "@/components/dashboard/CreatePostForm";
import PostsTable from "@/components/dashboard/PostsTable";
import { useAIPosts } from "@/hooks/useAIPosts";

const AIContent = () => {
  const { data: posts } = useAIPosts(100); // Fetch up to 100 posts for stats

  const stats = {
    total: posts?.length || 0,
    published: posts?.filter(p => p.status === "published").length || 0,
    pending: posts?.filter(p => p.status === "pending").length || 0,
    failed: posts?.filter(p => p.status === "failed").length || 0,
  };

  const statCards = [
    { 
      label: "Total Posts", 
      value: stats.total, 
      icon: TrendingUp, 
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    { 
      label: "Published", 
      value: stats.published, 
      icon: CheckCircle2, 
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10"
    },
    { 
      label: "Pending", 
      value: stats.pending, 
      icon: Clock, 
      color: "text-amber-500",
      bgColor: "bg-amber-500/10"
    },
    { 
      label: "Failed", 
      value: stats.failed, 
      icon: AlertCircle, 
      color: "text-destructive",
      bgColor: "bg-destructive/10"
    },
  ];

  return (
    <div className="space-y-8 animate-fade-up">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-primary/10">
            <Sparkles className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">AI Content Studio</h1>
            <p className="text-muted-foreground">
              Generate and manage AI-powered social media posts
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statCards.map((stat) => (
          <Card key={stat.label} className="border-border/50 hover:shadow-md transition-shadow duration-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <CreatePostForm />
        </div>
        <div className="lg:col-span-2">
          <PostsTable />
        </div>
      </div>
    </div>
  );
};

export default AIContent;
