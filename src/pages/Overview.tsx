import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Clock, 
  TrendingDown, 
  Ambulance, 
  Leaf,
  Play,
  Activity,
  MapPin,
  Zap,
  Monitor,
  Globe,
  Settings,
  BarChart3
} from "lucide-react";

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
                  {/* Street Grid Background */}
                  <div className="absolute inset-0">
                    {/* Horizontal streets */}
                    {[...Array(5)].map((_, i) => (
                      <div 
                        key={`h-${i}`}
                        className="absolute w-full h-1 bg-muted/40"
                        style={{ top: `${20 + i * 15}%` }}
                      />
                    ))}
                    {/* Vertical streets */}
                    {[...Array(5)].map((_, i) => (
                      <div 
                        key={`v-${i}`}
                        className="absolute h-full w-1 bg-muted/40"
                        style={{ left: `${20 + i * 15}%` }}
                      />
                    ))}
                  </div>

                  {/* Traffic Flow Animations */}
                  <div className="absolute inset-0">
                    {/* Moving vehicles simulation */}
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={`vehicle-${i}`}
                        className="absolute w-2 h-1 bg-accent/60 rounded animate-pulse"
                        style={{
                          left: `${10 + (i * 13)}%`,
                          top: `${25 + Math.sin(i) * 20}%`,
                          animationDelay: `${i * 0.5}s`
                        }}
                      />
                    ))}
                  </div>

                  {/* Traffic Intersections */}
                  <div className="absolute inset-0">
                    {[...Array(9)].map((_, i) => {
                      const row = Math.floor(i / 3);
                      const col = i % 3;
                      const x = 25 + col * 25;
                      const y = 25 + row * 25;
                      
                      return (
                        <div 
                          key={i} 
                          className="absolute transform -translate-x-1/2 -translate-y-1/2"
                          style={{ left: `${x}%`, top: `${y}%` }}
                        >
                          {/* Intersection background */}
                          <div className="w-8 h-8 bg-card/80 border-2 border-accent/40 rounded-lg flex items-center justify-center backdrop-blur-sm">
                            <div className={`w-3 h-3 rounded-full animate-pulse ${
                              i % 3 === 0 ? 'traffic-light-green shadow-lg shadow-green-500/50' : 
                              i % 3 === 1 ? 'traffic-light-amber shadow-lg shadow-yellow-500/50' : 
                              'traffic-light-red shadow-lg shadow-red-500/50'
                            }`} />
                          </div>
                          
                          {/* Intersection label */}
                          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                            <span className="text-xs text-muted-foreground bg-card/60 px-1 rounded">
                              I{i + 1}
                            </span>
                          </div>
                          
                          {/* Emergency vehicle at center intersection */}
                          {i === 4 && (
                            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
                              <div className="bg-emergency/20 p-1 rounded-full animate-pulse">
                                <Ambulance className="h-5 w-5 text-emergency" />
                              </div>
                            </div>
                          )}
                          
                          {/* Traffic density indicators */}
                          <div className="absolute -right-2 -top-2">
                            <div className={`w-2 h-2 rounded-full ${
                              i % 4 === 0 ? 'bg-traffic-red/70' :
                              i % 4 === 1 ? 'bg-traffic-amber/70' :
                              'bg-traffic-green/70'
                            }`} />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Traffic Flow Heatmap Overlay */}
                  <div className="absolute inset-0 bg-gradient-radial from-accent/10 via-transparent to-transparent opacity-50" />

                  {/* Legend */}
                  <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg p-3 border border-accent/20">
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full traffic-light-green mr-2 shadow-sm" />
                        <span className="text-xs">Free Flow</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full traffic-light-amber mr-2 shadow-sm" />
                        <span className="text-xs">Moderate</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full traffic-light-red mr-2 shadow-sm" />
                        <span className="text-xs">Congested</span>
                      </div>
                    </div>
                  </div>

                  {/* Emergency Status */}
                  <div className="absolute top-4 right-4 bg-emergency/10 backdrop-blur-sm rounded-lg p-2 border border-emergency/30">
                    <div className="flex items-center text-sm text-emergency">
                      <Zap className="mr-2 h-4 w-4 animate-pulse" />
                      <span className="text-xs">Emergency Override</span>
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
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}