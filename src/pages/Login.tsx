
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate(user?.role === 'admin' ? '/admin' : '/dashboard');
    }
  }, [isAuthenticated, navigate, user]);

  const handleLoginSuccess = () => {
    // The redirection will be handled by the useEffect above
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center p-4 mt-16">
        <div className="w-full max-w-md">
          <div className="bg-white shadow-lg rounded-2xl p-8 border border-pergamino-darkTeal/10">
            <LoginForm onSuccess={handleLoginSuccess} />
            
            <div className="mt-8 text-center">
              <p className="text-pergamino-darkTeal/70">
                Don't have an account?{' '}
                <Link to="/register" className="text-pergamino-blue font-medium hover:underline">
                  Create one
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;
