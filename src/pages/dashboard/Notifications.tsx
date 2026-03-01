import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, CheckCircle, AlertCircle, Info } from "lucide-react";

const notifications = [
  { type: "success", title: "New user signed up", time: "2 min ago", icon: CheckCircle },
  { type: "warning", title: "Server load high", time: "1 hour ago", icon: AlertCircle },
  { type: "info", title: "New feature released", time: "3 hours ago", icon: Info },
];

const DashboardNotifications = () => (
  <div className="space-y-6">
    <div><h1 className="text-2xl font-bold">Notifications</h1><p className="text-muted-foreground">Stay updated with system alerts</p></div>
    <Card>
      <CardHeader><CardTitle className="flex items-center gap-2"><Bell className="w-5 h-5" />Recent Notifications</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        {notifications.map((n, i) => (
          <div key={i} className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
            <n.icon className={`w-5 h-5 ${n.type === "success" ? "text-green-600" : n.type === "warning" ? "text-yellow-600" : "text-blue-600"}`} />
            <div className="flex-1"><p className="font-medium">{n.title}</p><p className="text-sm text-muted-foreground">{n.time}</p></div>
          </div>
        ))}
      </CardContent>
    </Card>
  </div>
);

export default DashboardNotifications;
