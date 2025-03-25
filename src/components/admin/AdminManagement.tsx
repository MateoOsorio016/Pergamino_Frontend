
import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { User, UserRole } from '../../context/AuthContext';
import { admins } from '../../lib/data';
import { edit, plus, trash } from 'lucide-react';

const AdminManagement: React.FC = () => {
  const { toast } = useToast();
  const [adminsList, setAdminsList] = useState<User[]>(admins);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<User | null>(null);
  
  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isActive, setIsActive] = useState(true);

  const handleAddAdmin = () => {
    // Reset form
    setName('');
    setEmail('');
    setPassword('');
    setIsActive(true);
    setIsAddDialogOpen(true);
  };

  const handleEditAdmin = (admin: User) => {
    setSelectedAdmin(admin);
    setName(admin.name);
    setEmail(admin.email);
    setPassword('');
    setIsActive(true);
    setIsEditDialogOpen(true);
  };

  const handleDeactivateAdmin = (admin: User) => {
    // In a real app, this would call an API to deactivate the admin
    toast({
      title: "Admin Deactivated",
      description: `${admin.name} has been deactivated successfully.`,
    });
  };

  const handleSaveNewAdmin = () => {
    if (!name || !email || !password) {
      toast({
        title: "Error",
        description: "Please fill all required fields.",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would call an API to create a new admin
    const newAdmin: User = {
      id: Math.random().toString(36).substring(7),
      name,
      email,
      role: 'admin' as UserRole,
      points: 0,
      pointsSpent: 0,
    };

    setAdminsList([...adminsList, newAdmin]);
    setIsAddDialogOpen(false);
    
    toast({
      title: "Admin Created",
      description: `${name} has been added as an administrator.`,
    });
  };

  const handleUpdateAdmin = () => {
    if (!selectedAdmin || !name || !email) {
      toast({
        title: "Error",
        description: "Please fill all required fields.",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would call an API to update the admin
    const updatedAdminsList = adminsList.map(admin =>
      admin.id === selectedAdmin.id
        ? { ...admin, name, email }
        : admin
    );

    setAdminsList(updatedAdminsList);
    setIsEditDialogOpen(false);
    
    toast({
      title: "Admin Updated",
      description: `${name}'s information has been updated.`,
    });
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-md border-pergamino-darkTeal/10">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-2xl font-sumana text-pergamino-darkTeal">
            Administrator Management
          </CardTitle>
          <Button 
            onClick={handleAddAdmin}
            className="bg-pergamino-darkTeal hover:bg-pergamino-teal text-white"
          >
            <plus className="h-4 w-4 mr-2" />
            Add Admin
          </Button>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-pergamino-teal/20 overflow-hidden">
            <Table>
              <TableHeader className="bg-pergamino-cream/50">
                <TableRow>
                  <TableHead className="w-[200px]">Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {adminsList.map((admin) => (
                  <TableRow 
                    key={admin.id}
                    className="hover:bg-pergamino-cream/20 transition-colors"
                  >
                    <TableCell className="font-medium">{admin.name}</TableCell>
                    <TableCell>{admin.email}</TableCell>
                    <TableCell className="capitalize">{admin.role}</TableCell>
                    <TableCell className="text-right">
                      <Badge className="bg-pergamino-blue text-white">
                        Active
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditAdmin(admin)}
                          className="hover:bg-pergamino-blue/10 hover:text-pergamino-blue"
                        >
                          <edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeactivateAdmin(admin)}
                          className="hover:bg-pergamino-orange/10 hover:text-pergamino-orange"
                        >
                          <trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add Admin Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-pergamino-darkTeal font-sumana">
              Add New Administrator
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-pergamino-darkTeal">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name"
                className="border-pergamino-teal/30"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-pergamino-darkTeal">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                className="border-pergamino-teal/30"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-pergamino-darkTeal">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="border-pergamino-teal/30"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="active"
                checked={isActive}
                onCheckedChange={setIsActive}
              />
              <Label htmlFor="active" className="text-pergamino-darkTeal">Account Active</Label>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsAddDialogOpen(false)}
              className="border-pergamino-darkTeal/30"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSaveNewAdmin}
              className="bg-pergamino-darkTeal hover:bg-pergamino-teal text-white"
            >
              Add Administrator
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Admin Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-pergamino-darkTeal font-sumana">
              Edit Administrator
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name" className="text-pergamino-darkTeal">Name</Label>
              <Input
                id="edit-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name"
                className="border-pergamino-teal/30"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-email" className="text-pergamino-darkTeal">Email</Label>
              <Input
                id="edit-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                className="border-pergamino-teal/30"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-password" className="text-pergamino-darkTeal">Password</Label>
              <Input
                id="edit-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Leave blank to keep current"
                className="border-pergamino-teal/30"
              />
              <p className="text-xs text-pergamino-darkTeal/70">
                Leave blank to keep the current password.
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="edit-active"
                checked={isActive}
                onCheckedChange={setIsActive}
              />
              <Label htmlFor="edit-active" className="text-pergamino-darkTeal">Account Active</Label>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsEditDialogOpen(false)}
              className="border-pergamino-darkTeal/30"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleUpdateAdmin}
              className="bg-pergamino-darkTeal hover:bg-pergamino-teal text-white"
            >
              Update Administrator
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminManagement;
