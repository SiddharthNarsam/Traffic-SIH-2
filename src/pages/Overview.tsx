import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Clock, 
  TrendingDown, 
  Ambulance, 
  Leaf,
  Play,
  Activity,
  MapPin,
  Zap
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
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard">
                <Button size="lg" className="cyber-button group">
                  <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Launch Dashboard
                </Button>
              </Link>
              <Link to="/simulation">
                <Button variant="outline" size="lg" className="border-accent/30 text-accent hover:bg-accent/10">
                  <Activity className="mr-2 h-5 w-5" />
                  View Simulation
                </Button>
              </Link>
            </div>
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
                <div className="relative h-96 bg-secondary/50 rounded-lg overflow-hidden">
                  {/* Simulated map with traffic indicators */}
                  <div className="traffic-heatmap" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="grid grid-cols-3 gap-8">
                      {[...Array(9)].map((_, i) => (
                        <div key={i} className="relative">
                          <div className="w-6 h-6 rounded-full bg-card border-2 border-accent flex items-center justify-center">
                            <div className={`w-2 h-2 rounded-full ${
                              i % 3 === 0 ? 'traffic-light-green' : 
                              i % 3 === 1 ? 'traffic-light-amber' : 'traffic-light-red'
                            }`} />
                          </div>
                          {i === 4 && (
                            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                              <Ambulance className="h-4 w-4 text-emergency animate-pulse" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 bg-card/80 backdrop-blur-sm rounded-lg p-3">
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full traffic-light-green mr-2" />
                        Low Traffic
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full traffic-light-amber mr-2" />
                        Moderate
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full traffic-light-red mr-2" />
                        Congested
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 bg-card/80 backdrop-blur-sm rounded-lg p-2">
                    <div className="flex items-center text-sm text-emergency">
                      <Zap className="mr-2 h-4 w-4" />
                      Emergency Active
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