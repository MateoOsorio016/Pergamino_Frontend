
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '../../context/AuthContext';
import { coffee } from 'lucide-react';

interface LoginFormProps {
  onSuccess: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      await login(email, password);
      toast({
        title: "Success",
        description: "You have successfully logged in",
      });
      onSuccess();
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid email or password",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex flex-col items-center mb-8">
        <div className="w-16 h-16 rounded-full bg-pergamino-darkTeal flex items-center justify-center text-white mb-4">
          <coffee className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-bold text-pergamino-darkTeal font-sumana">Welcome Back</h1>
        <p className="text-pergamino-darkTeal/70 mt-2">Sign in to your Pergamino account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 animate-slide-up">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-pergamino-darkTeal">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="border-pergamino-teal/30 focus:ring-pergamino-teal focus:border-pergamino-teal"
            disabled={isLoading}
            required
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="password" className="text-pergamino-darkTeal">Password</Label>
            <a href="#" className="text-sm text-pergamino-blue hover:underline">
              Forgot password?
            </a>
          </div>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="border-pergamino-teal/30 focus:ring-pergamino-teal focus:border-pergamino-teal"
            disabled={isLoading}
            required
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-pergamino-darkTeal hover:bg-pergamino-teal text-white"
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </Button>
      </form>

      <div className="text-center mt-6 text-pergamino-darkTeal/70">
        <p>Demo accounts:</p>
        <p className="text-sm mt-1">Admin: admin@pergamino.com / admin123</p>
        <p className="text-sm">User: user@pergamino.com / user123</p>
      </div>
    </div>
  );
};

export default LoginForm;
