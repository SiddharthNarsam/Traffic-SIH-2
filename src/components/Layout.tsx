import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Home, 
  Monitor, 
  Settings, 
  BarChart3, 
  Map,
  Users,
  Globe,
  LogIn,
  LogOut
} from "lucide-react";

const getNavigation = (isAuthenticated: boolean) => {
  const publicNav = [
    { name: "Overview", href: "/", icon: Home },
    { name: "Public", href: "/public", icon: Globe },
  ];

  const protectedNav = [
    { name: "Overview", href: "/", icon: Home },
    { name: "Dashboard", href: "/dashboard", icon: Monitor },
    { name: "Control", href: "/control", icon: Settings },
    { name: "Analytics", href: "/analytics", icon: BarChart3 },
    { name: "Simulation", href: "/simulation", icon: Map },
    { name: "Admin", href: "/admin", icon: Users },
    { name: "Public", href: "/public", icon: Globe },
  ];

  return isAuthenticated ? protectedNav : publicNav;
};

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { user, signOut } = useAuth();
  const navigation = getNavigation(!!user);

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
              {user ? (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">
                    Welcome, {user.email}
                  </span>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => signOut()}
                    className="border-accent/30 text-accent hover:bg-accent/10"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <Link to="/auth">
                  <Button variant="outline" size="sm" className="border-accent/30 text-accent hover:bg-accent/10">
                    <LogIn className="mr-2 h-4 w-4" />
                    Sign In
                  </Button>
                </Link>
              )}
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