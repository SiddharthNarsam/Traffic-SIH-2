import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Camera, 
  Wifi, 
  Server, 
  Database, 
  Shield, 
  Activity 
} from "lucide-react";

export function SystemHealth() {
  const healthMetrics = [
    {
      name: "Camera Systems",
      status: "warning",
      value: "13/16",
      detail: "3 cameras offline",
      icon: Camera,
      percentage: 81
    },
    {
      name: "IoT Sensors",
      status: "healthy",
      value: "24/26",
      detail: "All sensors responding",
      icon: Wifi,
      percentage: 92
    },
    {
      name: "AI Processing",
      status: "healthy",
      value: "98%",
      detail: "Response: 23ms",
      icon: Database,
      percentage: 98
    },
    {
      name: "Network Security",
      status: "healthy",
      value: "Secure",
      detail: "All systems protected",
      icon: Shield,
      percentage: 100
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'healthy':
        return <Badge variant="default" className="bg-success text-white">Healthy</Badge>;
      case 'warning':
        return <Badge variant="secondary" className="bg-warning text-black">Warning</Badge>;
      case 'error':
        return <Badge variant="destructive">Error</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <Card className="dashboard-card">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Activity className="mr-2 h-5 w-5 text-accent" />
          System Health
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {healthMetrics.map((metric, index) => (
            <div 
              key={index}
              className={`flex items-center justify-between p-3 border rounded-lg ${
                metric.status === 'healthy' ? 'bg-success/10 border-success/30' :
                metric.status === 'warning' ? 'bg-warning/10 border-warning/30' :
                'bg-destructive/10 border-destructive/30'
              }`}
            >
              <div className="flex items-center">
                <metric.icon className={`h-5 w-5 mr-3 ${
                  metric.status === 'healthy' ? 'text-success' :
                  metric.status === 'warning' ? 'text-warning' :
                  'text-destructive'
                }`} />
                <div>
                  <p className="font-medium text-sm">{metric.name}</p>
                  <p className="text-xs text-muted-foreground">{metric.detail}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-sm font-mono">{metric.value}</span>
                {getStatusBadge(metric.status)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}