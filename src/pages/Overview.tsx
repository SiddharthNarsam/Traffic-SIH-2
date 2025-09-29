import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { Clock, TrendingDown, Ambulance, Leaf, Play, Activity, MapPin, Zap, Monitor, Globe, Settings, ChartBar as BarChart3 } from "lucide-react";

// Animated counter component
function AnimatedCounter({ 
  value, 
  suffix = "", 
  prefix = "", 
  duration = 2000 
}: { 
  value: number; 
  suffix?: string; 
  prefix?: string; 
  duration?: number; 
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(prev => {
        const increment = value / (duration / 50);
        if (prev < value) {
          return Math.min(prev + increment, value);
        }
        return value;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [value, duration]);

  return (
    <span className="counter-animation">
      {prefix}{Math.round(count)}{suffix}
    </span>
  );
}

export default function Overview() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const { profile } = useAuth();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const stats = [
    {
      title: "Average Commute Time",
      value: 18,
      suffix: " min",
      change: -23,
      icon: Clock,
      color: "text-success"
    },
    {
      title: "Congestion Reduction",
      value: 35,
      suffix: "%",
      change: +12,
      icon: TrendingDown,
      color: "text-accent"
    },
    {
      title: "Emergency Vehicles Prioritized",
      value: 24,
      suffix: "",
      change: +6,
      icon: Ambulance,
      color: "text-warning"
    },
    {
      title: "CO₂ Saved Today",
      value: 1247,
      suffix: " kg",
      change: +18,
      icon: Leaf,
      color: "text-success"
    }
  ];

  const getRoleBasedCTA = () => {
    if (!profile) {
      return (
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/public">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Globe className="mr-2 h-5 w-5" />
              View Public Portal
            </Button>
          </Link>
          <Link to="/auth">
            <Button variant="outline" size="lg" className="border-accent/30 text-accent hover:bg-accent/10">
              <Monitor className="mr-2 h-5 w-5" />
              Sign In
            </Button>
          </Link>
        </div>
      );
    }

    switch (profile.role) {
      case 'admin':
        return (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Monitor className="mr-2 h-5 w-5" />
                Launch Dashboard
              </Button>
            </Link>
            <Link to="/admin">
              <Button variant="outline" size="lg" className="border-accent/30 text-accent hover:bg-accent/10">
                <Settings className="mr-2 h-5 w-5" />
                Admin Panel
              </Button>
            </Link>
          </div>
        );
      
      case 'traffic_officer':
        return (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Monitor className="mr-2 h-5 w-5" />
                Launch Dashboard
              </Button>
            </Link>
            <Link to="/control">
              <Button variant="outline" size="lg" className="border-accent/30 text-accent hover:bg-accent/10">
                <Settings className="mr-2 h-5 w-5" />
                Control Panel
              </Button>
            </Link>
          </div>
        );
      
      case 'emergency':
        return (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Monitor className="mr-2 h-5 w-5" />
                Emergency Dashboard
              </Button>
            </Link>
            <Link to="/control">
              <Button variant="outline" size="lg" className="border-accent/30 text-accent hover:bg-accent/10">
                <Ambulance className="mr-2 h-5 w-5" />
                Priority Control
              </Button>
            </Link>
          </div>
        );
      
      case 'citizen':
        return (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/simulation">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Play className="mr-2 h-5 w-5" />
                View Simulation
              </Button>
            </Link>
            <Link to="/analytics">
              <Button variant="outline" size="lg" className="border-accent/30 text-accent hover:bg-accent/10">
                <BarChart3 className="mr-2 h-5 w-5" />
                Impact Reports
              </Button>
            </Link>
          </div>
        );
      
      default:
        return (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/public">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Globe className="mr-2 h-5 w-5" />
                Public Portal
              </Button>
            </Link>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-dashboard">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/20 to-accent/10 py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(120,119,198,0.3),transparent_50%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-accent bg-clip-text text-transparent">
                AI-Powered Smart
              </span>
              <br />
              <span className="text-foreground">Traffic Management</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Reduce Congestion, Save Time, Fuel & Lives through intelligent traffic signal optimization
              and real-time emergency vehicle prioritization.
            </p>
            {getRoleBasedCTA()}
            {profile && (
              <p className="text-sm text-accent mt-4">
                Welcome back, {profile.full_name} ({profile.role.replace('_', ' ')})
              </p>
            )}
          </motion.div>
        </div>
      </section>

      {/* Live Stats Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Live City Impact</h2>
            <p className="text-muted-foreground">
              Real-time metrics from our AI traffic management system
            </p>
            <p className="text-sm text-accent mt-2">
              Last updated: {currentTime.toLocaleTimeString()}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 * index }}
              >
                <Card className="dashboard-card hover:border-accent/30 transition-all duration-300">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </CardTitle>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold mb-2">
                      <AnimatedCounter 
                        value={stat.value} 
                        suffix={stat.suffix}
                      />
                    </div>
                    <p className={`text-xs flex items-center ${
                      stat.change > 0 ? 'text-success' : 'text-traffic-red'
                    }`}>
                      <TrendingDown className="mr-1 h-3 w-3" />
                      {stat.change > 0 ? '+' : ''}{stat.change}% from yesterday
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* City Map Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="mr-2 h-5 w-5 text-accent" />
                  Live City Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative h-96 bg-gradient-to-br from-secondary/30 to-secondary/70 rounded-lg overflow-hidden border border-accent/20">
                  {/* Main Intersection */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {/* Horizontal Road */}
                    <div className="absolute w-full h-16 bg-muted/40 flex items-center justify-center">
                      <div className="w-full h-2 bg-muted/60"></div>
                    </div>
                    
                    {/* Vertical Road */}
                    <div className="absolute h-full w-16 bg-muted/40 flex items-center justify-center">
                      <div className="h-full w-2 bg-muted/60"></div>
                    </div>
                    
                    {/* Central Intersection */}
                    <div className="relative z-10 w-16 h-16 bg-card/90 border-4 border-accent/60 rounded-lg flex items-center justify-center backdrop-blur-sm shadow-lg">
                      <div className="w-6 h-6 rounded-full traffic-light-green shadow-lg shadow-green-500/50 animate-pulse" />
                    </div>
                    
                    {/* Intersection Label */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-12 z-20">
                      <span className="text-sm font-medium text-accent bg-card/80 px-2 py-1 rounded border border-accent/30">
                        Main Intersection
                      </span>
                    </div>
                  </div>

                  {/* Heatmap Points for Each Road Direction */}
                  {/* North Road - Incoming */}
                  <div className="absolute top-16 left-1/2 transform -translate-x-1/2">
                    <div className="flex flex-col items-center space-y-2">
                      <div className="w-3 h-3 rounded-full bg-traffic-green/80 shadow-lg shadow-green-500/30 animate-pulse" />
                      <div className="w-2 h-2 rounded-full bg-traffic-green/60" />
                      <span className="text-xs text-muted-foreground">N-In: 12</span>
                    </div>
                  </div>
                  
                  {/* North Road - Outgoing */}
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 translate-x-8">
                    <div className="flex flex-col items-center space-y-2">
                      <div className="w-3 h-3 rounded-full bg-traffic-amber/80 shadow-lg shadow-yellow-500/30 animate-pulse" />
                      <div className="w-2 h-2 rounded-full bg-traffic-amber/60" />
                      <span className="text-xs text-muted-foreground">N-Out: 8</span>
                    </div>
                  </div>

                  {/* South Road - Incoming */}
                  <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2">
                    <div className="flex flex-col items-center space-y-2">
                      <span className="text-xs text-muted-foreground">S-In: 15</span>
                      <div className="w-2 h-2 rounded-full bg-traffic-red/60" />
                      <div className="w-3 h-3 rounded-full bg-traffic-red/80 shadow-lg shadow-red-500/30 animate-pulse" />
                    </div>
                  </div>
                  
                  {/* South Road - Outgoing */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 translate-x-8">
                  {/* East Road - Incoming */}
                  <div className="absolute right-16 top-1/2 transform -translate-y-1/2">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-muted-foreground">E-In: 10</span>
                      <div className="w-2 h-2 rounded-full bg-traffic-amber/60" />
                      <div className="w-3 h-3 rounded-full bg-traffic-amber/80 shadow-lg shadow-yellow-500/30 animate-pulse" />
                    </div>
                  </div>
                  
                  {/* East Road - Outgoing */}
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 translate-y-8">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-muted-foreground">E-Out: 14</span>
                      <div className="w-2 h-2 rounded-full bg-traffic-red/60" />
                      <div className="w-3 h-3 rounded-full bg-traffic-red/80 shadow-lg shadow-red-500/30 animate-pulse" />
                    </div>
                  </div>
                    <div className="flex flex-col items-center space-y-2">
                  {/* West Road - Incoming */}
                  <div className="absolute left-16 top-1/2 transform -translate-y-1/2">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-traffic-green/80 shadow-lg shadow-green-500/30 animate-pulse" />
                      <div className="w-2 h-2 rounded-full bg-traffic-green/60" />
                      <span className="text-xs text-muted-foreground">W-In: 7</span>
                    </div>
                  </div>
                  
                  {/* West Road - Outgoing */}
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 translate-y-8">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-traffic-amber/80 shadow-lg shadow-yellow-500/30 animate-pulse" />
                      <div className="w-2 h-2 rounded-full bg-traffic-amber/60" />
                      <span className="text-xs text-muted-foreground">W-Out: 11</span>
                    </div>
                  </div>
                      <span className="text-xs text-muted-foreground">S-Out: 6</span>
                  {/* Emergency Vehicle Indicator */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-20">
                    <div className="bg-emergency/20 p-2 rounded-full animate-pulse border border-emergency/40">
                      <Ambulance className="h-6 w-6 text-emergency" />
                    </div>
                  </div>
                      <div className="w-2 h-2 rounded-full bg-traffic-green/60" />
                  {/* Legend */}
                  <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg p-3 border border-accent/20">
                    <div className="space-y-2">
                      <div className="text-xs font-medium text-foreground mb-2">Traffic Density</div>
                      <div className="flex items-center space-x-4 text-xs">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full traffic-light-green mr-2 shadow-sm" />
                          <span>Low (0-10)</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full traffic-light-amber mr-2 shadow-sm" />
                          <span>Medium (11-15)</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full traffic-light-red mr-2 shadow-sm" />
                          <span>High (16+)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                      <div className="w-3 h-3 rounded-full bg-traffic-green/80 shadow-lg shadow-green-500/30 animate-pulse" />
                  {/* Emergency Status */}
                  <div className="absolute top-4 right-4 bg-emergency/10 backdrop-blur-sm rounded-lg p-2 border border-emergency/30">
                    <div className="flex items-center text-sm text-emergency">
                      <Zap className="mr-2 h-4 w-4 animate-pulse" />
                      <span className="text-xs">Emergency Override</span>
                    </div>
                  </div>
                    </div>
                  {/* Live Data Indicator */}
                  <div className="absolute top-4 left-4 bg-accent/10 backdrop-blur-sm rounded-lg p-2 border border-accent/30">
                    <div className="flex items-center text-sm text-accent">
                      <div className="w-2 h-2 bg-accent rounded-full mr-2 animate-pulse" />
                      <span className="text-xs">Live Data</span>
                    </div>
                  </div>
                  </div>
                  {/* Road Direction Labels */}
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground font-medium">
                    North
                  </div>
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground font-medium">
                    South
                  </div>
                  <div className="absolute left-2 top-1/2 transform -translate-y-1/2 -rotate-90 text-xs text-muted-foreground font-medium">
                    West
                  </div>
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 rotate-90 text-xs text-muted-foreground font-medium">
                    East
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}