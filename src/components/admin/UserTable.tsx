
import { useState, useMemo } from 'react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Search,
  Eye,
  Filter,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { User } from '../../context/AuthContext';
import { users } from '../../lib/data';

const ITEMS_PER_PAGE = 5;

const UserTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [pointsFilter, setPointsFilter] = useState<string>('');
  const [sortConfig, setSortConfig] = useState<{
    key: keyof User | null;
    direction: 'asc' | 'desc';
  }>({ key: null, direction: 'asc' });
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Apply filters, sorting, and pagination
  const filteredUsers = useMemo(() => {
    let filtered = [...users].filter(user => user.role === 'user');
    
    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        user => 
          user.name.toLowerCase().includes(searchLower) || 
          user.email.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply points filter
    if (pointsFilter) {
      if (pointsFilter === 'high') {
        filtered = filtered.filter(user => user.points >= 200);
      } else if (pointsFilter === 'medium') {
        filtered = filtered.filter(user => user.points >= 100 && user.points < 200);
      } else if (pointsFilter === 'low') {
        filtered = filtered.filter(user => user.points < 100);
      }
    }
    
    // Apply sorting
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        if (a[sortConfig.key!] < b[sortConfig.key!]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key!] > b[sortConfig.key!]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    
    return filtered;
  }, [users, searchTerm, pointsFilter, sortConfig]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredUsers.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredUsers, currentPage]);

  // Sorting handler
  const handleSort = (key: keyof User) => {
    setSortConfig(prevSortConfig => ({
      key,
      direction:
        prevSortConfig.key === key && prevSortConfig.direction === 'asc'
          ? 'desc'
          : 'asc',
    }));
  };

  // View user details
  const handleViewUser = (user: User) => {
    setSelectedUser(user);
  };

  // Pagination handlers
  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-md border-pergamino-darkTeal/10">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-sumana text-pergamino-darkTeal">
            User Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-pergamino-darkTeal/50 h-4 w-4" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-pergamino-teal/30 focus:border-pergamino-teal"
              />
            </div>
            
            <div className="w-full md:w-48">
              <Select
                value={pointsFilter}
                onValueChange={setPointsFilter}
              >
                <SelectTrigger className="border-pergamino-teal/30">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-pergamino-darkTeal/70" />
                    <SelectValue placeholder="Filter Points" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Points</SelectItem>
                  <SelectItem value="high">High (200+)</SelectItem>
                  <SelectItem value="medium">Medium (100-199)</SelectItem>
                  <SelectItem value="low">Low (0-99)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border border-pergamino-teal/20 overflow-hidden">
            <Table>
              <TableHeader className="bg-pergamino-cream/50">
                <TableRow>
                  <TableHead 
                    className="w-[200px] cursor-pointer hover:text-pergamino-blue"
                    onClick={() => handleSort('name')}
                  >
                    Name
                    {sortConfig.key === 'name' && (
                      <span className="ml-1">
                        {sortConfig.direction === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer hover:text-pergamino-blue"
                    onClick={() => handleSort('email')}
                  >
                    Email
                    {sortConfig.key === 'email' && (
                      <span className="ml-1">
                        {sortConfig.direction === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </TableHead>
                  <TableHead 
                    className="text-right cursor-pointer hover:text-pergamino-blue"
                    onClick={() => handleSort('points')}
                  >
                    Available Points
                    {sortConfig.key === 'points' && (
                      <span className="ml-1">
                        {sortConfig.direction === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </TableHead>
                  <TableHead 
                    className="text-right cursor-pointer hover:text-pergamino-blue"
                    onClick={() => handleSort('pointsSpent')}
                  >
                    Points Spent
                    {sortConfig.key === 'pointsSpent' && (
                      <span className="ml-1">
                        {sortConfig.direction === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </TableHead>
                  <TableHead className="text-right">Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedUsers.length > 0 ? (
                  paginatedUsers.map((user) => (
                    <TableRow 
                      key={user.id}
                      className="hover:bg-pergamino-cream/20 transition-colors"
                    >
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell className="text-right">
                        <Badge variant="outline" className="bg-pergamino-teal/10 text-pergamino-darkTeal">
                          {user.points}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge variant="outline" className="bg-pergamino-orange/10 text-pergamino-orange">
                          {user.pointsSpent}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge className="bg-pergamino-blue text-white">
                          Active
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewUser(user)}
                          className="hover:bg-pergamino-blue/10 hover:text-pergamino-blue"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center h-24 text-muted-foreground">
                      No users found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {filteredUsers.length > 0 && (
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-pergamino-darkTeal/70">
                Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, filteredUsers.length)} of {filteredUsers.length} users
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => goToPage(1)}
                  disabled={currentPage === 1}
                  className="h-8 w-8 border-pergamino-teal/30"
                >
                  <ChevronsLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="h-8 w-8 border-pergamino-teal/30"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm text-pergamino-darkTeal">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="h-8 w-8 border-pergamino-teal/30"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => goToPage(totalPages)}
                  disabled={currentPage === totalPages}
                  className="h-8 w-8 border-pergamino-teal/30"
                >
                  <ChevronsRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

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
    </div>
  );
};

export default UserTable;
