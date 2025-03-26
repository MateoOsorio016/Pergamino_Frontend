
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { User, UserRole } from '../../context/AuthContext';
import { admins } from '../../lib/data';
import { Edit, Plus, Trash } from 'lucide-react';
import { DataTable, Column } from '../shared/DataTable';

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

  // Define table columns
  const columns: Column<User>[] = [
    {
      key: 'name',
      header: 'Name',
      cell: (admin) => <span className="font-medium">{admin.name}</span>,
      sortable: true
    },
    {
      key: 'email',
      header: 'Email',
      cell: (admin) => admin.email,
      sortable: true
    },
    {
      key: 'role',
      header: 'Role',
      cell: (admin) => <span className="capitalize">{admin.role}</span>
    },
    {
      key: 'status',
      header: 'Status',
      cell: () => (
        <Badge className="bg-pergamino-blue text-white">
          Active
        </Badge>
      ),
      align: 'right'
    }
  ];

  // Search handler
  const handleSearch = (searchTerm: string, data: User[]): User[] => {
    const searchLower = searchTerm.toLowerCase();
    return data.filter(
      admin => 
        admin.name.toLowerCase().includes(searchLower) || 
        admin.email.toLowerCase().includes(searchLower)
    );
  };

  return (
    <div className="space-y-6">
      <DataTable 
        title="Administrator Management"
        data={adminsList}
        columns={columns}
        keyExtractor={(admin) => admin.id}
        searchable={true}
        onSearch={handleSearch}
        renderTopActions={() => (
          <Button 
            onClick={handleAddAdmin}
            className="bg-pergamino-darkTeal hover:bg-pergamino-teal text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Admin
          </Button>
        )}
        renderActions={(admin) => (
          <div className="flex justify-end space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleEditAdmin(admin)}
              className="hover:bg-pergamino-blue/10 hover:text-pergamino-blue"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDeactivateAdmin(admin)}
              className="hover:bg-pergamino-orange/10 hover:text-pergamino-orange"
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        )}
      />

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
