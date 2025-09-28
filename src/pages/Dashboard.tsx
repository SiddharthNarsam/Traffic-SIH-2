import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTrafficSystem } from "@/hooks/useTrafficSystem";
import { 
  Monitor, 
  Camera, 
  Car, 
  Truck, 
  Bike,
  Ambulance,
  AlertTriangle,
  Timer,
  Activity,
  Settings,
  Play,
  Pause,
  CheckCircle
} from "lucide-react";

// Mock video feeds
const videoFeeds = [
  { id: 1, name: "Intersection A", status: "online" },
  { id: 2, name: "Intersection B", status: "online" },
  { id: 3, name: "Intersection C", status: "maintenance" },
  { id: 4, name: "Intersection D", status: "online" },
];

// Traffic light component
function TrafficLight({ status, timer }: { status: string; timer: number }) {
  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="flex flex-col space-y-1 bg-secondary/50 p-2 rounded-lg">
        <div className={`w-4 h-4 rounded-full ${status === 'red' ? 'traffic-light-red' : 'bg-muted'}`} />
        <div className={`w-4 h-4 rounded-full ${status === 'amber' ? 'traffic-light-amber' : 'bg-muted'}`} />
        <div className={`w-4 h-4 rounded-full ${status === 'green' ? 'traffic-light-green' : 'bg-muted'}`} />
      </div>
      <div className="text-xs text-center">
        <div className="font-mono font-bold">{timer}s</div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { intersections, systemMode, setSystemMode, isRunning, setIsRunning } = useTrafficSystem();
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'emergency', message: 'Emergency vehicle detected at Main St - Green wave activated', time: '14:32' },
    { id: 2, type: 'congestion', message: 'High congestion detected at Pine St intersection', time: '14:28' },
    { id: 3, type: 'anomaly', message: 'Wrong-way vehicle detected on Oak St', time: '14:25' },
  ]);

  // Simulate real-time updates
  useEffect(() => {
    if (!isRunning) return;
    
    const interval = setInterval(() => {
      // Update notifications based on intersection events
      const emergencyIntersections = intersections.filter(i => i.emergencyVehicle);
      const congestionIntersections = intersections.filter(i => i.congestionLevel === 'high');
      
      if (emergencyIntersections.length > 0 && Math.random() > 0.7) {
        const newNotification = {
          id: Date.now(),
          type: 'emergency',
          message: `Emergency vehicle priority activated at ${emergencyIntersections[0].name}`,
          time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })
        };
        setNotifications(prev => [newNotification, ...prev.slice(0, 4)]);
      }
      
      if (congestionIntersections.length > 0 && Math.random() > 0.8) {
        const newNotification = {
          id: Date.now(),
          type: 'warning',
          message: `High congestion detected at ${congestionIntersections[0].name}`,
          time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })
        };
        setNotifications(prev => [newNotification, ...prev.slice(0, 4)]);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isRunning, intersections]);

  return (
    <div className="min-h-screen bg-gradient-dashboard p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Real-Time Traffic Control</h1>
            <p className="text-muted-foreground">Live monitoring and AI-powered signal management</p>
          </div>
          <div className="flex items-center space-x-4">
            {/* Control Mode */}
            <div className="flex items-center space-x-2">
              <span className="text-sm">Mode:</span>
              <div className="flex bg-secondary rounded-lg p-1">
                {['auto', 'semi', 'manual'].map((m) => (
                  <Button
                    key={m}
                    variant={systemMode.current === m ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setSystemMode(prev => ({ ...prev, current: m as any }))}
                    className={systemMode.current === m ? 'bg-accent text-accent-foreground' : ''}
                  >
                    {m.charAt(0).toUpperCase() + m.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsRunning(!isRunning)}
              className="border-accent/30"
            >
              {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {isRunning ? 'Pause' : 'Play'}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Live Video Feeds */}
          <Card className="dashboard-card lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Camera className="mr-2 h-5 w-5 text-accent" />
                Live Traffic Feeds
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {videoFeeds.map((feed) => (
                  <div key={feed.id} className="relative">
                    <div className="aspect-video bg-secondary/30 rounded-lg overflow-hidden">
                      {/* Simulated video feed */}
                      <div className="w-full h-full bg-gradient-to-br from-secondary/50 to-secondary/20 flex items-center justify-center">
                        <div className="text-center">
                          <Monitor className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground">{feed.name}</p>
                        </div>
                      </div>
                      {/* Status indicator */}
                      <div className="absolute top-2 right-2">
                        <Badge variant={feed.status === 'online' ? 'default' : 'destructive'}>
                          {feed.status}
                        </Badge>
                      </div>
                      {/* Simulated activity */}
                      {feed.status === 'online' && (
                        <div className="absolute bottom-2 left-2 bg-card/80 backdrop-blur-sm rounded px-2 py-1 text-xs">
                          <div className="flex items-center space-x-2">
                            <Car className="h-3 w-3" />
                            <span>{Math.floor(Math.random() * 15) + 5}</span>
                            <Truck className="h-3 w-3" />
                            <span>{Math.floor(Math.random() * 3)}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Signal Status */}
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="mr-2 h-5 w-5 text-success" />
                Signal Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {intersections.map((intersection) => (
                  <div key={intersection.id} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{intersection.name}</p>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-1">
                        <div className="flex items-center">
                          <Car className="h-3 w-3 mr-1" />
                          {intersection.cars}
                        </div>
                        <div className="flex items-center">
                          <Truck className="h-3 w-3 mr-1" />
                          {intersection.trucks}
                        </div>
                        <div className="flex items-center">
                          <Bike className="h-3 w-3 mr-1" />
                          {intersection.bikes}
                        </div>
                        {intersection.emergencyVehicle && (
                          <div className="flex items-center text-emergency">
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            Emergency
                          </div>
                        )}
                      </div>
                    </div>
                    <TrafficLight status={intersection.currentSignal} timer={intersection.timer} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Congestion Heatmap */}
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle>Congestion Heatmap</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative h-48 bg-secondary/30 rounded-lg overflow-hidden">
                <div className="traffic-heatmap" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="grid grid-cols-4 gap-4">
                    {[...Array(16)].map((_, i) => (
                      <div key={i} className="w-3 h-3 rounded-full bg-accent/50" />
                    ))}
                  </div>
                </div>
                <div className="absolute bottom-2 left-2 bg-card/80 backdrop-blur-sm rounded px-2 py-1 text-xs">
                  Live Traffic Density
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Emergency & Anomaly Detection */}
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="mr-2 h-5 w-5 text-warning" />
                Emergency Detection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {intersections.some(i => i.emergencyVehicle) ? (
                  <div className="flex items-center justify-between p-3 bg-emergency/10 border border-emergency/30 rounded-lg">
                    <div className="flex items-center">
                      <Ambulance className="h-5 w-5 text-emergency mr-3" />
                      <div>
                        <p className="text-sm font-medium">Emergency Vehicle</p>
                        <p className="text-xs text-muted-foreground">
                          {intersections.find(i => i.emergencyVehicle)?.name} - Priority active
                        </p>
                      </div>
                    </div>
                    <Badge variant="destructive">Active</Badge>
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-3 bg-success/10 border border-success/30 rounded-lg">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-success mr-3" />
                      <div>
                        <p className="text-sm font-medium">Normal Operations</p>
                        <p className="text-xs text-muted-foreground">No emergency vehicles detected</p>
                      </div>
                    </div>
                    <Badge variant="default" className="bg-success">Clear</Badge>
                  </div>
                )}
                
                <div className="p-3 bg-card/50 rounded-lg">
                  <div className="flex items-center">
                    <Settings className="h-4 w-4 text-accent mr-2" />
                    <span className="text-sm">Green Wave: Activated</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    AI created priority corridor
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notifications Panel */}
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle>System Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {notifications.map((notification) => (
                  <div key={notification.id} className="p-3 bg-secondary/30 rounded-lg">
                    <div className="flex items-start justify-between">
                      <p className="text-sm">{notification.message}</p>
                      <span className="text-xs text-muted-foreground ml-2">{notification.time}</span>
                    </div>
                    <Badge 
                      variant={notification.type === 'emergency' ? 'destructive' : 'default'}
                      className="mt-2"
                    >
                      {notification.type}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}