import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const DashboardSettings = () => (
  <div className="space-y-6">
    <div><h1 className="text-2xl font-bold">Settings</h1><p className="text-muted-foreground">Manage your account and preferences</p></div>
    <div className="grid lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader><CardTitle>Profile</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div><label className="text-sm font-medium">Full Name</label><Input defaultValue="John Doe" className="mt-1" /></div>
          <div><label className="text-sm font-medium">Email</label><Input defaultValue="john@afrisinc.com" className="mt-1" /></div>
          <Button variant="gold">Save Changes</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Security</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div><label className="text-sm font-medium">Current Password</label><Input type="password" className="mt-1" /></div>
          <div><label className="text-sm font-medium">New Password</label><Input type="password" className="mt-1" /></div>
          <Button variant="outline">Update Password</Button>
        </CardContent>
      </Card>
    </div>
  </div>
);

export default DashboardSettings;
