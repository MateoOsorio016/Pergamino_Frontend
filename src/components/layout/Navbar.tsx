
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '@/components/ui/button';
import { Coffee, LogOut, User } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user: currentUser, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="w-full bg-white/80 backdrop-blur-md shadow-sm fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-pergamino-darkTeal transition-transform hover:scale-105"
          >
            <div className="w-10 h-10 rounded-full bg-pergamino-darkTeal flex items-center justify-center text-white">
              <Coffee className="w-6 h-6" />
            </div>
            <span className="text-2xl font-bold font-sumana">Pergamino</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {isAuthenticated ? (
              <>
                <Link 
                  to={currentUser?.role === 'admin' ? '/admin' : '/dashboard'} 
                  className="text-pergamino-darkTeal hover:text-pergamino-blue transition-colors font-medium"
                >
                  Dashboard
                </Link>
                {currentUser?.role === 'admin' && (
                  <Link 
                    to="/admin/users" 
                    className="text-pergamino-darkTeal hover:text-pergamino-blue transition-colors font-medium"
                  >
                    Users
                  </Link>
                )}
                {currentUser?.role === 'admin' && (
                  <Link 
                    to="/admin/admins" 
                    className="text-pergamino-darkTeal hover:text-pergamino-blue transition-colors font-medium"
                  >
                    Admins
                  </Link>
                )}
                {currentUser?.role === 'user' && (
                  <Link 
                    to="/profile" 
                    className="text-pergamino-darkTeal hover:text-pergamino-blue transition-colors font-medium"
                  >
                    Profile
                  </Link>
                )}
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="text-pergamino-darkTeal hover:text-pergamino-blue transition-colors font-medium"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="text-pergamino-darkTeal hover:text-pergamino-blue transition-colors font-medium"
                >
                  Register
                </Link>
              </>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="hidden md:flex items-center space-x-2 text-pergamino-darkTeal">
                  <User className="w-5 h-5" />
                  <span className="font-medium">{currentUser?.name}</span>
                </div>
                <Button 
                  variant="ghost" 
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-pergamino-darkTeal hover:text-pergamino-orange hover:bg-pergamino-cream"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="hidden md:inline">Logout</span>
                </Button>
              </div>
            ) : (
              <Button 
                onClick={() => navigate('/login')}
                className="bg-pergamino-darkTeal hover:bg-pergamino-teal text-white"
              >
                Login
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
