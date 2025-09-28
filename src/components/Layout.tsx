import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  Monitor, 
  Settings, 
  BarChart3, 
  Map,
  Users,
  Globe
} from "lucide-react";

const navigation = [
  { name: "Overview", href: "/", icon: Home },
  { name: "Dashboard", href: "/dashboard", icon: Monitor },
  { name: "Control", href: "/control", icon: Settings },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Simulation", href: "/simulation", icon: Map },
  { name: "Admin", href: "/admin", icon: Users },
  { name: "Public", href: "/public", icon: Globe },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-dashboard">
      {/* Top Navigation */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-xl font-bold bg-gradient-accent bg-clip-text text-transparent">
                  SmartTraffic AI
                </h1>
              </div>
              <nav className="hidden md:ml-8 md:flex md:space-x-8">
                {navigation.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                        isActive
                          ? "bg-accent/20 text-accent border border-accent/30"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent/10"
                      }`}
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-muted-foreground">
                System Status: <span className="text-success">Online</span>
              </div>
              <Button variant="outline" size="sm" className="border-accent/30 text-accent hover:bg-accent/10">
                Emergency Mode
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}