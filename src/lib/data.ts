
import { User, UserRole } from '../context/AuthContext';

// Mock users data
export const users: User[] = [
  {
    id: '1',
    email: 'admin@pergamino.com',
    name: 'Admin User',
    role: 'admin',
    points: 0,
    pointsSpent: 0
  },
  {
    id: '2',
    email: 'user@pergamino.com',
    name: 'Regular User',
    role: 'user',
    points: 150,
    pointsSpent: 50
  },
  {
    id: '3',
    email: 'maria@example.com',
    name: 'Maria Rodriguez',
    role: 'user',
    points: 320,
    pointsSpent: 180
  },
  {
    id: '4',
    email: 'juan@example.com',
    name: 'Juan Carlos',
    role: 'user',
    points: 85,
    pointsSpent: 215
  },
  {
    id: '5',
    email: 'sofia@example.com',
    name: 'Sofia Hernandez',
    role: 'user',
    points: 430,
    pointsSpent: 70
  },
  {
    id: '6',
    email: 'carlos@example.com',
    name: 'Carlos Mendez',
    role: 'user',
    points: 50,
    pointsSpent: 350
  },
  {
    id: '7',
    email: 'ana@example.com',
    name: 'Ana Martinez',
    role: 'user',
    points: 275,
    pointsSpent: 125
  },
  {
    id: '8',
    email: 'diego@example.com',
    name: 'Diego Lopez',
    role: 'user',
    points: 190,
    pointsSpent: 210
  },
  {
    id: '9',
    email: 'lucia@example.com',
    name: 'Lucia Gomez',
    role: 'user',
    points: 340,
    pointsSpent: 160
  },
  {
    id: '10',
    email: 'pablo@example.com',
    name: 'Pablo Ruiz',
    role: 'user',
    points: 110,
    pointsSpent: 290
  },
  {
    id: '11',
    email: 'andrea@example.com',
    name: 'Andrea Sanchez',
    role: 'user',
    points: 205,
    pointsSpent: 175
  },
  {
    id: '12',
    email: 'roberto@example.com',
    name: 'Roberto Fernandez',
    role: 'user',
    points: 395,
    pointsSpent: 105
  }
];

// Mock admins data
export const admins: User[] = [
  {
    id: '1',
    email: 'admin@pergamino.com',
    name: 'Admin User',
    role: 'admin',
    points: 0,
    pointsSpent: 0
  },
  {
    id: '13',
    email: 'manager@pergamino.com',
    name: 'Manager User',
    role: 'admin',
    points: 0,
    pointsSpent: 0
  }
];

// Mock purchase history data
export interface Purchase {
  id: string;
  userId: string;
  date: string;
  amount: number;
  pointsEarned: number;
  items: PurchaseItem[];
}

export interface PurchaseItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export const purchases: Purchase[] = [
  {
    id: 'p1',
    userId: '2',
    date: '2023-10-15',
    amount: 32.50,
    pointsEarned: 33,
    items: [
      { id: 'i1', name: 'Colombian Coffee - 250g', quantity: 1, price: 12.50 },
      { id: 'i2', name: 'Coffee Filter Pack', quantity: 1, price: 5.00 },
      { id: 'i3', name: 'Espresso Cups Set', quantity: 1, price: 15.00 }
    ]
  },
  {
    id: 'p2',
    userId: '2',
    date: '2023-11-03',
    amount: 45.75,
    pointsEarned: 46,
    items: [
      { id: 'i4', name: 'Ethiopian Coffee - 500g', quantity: 1, price: 24.75 },
      { id: 'i5', name: 'Coffee Grinder', quantity: 1, price: 21.00 }
    ]
  },
  {
    id: 'p3',
    userId: '2',
    date: '2023-12-18',
    amount: 71.25,
    pointsEarned: 71,
    items: [
      { id: 'i6', name: 'Coffee Subscription - 3 months', quantity: 1, price: 60.00 },
      { id: 'i7', name: 'Coffee Mug', quantity: 1, price: 11.25 }
    ]
  },
  {
    id: 'p4',
    userId: '2',
    date: '2024-01-22',
    amount: 28.00,
    pointsEarned: 28,
    items: [
      { id: 'i8', name: 'Brazilian Coffee - 250g', quantity: 2, price: 14.00 }
    ]
  },
  {
    id: 'p5',
    userId: '2',
    date: '2024-02-14',
    amount: 52.50,
    pointsEarned: 53,
    items: [
      { id: 'i9', name: 'Peruvian Coffee - 250g', quantity: 1, price: 13.50 },
      { id: 'i10', name: 'Coffee Maker', quantity: 1, price: 39.00 }
    ]
  }
];

// Mock points transactions
export interface PointsTransaction {
  id: string;
  userId: string;
  date: string;
  points: number;
  type: 'earned' | 'spent';
  description: string;
}

export const pointsTransactions: PointsTransaction[] = [
  {
    id: 't1',
    userId: '2',
    date: '2023-10-15',
    points: 33,
    type: 'earned',
    description: 'Purchase #p1'
  },
  {
    id: 't2',
    userId: '2',
    date: '2023-11-03',
    points: 46,
    type: 'earned',
    description: 'Purchase #p2'
  },
  {
    id: 't3',
    userId: '2',
    date: '2023-11-28',
    points: 20,
    type: 'spent',
    description: 'Redeemed for 10% discount'
  },
  {
    id: 't4',
    userId: '2',
    date: '2023-12-18',
    points: 71,
    type: 'earned',
    description: 'Purchase #p3'
  },
  {
    id: 't5',
    userId: '2',
    date: '2023-12-24',
    points: 30,
    type: 'spent',
    description: 'Redeemed for free shipping'
  },
  {
    id: 't6',
    userId: '2',
    date: '2024-01-22',
    points: 28,
    type: 'earned',
    description: 'Purchase #p4'
  },
  {
    id: 't7',
    userId: '2',
    date: '2024-02-14',
    points: 53,
    type: 'earned',
    description: 'Purchase #p5'
  }
];
