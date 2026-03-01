import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, FileText, Video, Mic } from "lucide-react";

const DashboardMedia = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <div><h1 className="text-2xl font-bold">Media</h1><p className="text-muted-foreground">Manage articles, videos, and podcasts</p></div>
      <Button variant="gold"><Plus className="w-4 h-4 mr-2" />Create Content</Button>
    </div>
    <div className="grid sm:grid-cols-3 gap-6">
      <Card><CardHeader className="flex flex-row items-center gap-3"><FileText className="w-8 h-8 text-primary" /><div><CardTitle>Articles</CardTitle><p className="text-sm text-muted-foreground">24 published</p></div></CardHeader></Card>
      <Card><CardHeader className="flex flex-row items-center gap-3"><Video className="w-8 h-8 text-primary" /><div><CardTitle>Videos</CardTitle><p className="text-sm text-muted-foreground">12 published</p></div></CardHeader></Card>
      <Card><CardHeader className="flex flex-row items-center gap-3"><Mic className="w-8 h-8 text-primary" /><div><CardTitle>Podcasts</CardTitle><p className="text-sm text-muted-foreground">8 episodes</p></div></CardHeader></Card>
    </div>
  </div>
);

export default DashboardMedia;
