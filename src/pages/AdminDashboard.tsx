
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UserTable from '../components/admin/UserTable';
import AdminManagement from '../components/admin/AdminManagement';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const AdminDashboard: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else if (user?.role !== 'admin') {
      navigate('/dashboard');
    }
  }, [isAuthenticated, user, navigate]);

  if (!isAuthenticated || user?.role !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-grow p-4 sm:p-8 pt-24">
        <div className="max-w-7xl mx-auto space-y-8">
          <header>
            <h1 className="text-3xl font-bold text-pergamino-darkTeal font-sumana">
              Admin Dashboard
            </h1>
            <p className="mt-2 text-pergamino-darkTeal/70">
              Manage users, view statistics, and handle administrative tasks.
            </p>
          </header>

          <Tabs defaultValue="users" className="space-y-4">
            <TabsList className="grid grid-cols-2 w-full max-w-md">
              <TabsTrigger value="users">User Management</TabsTrigger>
              <TabsTrigger value="admins">Admin Management</TabsTrigger>
            </TabsList>
            
            <TabsContent value="users" className="space-y-4 animate-fade-in">
              <UserTable />
            </TabsContent>
            
            <TabsContent value="admins" className="space-y-4 animate-fade-in">
              <AdminManagement />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;
