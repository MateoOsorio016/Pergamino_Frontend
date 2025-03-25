
import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Calendar, coffee, shoppingBag } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { purchases } from '../../lib/data';

const PurchaseHistory: React.FC = () => {
  const { user } = useAuth();
  const [expandedPurchase, setExpandedPurchase] = useState<string | null>(null);
  
  // Filter purchases for the current user
  const userPurchases = purchases.filter(purchase => purchase.userId === user?.id);

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
    <Card className="shadow-md border-pergamino-darkTeal/10">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <shoppingBag className="h-5 w-5 text-pergamino-orange" />
          <CardTitle className="text-xl font-sumana text-pergamino-darkTeal">
            Purchase History
          </CardTitle>
        </div>
        <CardDescription>
          View your recent purchases and points earned
        </CardDescription>
      </CardHeader>
      <CardContent>
        {userPurchases.length > 0 ? (
          <div className="space-y-4">
            {userPurchases.map((purchase) => (
              <div
                key={purchase.id}
                className="border rounded-lg overflow-hidden transition-all duration-200 hover:shadow-md bg-white"
              >
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value={purchase.id} className="border-none">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 cursor-pointer">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-full bg-pergamino-cream flex items-center justify-center">
                          <coffee className="h-5 w-5 text-pergamino-darkTeal" />
                        </div>
                        <div>
                          <h3 className="font-medium text-pergamino-darkTeal">
                            Purchase #{purchase.id}
                          </h3>
                          <div className="flex items-center text-sm text-pergamino-darkTeal/70">
                            <Calendar className="h-3 w-3 mr-1" />
                            {formatDate(purchase.date)}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center mt-2 sm:mt-0 sm:space-x-4">
                        <div className="px-2 py-1 bg-pergamino-orange/10 rounded text-pergamino-orange text-sm font-medium">
                          ${purchase.amount.toFixed(2)}
                        </div>
                        <Badge className="bg-pergamino-teal text-white mt-2 sm:mt-0">
                          +{purchase.pointsEarned} Points
                        </Badge>
                      </div>
                    </div>
                    
                    <AccordionTrigger className="px-4 py-0 hover:no-underline">
                      <span className="text-xs text-pergamino-blue">View Items</span>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <div className="border-t pt-4 mt-2">
                        <div className="space-y-3">
                          {purchase.items.map((item) => (
                            <div 
                              key={item.id}
                              className="flex justify-between items-center p-2 rounded-lg bg-pergamino-cream/30"
                            >
                              <div>
                                <div className="font-medium text-pergamino-darkTeal">
                                  {item.name}
                                </div>
                                <div className="text-sm text-pergamino-darkTeal/70">
                                  Quantity: {item.quantity}
                                </div>
                              </div>
                              <div className="text-pergamino-darkTeal font-medium">
                                ${item.price.toFixed(2)}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-pergamino-darkTeal/70">
            <shoppingBag className="h-16 w-16 mx-auto text-pergamino-darkTeal/30 mb-4" />
            <p className="text-lg font-medium">No purchase history yet</p>
            <p className="mt-1">Your purchases will appear here once you make them.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PurchaseHistory;
