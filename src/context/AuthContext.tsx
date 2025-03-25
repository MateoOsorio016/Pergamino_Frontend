
import React, { createContext, useContext, useState, useEffect } from 'react';

// Define the User type
export type UserRole = 'admin' | 'user';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  points: number;
  pointsSpent: number;
}

// Define the Auth context interface
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Create the Auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if there's a logged in user on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('pergaminoUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // This is a mock implementation - replace with actual API call
      // In a real app, this would call your backend authentication endpoint
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      // For demo purposes, we'll check against hardcoded credentials
      if (email === 'admin@pergamino.com' && password === 'admin123') {
        const adminUser = {
          id: '1',
          email,
          name: 'Admin User',
          role: 'admin' as UserRole,
          points: 0,
          pointsSpent: 0
        };
        setUser(adminUser);
        localStorage.setItem('pergaminoUser', JSON.stringify(adminUser));
      } else if (email === 'user@pergamino.com' && password === 'user123') {
        const regularUser = {
          id: '2',
          email,
          name: 'Regular User',
          role: 'user' as UserRole,
          points: 150,
          pointsSpent: 50
        };
        setUser(regularUser);
        localStorage.setItem('pergaminoUser', JSON.stringify(regularUser));
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // This is a mock implementation - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      const newUser = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name,
        role: 'user' as UserRole,
        points: 0,
        pointsSpent: 0
      };
      
      setUser(newUser);
      localStorage.setItem('pergaminoUser', JSON.stringify(newUser));
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('pergaminoUser');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      isLoading,
      login,
      register,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the Auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
