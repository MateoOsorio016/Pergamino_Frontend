
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PurchaseHistory from '../components/user/PurchaseHistory';
import PointsTracker from '../components/user/PointsTracker';
import ProfileEditor from '../components/user/ProfileEditor';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const UserDashboard: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-grow p-4 sm:p-8 pt-24">
        <div className="max-w-7xl mx-auto space-y-8">
          <header>
            <h1 className="text-3xl font-bold text-pergamino-darkTeal font-sumana">
              Welcome, {user?.name}
            </h1>
            <p className="mt-2 text-pergamino-darkTeal/70">
              Manage your profile, view purchase history, and track your points.
            </p>
          </header>

          <Tabs defaultValue="points" className="space-y-4">
            <TabsList className="grid grid-cols-3 w-full max-w-md">
              <TabsTrigger value="points">My Points</TabsTrigger>
              <TabsTrigger value="purchases">Purchase History</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
            </TabsList>
            
            <TabsContent value="points" className="space-y-4 animate-fade-in">
              <PointsTracker />
            </TabsContent>
            
            <TabsContent value="purchases" className="space-y-4 animate-fade-in">
              <PurchaseHistory />
            </TabsContent>
            
            <TabsContent value="profile" className="space-y-4 animate-fade-in">
              <ProfileEditor />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default UserDashboard;
