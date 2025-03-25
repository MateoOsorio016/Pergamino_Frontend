
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  CardFooter
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { coffee, coins, check, shoppingCart } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { pointsTransactions } from '../../lib/data';

const PointsTracker: React.FC = () => {
  const { user } = useAuth();
  
  // Filter points transactions for the current user
  const userTransactions = pointsTransactions.filter(
    transaction => transaction.userId === user?.id
  );

  // Get earned and spent transactions
  const earnedTransactions = userTransactions.filter(t => t.type === 'earned');
  const spentTransactions = userTransactions.filter(t => t.type === 'spent');

  // Calculate total earned and spent
  const totalEarned = earnedTransactions.reduce((sum, t) => sum + t.points, 0);
  const totalSpent = spentTransactions.reduce((sum, t) => sum + t.points, 0);

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-md border-pergamino-darkTeal/10 bg-gradient-to-br from-pergamino-cream to-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-pergamino-darkTeal text-lg font-medium">Available Points</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-full bg-pergamino-teal/10 flex items-center justify-center">
                <coins className="h-6 w-6 text-pergamino-teal" />
              </div>
              <div className="text-3xl font-bold text-pergamino-darkTeal">
                {user?.points || 0}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md border-pergamino-darkTeal/10 bg-gradient-to-br from-pergamino-cream to-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-pergamino-darkTeal text-lg font-medium">Points Earned</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-full bg-pergamino-orange/10 flex items-center justify-center">
                <coffee className="h-6 w-6 text-pergamino-orange" />
              </div>
              <div className="text-3xl font-bold text-pergamino-darkTeal">
                {totalEarned}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md border-pergamino-darkTeal/10 bg-gradient-to-br from-pergamino-cream to-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-pergamino-darkTeal text-lg font-medium">Points Spent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-full bg-pergamino-blue/10 flex items-center justify-center">
                <shoppingCart className="h-6 w-6 text-pergamino-blue" />
              </div>
              <div className="text-3xl font-bold text-pergamino-darkTeal">
                {user?.pointsSpent || 0}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-md border-pergamino-darkTeal/10">
        <CardHeader>
          <CardTitle className="text-xl font-sumana text-pergamino-darkTeal">
            Points History
          </CardTitle>
          <CardDescription>
            Track your points earned and spent over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-pergamino-darkTeal">Usage Progress</span>
              <span className="text-sm text-pergamino-darkTeal font-medium">
                {user?.pointsSpent || 0}/{totalEarned} points used
              </span>
            </div>
            <Progress 
              value={(user?.pointsSpent || 0) / (totalEarned || 1) * 100} 
              className="h-2"
            />
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="all">All Transactions</TabsTrigger>
              <TabsTrigger value="earned">Earned</TabsTrigger>
              <TabsTrigger value="spent">Spent</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-0">
              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                {userTransactions.length > 0 ? (
                  userTransactions
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between p-3 rounded-lg border border-pergamino-darkTeal/10 hover:bg-pergamino-cream/20"
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            transaction.type === 'earned'
                              ? 'bg-pergamino-teal/10 text-pergamino-teal'
                              : 'bg-pergamino-orange/10 text-pergamino-orange'
                          }`}>
                            {transaction.type === 'earned' ? (
                              <coffee className="h-4 w-4" />
                            ) : (
                              <check className="h-4 w-4" />
                            )}
                          </div>
                          <div>
                            <div className="font-medium text-pergamino-darkTeal">
                              {transaction.description}
                            </div>
                            <div className="text-xs text-pergamino-darkTeal/70">
                              {formatDate(transaction.date)}
                            </div>
                          </div>
                        </div>
                        <div className={`font-semibold ${
                          transaction.type === 'earned'
                            ? 'text-pergamino-teal'
                            : 'text-pergamino-orange'
                        }`}>
                          {transaction.type === 'earned' ? '+' : '-'}{transaction.points} pts
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="text-center py-8 text-pergamino-darkTeal/70">
                    No transactions yet
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="earned" className="mt-0">
              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                {earnedTransactions.length > 0 ? (
                  earnedTransactions
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between p-3 rounded-lg border border-pergamino-darkTeal/10 hover:bg-pergamino-cream/20"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-pergamino-teal/10 flex items-center justify-center text-pergamino-teal">
                            <coffee className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="font-medium text-pergamino-darkTeal">
                              {transaction.description}
                            </div>
                            <div className="text-xs text-pergamino-darkTeal/70">
                              {formatDate(transaction.date)}
                            </div>
                          </div>
                        </div>
                        <div className="font-semibold text-pergamino-teal">
                          +{transaction.points} pts
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="text-center py-8 text-pergamino-darkTeal/70">
                    No earned points yet
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="spent" className="mt-0">
              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                {spentTransactions.length > 0 ? (
                  spentTransactions
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between p-3 rounded-lg border border-pergamino-darkTeal/10 hover:bg-pergamino-cream/20"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-pergamino-orange/10 flex items-center justify-center text-pergamino-orange">
                            <check className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="font-medium text-pergamino-darkTeal">
                              {transaction.description}
                            </div>
                            <div className="text-xs text-pergamino-darkTeal/70">
                              {formatDate(transaction.date)}
                            </div>
                          </div>
                        </div>
                        <div className="font-semibold text-pergamino-orange">
                          -{transaction.points} pts
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="text-center py-8 text-pergamino-darkTeal/70">
                    No spent points yet
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="border-t pt-4 text-sm text-pergamino-darkTeal/80">
          <p>Points are earned with every purchase and can be redeemed for discounts and perks.</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PointsTracker;
