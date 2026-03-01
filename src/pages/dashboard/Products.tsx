import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Shield, Cloud, BarChart3, Lock } from "lucide-react";

const products = [
  { 
    name: "Afrisinc Cloud", 
    status: "Live", 
    users: "1,234",
    description: "Enterprise cloud infrastructure",
    icon: Cloud,
    route: null,
  },
  { 
    name: "Analytics Suite", 
    status: "Live", 
    users: "856",
    description: "Business intelligence & analytics",
    icon: BarChart3,
    route: null,
  },
  { 
    name: "VPN Network", 
    status: "Live", 
    users: "567",
    description: "Secure VPN infrastructure management",
    icon: Shield,
    route: "/dashboard/products/vpn",
  },
  { 
    name: "SecureID", 
    status: "Beta", 
    users: "342",
    description: "Identity & access management",
    icon: Lock,
    route: null,
  },
];

const DashboardProducts = () => {
  const navigate = useNavigate();

  const handleProductClick = (route: string | null) => {
    if (route) {
      navigate(route);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Products</h1>
          <p className="text-muted-foreground">Manage your products and services</p>
        </div>
        <Button variant="gold">
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {products.map((p) => (
          <Card 
            key={p.name} 
            className={`hover:shadow-card-hover transition-all duration-200 ${p.route ? 'cursor-pointer hover:-translate-y-1' : ''}`}
            onClick={() => handleProductClick(p.route)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="p-2.5 rounded-lg bg-primary/10">
                  <p.icon className="h-5 w-5 text-primary" />
                </div>
                <Badge variant={p.status === "Live" ? "default" : "secondary"}>
                  {p.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <CardTitle className="text-lg">{p.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{p.description}</p>
              <p className="text-sm font-medium">{p.users} active users</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardProducts;
