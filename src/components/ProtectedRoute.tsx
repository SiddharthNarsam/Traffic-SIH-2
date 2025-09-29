import { useAuth, UserRole } from '@/contexts/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
  requireAuth?: boolean;
}

export function ProtectedRoute({ 
  children, 
  allowedRoles = [], 
  requireAuth = true 
}: ProtectedRouteProps) {
  const { user, profile, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-dashboard flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // If authentication is required but user is not logged in
  if (requireAuth && !user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // If specific roles are required
  if (allowedRoles.length > 0 && profile) {
    const hasRequiredRole = allowedRoles.includes(profile.role);
    
    if (!hasRequiredRole) {
      // Redirect based on user role
      const redirectPath = getRoleBasedRedirect(profile.role);
      return <Navigate to={redirectPath} replace />;
    }
  }

  return <>{children}</>;
}

function getRoleBasedRedirect(role: UserRole): string {
  switch (role) {
    case 'admin':
      return '/dashboard';
    case 'traffic_officer':
      return '/dashboard';
    case 'emergency':
      return '/dashboard';
    case 'citizen':
      return '/public';
    default:
      return '/';
  }
}