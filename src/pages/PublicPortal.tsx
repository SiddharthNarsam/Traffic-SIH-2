import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Clock, 
  Route,
  Leaf,
  AlertTriangle,
  CheckCircle,
  Navigation,
  Info,
  Calendar
} from "lucide-react";

// Mock data for public information
const cityStats = {
  totalSaved: 15247,
  timeSaved: 2.3,
  fuelSaved: 1247,
  co2Reduced: 892
};

const routeSuggestions = [
  { 
    from: 'Downtown', 
    to: 'Airport', 
    normalTime: 35, 
    aiTime: 22, 
    savings: 13,
    route: 'via Main St → Highway 101'
  },
  { 
    from: 'University', 
    to: 'Mall District', 
    normalTime: 18, 
    aiTime: 12, 
    savings: 6,
    route: 'via Oak St → Pine Ave'
  },
  { 
    from: 'Residential Area', 
    to: 'Business District', 
    normalTime: 25, 
    aiTime: 16, 
    savings: 9,
    route: 'via Elm St → 2nd Avenue'
  }
];

const announcements = [
  {
    id: 1,
    type: 'roadwork',
    title: 'Lane Closure on Main Street',
    description: 'Construction work from 9 AM to 4 PM. Use alternative routes.',
    date: '2024-01-15',
    status: 'active'
  },
  {
    id: 2,
    type: 'event',
    title: 'Stadium Event Traffic',
    description: 'Expect heavy traffic near Stadium District from 6-9 PM.',
    date: '2024-01-16',
    status: 'upcoming'
  },
  {
    id: 3,
    type: 'improvement',
    title: 'New AI Traffic Optimization',
    description: 'Enhanced signal timing now active on Oak Street corridor.',
    date: '2024-01-14',
    status: 'completed'
  }
];

export default function PublicPortal() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-dashboard">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/20 to-accent/10 py-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(120,119,198,0.3),transparent_50%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-accent bg-clip-text text-transparent">
                Smart City
              </span>
              <br />
              <span className="text-foreground">Traffic Portal</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Real-time traffic information, optimized routes, and city updates
              powered by AI for a smarter commute.
            </p>
            <p className="text-sm text-accent">
              Last updated: {currentTime.toLocaleString()}
            </p>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* City Impact Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle className="text-center flex items-center justify-center">
                <Leaf className="mr-2 h-6 w-6 text-success" />
                Today's City Impact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-accent/10 rounded-lg">
                  <h3 className="text-3xl font-bold text-accent">{cityStats.totalSaved.toLocaleString()}</h3>
                  <p className="text-sm text-muted-foreground">Citizens Helped Today</p>
                </div>
                <div className="text-center p-4 bg-success/10 rounded-lg">
                  <h3 className="text-3xl font-bold text-success">{cityStats.timeSaved}h</h3>
                  <p className="text-sm text-muted-foreground">Average Time Saved</p>
                </div>
                <div className="text-center p-4 bg-warning/10 rounded-lg">
                  <h3 className="text-3xl font-bold text-warning">{cityStats.fuelSaved}L</h3>
                  <p className="text-sm text-muted-foreground">Fuel Saved</p>
                </div>
                <div className="text-center p-4 bg-success/10 rounded-lg">
                  <h3 className="text-3xl font-bold text-success">{cityStats.co2Reduced}kg</h3>
                  <p className="text-sm text-muted-foreground">CO₂ Reduced</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Live Traffic Map */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="mr-2 h-5 w-5 text-accent" />
                  Live Traffic Conditions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative h-80 bg-secondary/30 rounded-lg overflow-hidden">
                  {/* Simulated public map */}
                  <div className="traffic-heatmap opacity-50" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="grid grid-cols-3 gap-6">
                      {[...Array(9)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="relative"
                          animate={{
                            opacity: [0.5, 1, 0.5],
                            scale: [1, 1.1, 1]
                          }}
                          transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                        >
                          <div className="w-4 h-4 rounded-full bg-card border border-accent flex items-center justify-center">
                            <div className={`w-2 h-2 rounded-full ${
                              i % 3 === 0 ? 'traffic-light-green' : 
                              i % 3 === 1 ? 'traffic-light-amber' : 'traffic-light-red'
                            }`} />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg p-3">
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full traffic-light-green mr-2" />
                        Light Traffic
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full traffic-light-amber mr-2" />
                        Moderate
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full traffic-light-red mr-2" />
                        Heavy
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* AI Route Suggestions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Route className="mr-2 h-5 w-5 text-accent" />
                  AI-Optimized Routes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {routeSuggestions.map((route, index) => (
                    <div key={index} className="p-4 bg-secondary/30 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <Navigation className="h-4 w-4 text-accent mr-2" />
                          <span className="font-medium text-sm">{route.from} → {route.to}</span>
                        </div>
                        <Badge variant="default" className="bg-success">
                          -{route.savings} min
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">{route.route}</p>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            <span className="line-through text-muted-foreground">{route.normalTime}m</span>
                          </div>
                          <div className="flex items-center text-success">
                            <Clock className="h-3 w-3 mr-1" />
                            <span className="font-bold">{route.aiTime}m</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* City Announcements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Info className="mr-2 h-5 w-5 text-accent" />
                City Traffic Updates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {announcements.map((announcement) => (
                  <div key={announcement.id} className="p-4 bg-secondary/30 rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center">
                        {announcement.type === 'roadwork' && <AlertTriangle className="h-4 w-4 text-warning mr-2" />}
                        {announcement.type === 'event' && <Calendar className="h-4 w-4 text-accent mr-2" />}
                        {announcement.type === 'improvement' && <CheckCircle className="h-4 w-4 text-success mr-2" />}
                      </div>
                      <Badge variant={
                        announcement.status === 'active' ? 'destructive' :
                        announcement.status === 'upcoming' ? 'secondary' : 'default'
                      }>
                        {announcement.status}
                      </Badge>
                    </div>
                    <h4 className="font-medium mb-2">{announcement.title}</h4>
                    <p className="text-sm text-muted-foreground mb-3">{announcement.description}</p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3 mr-1" />
                      {announcement.date}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Eco Badge Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 text-center"
        >
          <Card className="dashboard-card">
            <CardContent className="p-8">
              <div className="flex items-center justify-center mb-4">
                <Leaf className="h-12 w-12 text-success mr-4" />
                <div>
                  <h2 className="text-2xl font-bold text-success">Eco-Friendly City Badge</h2>
                  <p className="text-muted-foreground">Our AI traffic system is making a difference</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div className="p-4 bg-success/10 rounded-lg">
                  <h3 className="text-lg font-bold text-success">35%</h3>
                  <p className="text-sm text-muted-foreground">Emission Reduction</p>
                </div>
                <div className="p-4 bg-success/10 rounded-lg">
                  <h3 className="text-lg font-bold text-success">28%</h3>
                  <p className="text-sm text-muted-foreground">Fuel Efficiency</p>
                </div>
                <div className="p-4 bg-success/10 rounded-lg">
                  <h3 className="text-lg font-bold text-success">2.1M</h3>
                  <p className="text-sm text-muted-foreground">Trees Equivalent</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}