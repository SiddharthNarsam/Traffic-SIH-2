import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTrafficSystem } from "@/hooks/useTrafficSystem";
import { DecisionLog } from "@/components/DecisionLog";
import { SystemHealth } from "@/components/SystemHealth";
import { 
  Settings, 
  Power, 
  AlertTriangle,
  Clock,
  Brain,
  Lightbulb,
  Play,
  Users,
  Truck,
  PartyPopper,
  CheckCircle,
  Activity
} from "lucide-react";

const presetModes = [
  { 
    id: 'peak', 
    name: 'Peak Hour Mode', 
    description: 'Optimize for rush hour traffic flow',
    icon: Clock,
    active: false 
  },
  { 
    id: 'emergency', 
    name: 'Emergency Mode', 
    description: 'Prioritize emergency vehicles',
    icon: AlertTriangle,
    active: true 
  },
  { 
    id: 'event', 
    name: 'Event Mode', 
    description: 'Handle stadium/festival traffic',
    icon: PartyPopper,
    active: false 
  },
];

export default function Control() {
  const { intersections, decisions, systemMode, setSystemMode, manualOverride, applyAIDecision } = useTrafficSystem();
  const [selectedIntersection, setSelectedIntersection] = useState(1);
  const [selectedMode, setSelectedMode] = useState('emergency');

  return (
    <div className="min-h-screen bg-gradient-dashboard p-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Traffic Control Panel</h1>
            <p className="text-muted-foreground">Manual override and AI suggestion management</p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant={systemMode.current === 'manual' ? "destructive" : "default"}>
              {systemMode.current === 'manual' ? "Manual Override Active" : "AI Control Active"}
            </Badge>
            <Button
              variant={systemMode.current === 'manual' ? "destructive" : "outline"}
              onClick={() => setSystemMode(prev => ({ 
                ...prev, 
                current: prev.current === 'manual' ? 'auto' : 'manual' 
              }))}
            >
              <Power className="mr-2 h-4 w-4" />
              {systemMode.current === 'manual' ? "Disable Override" : "Enable Override"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Manual Override Controls */}
          <Card className="dashboard-card lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="mr-2 h-5 w-5 text-accent" />
                Manual Signal Control
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Intersection Selector */}
                <div>
                  <label className="text-sm font-medium mb-3 block">Select Intersection</label>
                  <div className="grid grid-cols-2 gap-3">
                    {intersections.map((intersection) => (
                      <Button
                        key={intersection.id}
                        variant={selectedIntersection === intersection.id ? "default" : "outline"}
                        onClick={() => setSelectedIntersection(intersection.id)}
                        className={selectedIntersection === intersection.id ? "bg-accent text-accent-foreground" : ""}
                      >
                        {intersection.name}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Signal Controls */}
                <div>
                  <label className="text-sm font-medium mb-3 block">Signal Control</label>
                  <div className="flex space-x-3">
                    <Button 
                      variant="outline" 
                      className="flex-1 border-traffic-red text-traffic-red hover:bg-traffic-red hover:text-white"
                      disabled={systemMode.current !== 'manual'}
                      onClick={() => manualOverride(selectedIntersection, 'red')}
                    >
                      Force Red
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1 border-traffic-amber text-traffic-amber hover:bg-traffic-amber hover:text-white"
                      disabled={systemMode.current !== 'manual'}
                      onClick={() => manualOverride(selectedIntersection, 'amber')}
                    >
                      Force Amber
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1 border-traffic-green text-traffic-green hover:bg-traffic-green hover:text-white"
                      disabled={systemMode.current !== 'manual'}
                      onClick={() => manualOverride(selectedIntersection, 'green')}
                    >
                      Force Green
                    </Button>
                  </div>
                </div>

                {/* Current Status */}
                <div className="p-4 bg-secondary/30 rounded-lg">
                  <h4 className="font-medium mb-2">Current Status</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Current Signal:</span>
                      <div className="flex items-center mt-1">
                        <div className={`w-3 h-3 rounded-full mr-2 ${
                          intersections.find(i => i.id === selectedIntersection)?.currentSignal === 'green' ? 'traffic-light-green' :
                          intersections.find(i => i.id === selectedIntersection)?.currentSignal === 'amber' ? 'traffic-light-amber' :
                          'traffic-light-red'
                        }`} />
                        <span className="capitalize">
                          {intersections.find(i => i.id === selectedIntersection)?.currentSignal}
                        </span>
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Time Remaining:</span>
                      <p className="font-mono font-bold">
                        00:{String(intersections.find(i => i.id === selectedIntersection)?.timer || 0).padStart(2, '0')}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-border">
                    <span className="text-muted-foreground text-xs">Last AI Decision:</span>
                    <p className="text-sm font-medium">
                      {intersections.find(i => i.id === selectedIntersection)?.lastDecision}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {intersections.find(i => i.id === selectedIntersection)?.decisionReason}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Suggestions */}
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="mr-2 h-5 w-5 text-accent" />
                AI Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {intersections.map((intersection) => (
                  <motion.div
                    key={intersection.id}
                    className={`p-3 rounded-lg border ${
                      selectedIntersection === intersection.id 
                        ? 'border-accent bg-accent/10' 
                        : 'border-border bg-secondary/30'
                    }`}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium">{intersection.name}</p>
                      <Badge variant="outline" className="text-xs">
                        {intersection.confidence}% confidence
                      </Badge>
                    </div>
                    <div className="flex items-center">
                      <Lightbulb className="h-4 w-4 text-accent mr-2" />
                      <span className="text-sm capitalize text-muted-foreground">
                        {intersection.aiSuggestion.replace('_', ' ')}
                      </span>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="w-full mt-2"
                      onClick={() => applyAIDecision(intersection.id)}
                      disabled={systemMode.current === 'manual'}
                    >
                      Apply Suggestion
                    </Button>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Preset Modes */}
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle>Preset Traffic Modes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {presetModes.map((mode) => (
                  <motion.div
                    key={mode.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedMode === mode.id 
                        ? 'border-accent bg-accent/10' 
                        : 'border-border bg-secondary/30 hover:bg-secondary/50'
                    }`}
                    onClick={() => setSelectedMode(mode.id)}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <mode.icon className="h-5 w-5 text-accent mr-2" />
                          <h4 className="font-medium">{mode.name}</h4>
                        </div>
                        <p className="text-sm text-muted-foreground">{mode.description}</p>
                      </div>
                      {mode.active && (
                        <Badge variant="default" className="ml-2">Active</Badge>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Scenario Simulation */}
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Play className="mr-2 h-5 w-5 text-accent" />
                Scenario Simulation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Simulate Scenario</label>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Truck className="mr-2 h-4 w-4" />
                      Lane Closure (Roadwork)
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <AlertTriangle className="mr-2 h-4 w-4" />
                      Accident Detected
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Users className="mr-2 h-4 w-4" />
                      Traffic Spike
                    </Button>
                  </div>
                </div>
                
                <div className="p-3 bg-accent/10 border border-accent/30 rounded-lg">
                  <h4 className="text-sm font-medium mb-2">Simulation Results</h4>
                  <div className="text-sm text-muted-foreground">
                    <p>• Average delay: +2.3 minutes</p>
                    <p>• Congestion increase: 15%</p>
                    <p>• Recommended action: Extend green</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* System Health */}
          <SystemHealth />

          {/* AI Decision Log */}
          <DecisionLog decisions={decisions.slice(0, 10)} />
        </div>
      </div>
    </div>
  );
}