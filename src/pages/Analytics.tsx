import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { 
  TrendingUp, 
  Clock, 
  Car, 
  Leaf,
  Download,
  Calendar,
  BarChart3
} from "lucide-react";

// Mock data for charts
const waitingTimeData = [
  { intersection: 'Main St', beforeAI: 85, withAI: 45 },
  { intersection: 'Oak St', beforeAI: 92, withAI: 52 },
  { intersection: 'Pine St', beforeAI: 78, withAI: 38 },
  { intersection: 'Elm St', beforeAI: 65, withAI: 35 },
];

const throughputData = [
  { time: '06:00', vehicles: 120 },
  { time: '08:00', vehicles: 380 },
  { time: '10:00', vehicles: 240 },
  { time: '12:00', vehicles: 290 },
  { time: '14:00', vehicles: 310 },
  { time: '16:00', vehicles: 420 },
  { time: '18:00', vehicles: 450 },
  { time: '20:00', vehicles: 180 },
];

const congestionTrends = [
  { day: 'Mon', traditional: 65, ai: 35 },
  { day: 'Tue', traditional: 70, ai: 38 },
  { day: 'Wed', traditional: 68, ai: 32 },
  { day: 'Thu', traditional: 72, ai: 40 },
  { day: 'Fri', traditional: 85, ai: 45 },
  { day: 'Sat', traditional: 45, ai: 25 },
  { day: 'Sun', traditional: 35, ai: 20 },
];

const emissionsData = [
  { name: 'CO₂ Reduced', value: 1247, color: '#22c55e' },
  { name: 'Fuel Saved (L)', value: 523, color: '#06b6d4' },
  { name: 'Time Saved (hrs)', value: 892, color: '#f59e0b' },
];

const COLORS = ['#22c55e', '#06b6d4', '#f59e0b'];

export default function Analytics() {
  return (
    <div className="min-h-screen bg-gradient-dashboard p-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Analytics & Reports</h1>
            <p className="text-muted-foreground">Traffic performance metrics and AI impact analysis</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" className="border-accent/30">
              <Calendar className="mr-2 h-4 w-4" />
              Last 7 Days
            </Button>
            <Button className="cyber-button">
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="dashboard-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Wait Time</p>
                  <p className="text-2xl font-bold">42s</p>
                  <p className="text-xs text-success flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    -48% vs traditional
                  </p>
                </div>
                <Clock className="h-8 w-8 text-accent" />
              </div>
            </CardContent>
          </Card>

          <Card className="dashboard-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Daily Throughput</p>
                  <p className="text-2xl font-bold">28.4K</p>
                  <p className="text-xs text-success flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +23% improvement
                  </p>
                </div>
                <Car className="h-8 w-8 text-accent" />
              </div>
            </CardContent>
          </Card>

          <Card className="dashboard-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">CO₂ Saved</p>
                  <p className="text-2xl font-bold">1.2T</p>
                  <p className="text-xs text-success flex items-center mt-1">
                    <Leaf className="h-3 w-3 mr-1" />
                    This week
                  </p>
                </div>
                <Leaf className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>

          <Card className="dashboard-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">AI Accuracy</p>
                  <p className="text-2xl font-bold">94.2%</p>
                  <p className="text-xs text-accent flex items-center mt-1">
                    <BarChart3 className="h-3 w-3 mr-1" />
                    Prediction rate
                  </p>
                </div>
                <BarChart3 className="h-8 w-8 text-accent" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Before AI vs With AI Comparison */}
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle>AI vs Traditional - Average Wait Time</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={waitingTimeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="intersection" 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="beforeAI" fill="#ef4444" name="Before AI" />
                  <Bar dataKey="withAI" fill="#22c55e" name="With AI" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Vehicle Throughput */}
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle>Daily Vehicle Throughput</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={throughputData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="time" 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="vehicles" 
                    stroke="#06b6d4" 
                    strokeWidth={3}
                    dot={{ fill: '#06b6d4', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Weekly Congestion Trends */}
          <Card className="dashboard-card lg:col-span-2">
            <CardHeader>
              <CardTitle>Weekly Congestion Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={congestionTrends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="day" 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="traditional" fill="#ef4444" name="Traditional" />
                  <Bar dataKey="ai" fill="#22c55e" name="AI-Optimized" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Sustainability Metrics */}
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle>Environmental Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={emissionsData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {emissionsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              
              <div className="mt-6 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Citizens' Time Saved</span>
                  <Badge variant="default">892 hours</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Fuel Efficiency</span>
                  <Badge variant="default" className="bg-success">+34%</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Carbon Footprint</span>
                  <Badge variant="default" className="bg-success">-28%</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Citizen Impact Report */}
        <Card className="dashboard-card mt-6">
          <CardHeader>
            <CardTitle>Citizen Impact Report</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-accent/10 rounded-lg">
                <h3 className="text-2xl font-bold text-accent">15,247</h3>
                <p className="text-sm text-muted-foreground">Commuters benefited today</p>
              </div>
              <div className="text-center p-6 bg-success/10 rounded-lg">
                <h3 className="text-2xl font-bold text-success">2.3 hrs</h3>
                <p className="text-sm text-muted-foreground">Average time saved per person</p>
              </div>
              <div className="text-center p-6 bg-warning/10 rounded-lg">
                <h3 className="text-2xl font-bold text-warning">$48K</h3>
                <p className="text-sm text-muted-foreground">Economic value generated</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}