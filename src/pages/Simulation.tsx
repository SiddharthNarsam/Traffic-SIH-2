import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { 
  Play, 
  Pause, 
  RotateCcw,
  Map,
  Brain,
  Clock,
  Car,
  Construction,
  AlertTriangle,
  TrendingUp,
  Zap
} from "lucide-react";

const scenarios = [
  { 
    id: 'roadwork', 
    name: 'Lane Closure (Roadwork)', 
    icon: Construction,
    impact: 'High traffic diversion expected',
    color: 'border-warning'
  },
  { 
    id: 'accident', 
    name: 'Traffic Accident', 
    icon: AlertTriangle,
    impact: 'Immediate congestion buildup',
    color: 'border-destructive'
  },
  { 
    id: 'spike', 
    name: 'Sudden Traffic Spike', 
    icon: TrendingUp,
    impact: 'Rush hour intensity increase',
    color: 'border-accent'
  },
];

export default function Simulation() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState('roadwork');
  const [timeSpeed, setTimeSpeed] = useState([1]);
  const [predictionTime, setPredictionTime] = useState([15]);

  return (
    <div className="min-h-screen bg-gradient-dashboard p-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Traffic Simulation & Prediction</h1>
            <p className="text-muted-foreground">Interactive traffic flow modeling and what-if analysis</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant={isPlaying ? "destructive" : "default"}
              onClick={() => setIsPlaying(!isPlaying)}
              className="cyber-button"
            >
              {isPlaying ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
              {isPlaying ? 'Pause' : 'Start'} Simulation
            </Button>
            <Button variant="outline" className="border-accent/30">
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Interactive Map Simulation */}
          <Card className="dashboard-card lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Map className="mr-2 h-5 w-5 text-accent" />
                Interactive Traffic Simulation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative h-96 bg-secondary/30 rounded-lg overflow-hidden">
                {/* Simulated interactive map */}
                <div className="absolute inset-0">
                  <div className="traffic-heatmap opacity-60" />
                  
                  {/* Grid of intersections */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="grid grid-cols-4 gap-8">
                      {[...Array(16)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="relative cursor-pointer"
                          whileHover={{ scale: 1.2 }}
                          animate={isPlaying ? {
                            opacity: [0.5, 1, 0.5],
                            scale: [1, 1.1, 1]
                          } : {}}
                          transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                        >
                          <div className="w-6 h-6 rounded-full bg-card border-2 border-accent flex items-center justify-center shadow-lg">
                            <div className={`w-3 h-3 rounded-full ${
                              i % 4 === 0 ? 'traffic-light-green' : 
                              i % 4 === 1 ? 'traffic-light-amber' : 
                              i % 4 === 2 ? 'traffic-light-red' : 'bg-accent'
                            }`} />
                          </div>
                          
                          {/* Vehicle count indicator */}
                          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-center">
                            <div className="bg-card/80 backdrop-blur-sm rounded px-1 py-0.5">
                              {Math.floor(Math.random() * 20) + 5}
                            </div>
                          </div>
                          
                          {/* Special scenario indicators */}
                          {selectedScenario === 'roadwork' && i === 5 && (
                            <Construction className="absolute -top-8 left-1/2 transform -translate-x-1/2 h-4 w-4 text-warning animate-pulse" />
                          )}
                          {selectedScenario === 'accident' && i === 9 && (
                            <AlertTriangle className="absolute -top-8 left-1/2 transform -translate-x-1/2 h-4 w-4 text-destructive animate-pulse" />
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Control Panel Overlay */}
                <div className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg p-3 space-y-2">
                  <div className="text-sm font-medium">Simulation Speed</div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <Slider
                      value={timeSpeed}
                      onValueChange={setTimeSpeed}
                      max={5}
                      min={0.5}
                      step={0.5}
                      className="w-20"
                    />
                    <span className="text-xs">{timeSpeed[0]}x</span>
                  </div>
                </div>

                {/* Status indicator */}
                <div className="absolute bottom-4 right-4 bg-card/90 backdrop-blur-sm rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${isPlaying ? 'bg-success animate-pulse' : 'bg-muted'}`} />
                    <span className="text-sm">{isPlaying ? 'Running' : 'Paused'}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Prediction Controls */}
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="mr-2 h-5 w-5 text-accent" />
                Congestion Prediction
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Prediction Time</label>
                  <div className="flex items-center space-x-2">
                    <Slider
                      value={predictionTime}
                      onValueChange={setPredictionTime}
                      max={60}
                      min={5}
                      step={5}
                      className="flex-1"
                    />
                    <span className="text-sm w-12">{predictionTime[0]}min</span>
                  </div>
                </div>

                <div className="p-3 bg-accent/10 border border-accent/30 rounded-lg">
                  <h4 className="font-medium text-sm mb-2">Prediction Results</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Congestion Level:</span>
                      <Badge variant="outline" className="border-warning text-warning">Moderate</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Peak at:</span>
                      <span className="font-mono">15:45</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Affected Intersections:</span>
                      <span>3 of 12</span>
                    </div>
                  </div>
                </div>

                <Button className="w-full cyber-button">
                  <Zap className="mr-2 h-4 w-4" />
                  Run AI Prediction
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* What-if Scenarios */}
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle>What-if Scenarios</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {scenarios.map((scenario) => (
                  <motion.div
                    key={scenario.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedScenario === scenario.id 
                        ? `${scenario.color} bg-accent/10` 
                        : 'border-border bg-secondary/30 hover:bg-secondary/50'
                    }`}
                    onClick={() => setSelectedScenario(scenario.id)}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-start space-x-3">
                      <scenario.icon className="h-5 w-5 text-accent mt-0.5" />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{scenario.name}</h4>
                        <p className="text-xs text-muted-foreground mt-1">{scenario.impact}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-4 p-3 bg-secondary/30 rounded-lg">
                <h4 className="text-sm font-medium mb-2">Current Scenario Impact</h4>
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span>Avg Delay:</span>
                    <span className="text-warning">+4.2 min</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Congestion:</span>
                    <span className="text-destructive">+35%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Reroute:</span>
                    <span className="text-accent">2,340 vehicles</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* RL Training Visualization */}
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="mr-2 h-5 w-5 text-accent" />
                AI Learning Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Training Progress</span>
                    <span>87%</span>
                  </div>
                  <div className="w-full bg-secondary/30 rounded-full h-2">
                    <motion.div 
                      className="bg-gradient-accent h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: '87%' }}
                      transition={{ duration: 2, ease: "easeOut" }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-muted-foreground">Episodes:</span>
                    <p className="font-mono font-bold">12,847</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Accuracy:</span>
                    <p className="font-mono font-bold">94.2%</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Reward:</span>
                    <p className="font-mono font-bold text-success">+0.89</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Loss:</span>
                    <p className="font-mono font-bold text-accent">0.043</p>
                  </div>
                </div>

                <div className="p-3 bg-success/10 border border-success/30 rounded-lg">
                  <div className="flex items-center">
                    <TrendingUp className="h-4 w-4 text-success mr-2" />
                    <span className="text-sm font-medium">Learning Active</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    AI is continuously improving from real traffic data
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Simulation Results */}
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle>Simulation Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-success/10 rounded-lg">
                    <Car className="h-6 w-6 text-success mx-auto mb-1" />
                    <p className="text-lg font-bold">2,847</p>
                    <p className="text-xs text-muted-foreground">Vehicles Processed</p>
                  </div>
                  <div className="text-center p-3 bg-accent/10 rounded-lg">
                    <Clock className="h-6 w-6 text-accent mx-auto mb-1" />
                    <p className="text-lg font-bold">38s</p>
                    <p className="text-xs text-muted-foreground">Avg Wait Time</p>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Efficiency Gain:</span>
                    <span className="text-success">+42%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Energy Saved:</span>
                    <span className="text-success">234 kWh</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Emissions Reduced:</span>
                    <span className="text-success">89 kg CO₂</span>
                  </div>
                </div>

                <Button variant="outline" className="w-full border-accent/30">
                  Export Simulation Data
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}