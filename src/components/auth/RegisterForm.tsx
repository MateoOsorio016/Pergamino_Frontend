
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '../../context/AuthContext';
import { Coffee } from 'lucide-react';

interface RegisterFormProps {
  onSuccess: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      await register(name, email, password);
      toast({
        title: "Success",
        description: "Account created successfully",
      });
      onSuccess();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create account",
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
          <Coffee className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-bold text-pergamino-darkTeal font-sumana">Create Account</h1>
        <p className="text-pergamino-darkTeal/70 mt-2">Join the Pergamino coffee community</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 animate-slide-up">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-pergamino-darkTeal">Full Name</Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            className="border-pergamino-teal/30 focus:ring-pergamino-teal focus:border-pergamino-teal"
            disabled={isLoading}
            required
          />
        </div>

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
          <Label htmlFor="password" className="text-pergamino-darkTeal">Password</Label>
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

        <div className="space-y-2">
          <Label htmlFor="confirm-password" className="text-pergamino-darkTeal">Confirm Password</Label>
          <Input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
          {isLoading ? "Creating Account..." : "Create Account"}
        </Button>
      </form>
    </div>
  );
};

export default RegisterForm;
