import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('authToken');
      const user = localStorage.getItem('user');
      
      if (!token || !user) {
        setIsAuthenticated(false);
        const protectedRoutes = ['/dashboard', '/dashboard/users', '/dashboard/articles', '/dashboard/products'];
        if (protectedRoutes.some(route => window.location.pathname.startsWith(route))) {
          navigate('/login');
        }
      } else {
        try {
          const tokenString = token.replace('Bearer ', '');
          const payload = tokenString.split('.')[1];
          if (payload) {
            const decoded = JSON.parse(atob(payload));
            if (decoded && decoded.userId) {
              setIsAuthenticated(true);
            } else {
              localStorage.removeItem('authToken');
              localStorage.removeItem('user');
              navigate('/login');
            }
          } else {
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
            navigate('/login');
          }
        } catch (error) {
          console.error('Token validation error:', error);
          localStorage.removeItem('authToken');
          localStorage.removeItem('user');
          navigate('/login');
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <Outlet />;
}