
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { User } from '../../context/AuthContext';
import { users } from '../../lib/data';
import { DataTable, Column, FilterOption } from '../shared/DataTable';

const UserTable = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Define table columns
  const columns: Column<User>[] = [
    {
      key: 'name',
      header: 'Name',
      cell: (user) => <span className="font-medium">{user.name}</span>,
      sortable: true
    },
    {
      key: 'email',
      header: 'Email',
      cell: (user) => user.email,
      sortable: true
    },
    {
      key: 'points',
      header: 'Available Points',
      cell: (user) => (
        <Badge variant="outline" className="bg-pergamino-teal/10 text-pergamino-darkTeal">
          {user.points}
        </Badge>
      ),
      sortable: true,
      align: 'right'
    },
    {
      key: 'pointsSpent',
      header: 'Points Spent',
      cell: (user) => (
        <Badge variant="outline" className="bg-pergamino-orange/10 text-pergamino-orange">
          {user.pointsSpent}
        </Badge>
      ),
      sortable: true,
      align: 'right'
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

  // Define filter options
  const filterOptions: FilterOption[] = [
    { value: 'all', label: 'All Points' },
    { value: 'high', label: 'High (200+)' },
    { value: 'medium', label: 'Medium (100-199)' },
    { value: 'low', label: 'Low (0-99)' }
  ];

  // Filter handler
  const handleFilter = (value: string, data: User[]): User[] => {
    if (value === 'all') return data;
    
    if (value === 'high') {
      return data.filter(user => user.points >= 200);
    } else if (value === 'medium') {
      return data.filter(user => user.points >= 100 && user.points < 200);
    } else if (value === 'low') {
      return data.filter(user => user.points < 100);
    }
    
    return data;
  };

  // Search handler
  const handleSearch = (searchTerm: string, data: User[]): User[] => {
    const searchLower = searchTerm.toLowerCase();
    return data.filter(
      user => 
        user.name.toLowerCase().includes(searchLower) || 
        user.email.toLowerCase().includes(searchLower)
    );
  };

  // View user details
  const handleViewUser = (user: User) => {
    setSelectedUser(user);
  };

  // Only include users (not admins)
  const userData = users.filter(user => user.role === 'user');

  return (
    <>
      <DataTable 
        title="User Management"
        data={userData}
        columns={columns}
        keyExtractor={(user) => user.id}
        filterOptions={{
          placeholder: "Filter Points",
          options: filterOptions,
          onFilter: handleFilter
        }}
        searchable={true}
        onSearch={handleSearch}
        renderActions={(user) => (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleViewUser(user)}
            className="hover:bg-pergamino-blue/10 hover:text-pergamino-blue"
          >
            <Eye className="h-4 w-4 mr-2" />
            View
          </Button>
        )}
      />

      {/* User Details Dialog */}
      <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-pergamino-darkTeal font-sumana">
              User Details
            </DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-6 py-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h3 className="text-lg font-medium text-pergamino-darkTeal">{selectedUser.name}</h3>
                  <p className="text-sm text-pergamino-darkTeal/70">{selectedUser.email}</p>
                </div>
                <Badge className="self-start md:self-auto bg-pergamino-blue text-white">
                  Active
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4 bg-pergamino-cream/30">
                  <div className="text-sm text-pergamino-darkTeal/70 mb-1">Available Points</div>
                  <div className="text-2xl font-semibold text-pergamino-darkTeal">
                    {selectedUser.points}
                  </div>
                </div>

                <div className="border rounded-lg p-4 bg-pergamino-orange/10">
                  <div className="text-sm text-pergamino-darkTeal/70 mb-1">Points Spent</div>
                  <div className="text-2xl font-semibold text-pergamino-orange">
                    {selectedUser.pointsSpent}
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h4 className="text-sm font-medium text-pergamino-darkTeal mb-2">Account Information</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-pergamino-darkTeal/70">User ID</span>
                    <span className="text-sm">{selectedUser.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-pergamino-darkTeal/70">Role</span>
                    <span className="text-sm capitalize">{selectedUser.role}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-pergamino-darkTeal/70">Total Points</span>
                    <span className="text-sm">{selectedUser.points + selectedUser.pointsSpent}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button variant="outline" onClick={() => setSelectedUser(null)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UserTable;
