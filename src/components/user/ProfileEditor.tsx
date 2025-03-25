
import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '../../context/AuthContext';
import { User, Mail, Key, Save } from 'lucide-react';

const ProfileEditor: React.FC = () => {
  const { user: currentUser } = useAuth();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would call an API to update the user profile
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully.",
    });
  };

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      toast({
        title: "Password Error",
        description: "New passwords do not match.",
        variant: "destructive",
      });
      return;
    }

    if (formData.newPassword.length < 6) {
      toast({
        title: "Password Error",
        description: "Password must be at least 6 characters.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would call an API to update the password
    setFormData(prev => ({
      ...prev,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }));
    
    toast({
      title: "Password Updated",
      description: "Your password has been updated successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-md border-pergamino-darkTeal/10">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <User className="h-5 w-5 text-pergamino-darkTeal" />
            <CardTitle className="text-xl font-sumana text-pergamino-darkTeal">
              Profile Information
            </CardTitle>
          </div>
          <CardDescription>
            Update your account profile information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleProfileUpdate}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-pergamino-darkTeal">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-pergamino-darkTeal/50 h-4 w-4" />
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="pl-10 border-pergamino-teal/30 focus:border-pergamino-teal"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-pergamino-darkTeal">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-pergamino-darkTeal/50 h-4 w-4" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-10 border-pergamino-teal/30 focus:border-pergamino-teal"
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <Button 
                type="submit"
                className="bg-pergamino-darkTeal hover:bg-pergamino-teal text-white"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="shadow-md border-pergamino-darkTeal/10">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Key className="h-5 w-5 text-pergamino-darkTeal" />
            <CardTitle className="text-xl font-sumana text-pergamino-darkTeal">
              Change Password
            </CardTitle>
          </div>
          <CardDescription>
            Update your account password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordUpdate}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword" className="text-pergamino-darkTeal">Current Password</Label>
                <Input
                  id="currentPassword"
                  name="currentPassword"
                  type="password"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  className="border-pergamino-teal/30 focus:border-pergamino-teal"
                />
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-2">
                <Label htmlFor="newPassword" className="text-pergamino-darkTeal">New Password</Label>
                <Input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="border-pergamino-teal/30 focus:border-pergamino-teal"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-pergamino-darkTeal">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="border-pergamino-teal/30 focus:border-pergamino-teal"
                />
              </div>
            </div>
            
            <div className="mt-6">
              <Button 
                type="submit"
                className="bg-pergamino-darkTeal hover:bg-pergamino-teal text-white"
              >
                Update Password
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="border-t pt-4 text-sm text-pergamino-darkTeal/80">
          <p>Ensure your password is at least 6 characters and includes letters and numbers for better security.</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProfileEditor;
