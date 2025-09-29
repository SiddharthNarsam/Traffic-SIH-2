import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";
import { Chrome as Home, Monitor, Settings, ChartBar as BarChart3, Map, Users, Globe, LogIn, LogOut, Shield, Truck, UserCheck } from "lucide-react";

interface NavItem {
  name: string;
  href: string;
  icon: any;
  roles: UserRole[];
}

const navigationItems: NavItem[] = [
  { name: "Overview", href: "/", icon: Home, roles: ['admin', 'traffic_officer', 'emergency', 'citizen'] },
  { name: "Dashboard", href: "/dashboard", icon: Monitor, roles: ['admin', 'traffic_officer', 'emergency'] },
  { name: "Control", href: "/control", icon: Settings, roles: ['admin', 'traffic_officer', 'emergency'] },
  { name: "Analytics", href: "/analytics", icon: BarChart3, roles: ['admin', 'traffic_officer', 'emergency', 'citizen'] },
  { name: "Simulation", href: "/simulation", icon: Map, roles: ['admin', 'traffic_officer', 'emergency', 'citizen'] },
  { name: "Admin", href: "/admin", icon: Users, roles: ['admin'] },
  { name: "Public", href: "/public", icon: Globe, roles: ['admin', 'traffic_officer', 'emergency', 'citizen'] },
];

const getRoleIcon = (role: UserRole) => {
  switch (role) {
    case 'admin':
      return <Shield className="h-4 w-4" />;
    case 'traffic_officer':
      return <UserCheck className="h-4 w-4" />;
    case 'emergency':
      return <Truck className="h-4 w-4" />;
    case 'citizen':
      return <Globe className="h-4 w-4" />;
    default:
      return <UserCheck className="h-4 w-4" />;
  }
};

const getRoleLabel = (role: UserRole) => {
  switch (role) {
    case 'admin':
      return 'Administrator';
    case 'traffic_officer':
      return 'Traffic Officer';
    case 'emergency':
      return 'Emergency Services';
    case 'citizen':
      return 'Citizen';
    default:
      return 'User';
  }
};

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { user, profile, signOut } = useAuth();

  // Filter navigation based on user role
  const getFilteredNavigation = () => {
    if (!profile) {
      return navigationItems.filter(item => item.href === '/' || item.href === '/public');
    }
    
    return navigationItems.filter(item => 
      item.roles.includes(profile.role)
    );
  };

  const navigation = getFilteredNavigation();

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
              {user && profile ? (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="border-accent/30 text-accent">
                      {getRoleIcon(profile.role)}
                      <span className="ml-1">{getRoleLabel(profile.role)}</span>
                    </Badge>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{profile.full_name}</div>
                    <div className="text-xs text-muted-foreground">{profile.email}</div>
                  </div>
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