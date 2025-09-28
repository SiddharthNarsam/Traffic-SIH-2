import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Camera, 
  Wifi, 
  Server,
  Plus,
  Edit,
  Trash2,
  Activity,
  Shield,
  Database
} from "lucide-react";

const intersectionData = [
  { id: 1, name: 'Main St & 1st Ave', cameras: 4, sensors: 8, status: 'online' },
  { id: 2, name: 'Oak St & 2nd Ave', cameras: 3, sensors: 6, status: 'online' },
  { id: 3, name: 'Pine St & 3rd Ave', cameras: 4, sensors: 7, status: 'maintenance' },
  { id: 4, name: 'Elm St & 4th Ave', cameras: 2, sensors: 5, status: 'offline' },
];

const userData = [
  { id: 1, name: 'John Admin', role: 'Admin', status: 'active', lastLogin: '2024-01-15 14:30' },
  { id: 2, name: 'Sarah Officer', role: 'Traffic Officer', status: 'active', lastLogin: '2024-01-15 13:45' },
  { id: 3, name: 'Mike Viewer', role: 'Viewer', status: 'inactive', lastLogin: '2024-01-14 16:20' },
];

const auditLogs = [
  { id: 1, action: 'Manual Override', user: 'Sarah Officer', location: 'Main St', time: '14:32' },
  { id: 2, action: 'AI Decision', user: 'System', location: 'Oak St', time: '14:28' },
  { id: 3, action: 'Emergency Mode', user: 'John Admin', location: 'All', time: '14:25' },
  { id: 4, action: 'Signal Override', user: 'Sarah Officer', location: 'Pine St', time: '14:20' },
];

export default function Admin() {
  return (
    <div className="min-h-screen bg-gradient-dashboard p-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">System Administration</h1>
            <p className="text-muted-foreground">Manage intersections, users, and system health</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button className="cyber-button">
              <Plus className="mr-2 h-4 w-4" />
              Add Intersection
            </Button>
          </div>
        </div>

        {/* System Health Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="dashboard-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Camera Systems</p>
                  <p className="text-2xl font-bold">13/16</p>
                  <p className="text-xs text-success">81% operational</p>
                </div>
                <Camera className="h-8 w-8 text-accent" />
              </div>
            </CardContent>
          </Card>

          <Card className="dashboard-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">IoT Sensors</p>
                  <p className="text-2xl font-bold">24/26</p>
                  <p className="text-xs text-success">92% operational</p>
                </div>
                <Wifi className="h-8 w-8 text-accent" />
              </div>
            </CardContent>
          </Card>

          <Card className="dashboard-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Server Health</p>
                  <p className="text-2xl font-bold">98%</p>
                  <p className="text-xs text-success">All services running</p>
                </div>
                <Server className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>

          <Card className="dashboard-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Users</p>
                  <p className="text-2xl font-bold">2/3</p>
                  <p className="text-xs text-accent">Currently online</p>
                </div>
                <Users className="h-8 w-8 text-accent" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Intersection Management */}
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Intersection Management</span>
                <Button size="sm" variant="outline" className="border-accent/30">
                  <Plus className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {intersectionData.map((intersection) => (
                  <div key={intersection.id} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{intersection.name}</h4>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-1">
                        <div className="flex items-center">
                          <Camera className="h-3 w-3 mr-1" />
                          {intersection.cameras} cameras
                        </div>
                        <div className="flex items-center">
                          <Wifi className="h-3 w-3 mr-1" />
                          {intersection.sensors} sensors
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={
                        intersection.status === 'online' ? 'default' :
                        intersection.status === 'maintenance' ? 'secondary' : 'destructive'
                      }>
                        {intersection.status}
                      </Badge>
                      <Button size="sm" variant="ghost">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* User Management */}
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>User Management</span>
                <Button size="sm" variant="outline" className="border-accent/30">
                  <Plus className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userData.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{user.name}</h4>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-1">
                        <Badge variant="outline" className="text-xs">
                          {user.role}
                        </Badge>
                        <span>Last: {user.lastLogin}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                        {user.status}
                      </Badge>
                      <Button size="sm" variant="ghost">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Monitoring & Audit Logs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="mr-2 h-5 w-5 text-accent" />
                System Health Monitoring
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-success/10 border border-success/30 rounded-lg">
                  <div className="flex items-center">
                    <Database className="h-5 w-5 text-success mr-3" />
                    <div>
                      <p className="font-medium">Database</p>
                      <p className="text-xs text-muted-foreground">Response: 23ms</p>
                    </div>
                  </div>
                  <Badge variant="default" className="bg-success">Healthy</Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-success/10 border border-success/30 rounded-lg">
                  <div className="flex items-center">
                    <Server className="h-5 w-5 text-success mr-3" />
                    <div>
                      <p className="font-medium">API Services</p>
                      <p className="text-xs text-muted-foreground">Load: 45%</p>
                    </div>
                  </div>
                  <Badge variant="default" className="bg-success">Healthy</Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-warning/10 border border-warning/30 rounded-lg">
                  <div className="flex items-center">
                    <Camera className="h-5 w-5 text-warning mr-3" />
                    <div>
                      <p className="font-medium">Camera Network</p>
                      <p className="text-xs text-muted-foreground">3 cameras offline</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-warning text-black">Warning</Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-success/10 border border-success/30 rounded-lg">
                  <div className="flex items-center">
                    <Shield className="h-5 w-5 text-success mr-3" />
                    <div>
                      <p className="font-medium">Security</p>
                      <p className="text-xs text-muted-foreground">All systems secure</p>
                    </div>
                  </div>
                  <Badge variant="default" className="bg-success">Secure</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle>Audit Logs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {auditLogs.map((log) => (
                  <div key={log.id} className="p-3 bg-secondary/30 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-sm">{log.action}</h4>
                      <span className="text-xs text-muted-foreground">{log.time}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">by {log.user}</span>
                      <span className="text-accent">{log.location}</span>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4 border-accent/30">
                View Full Audit Trail
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}