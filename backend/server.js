const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const crypto = require('crypto');
const { sendPasswordResetEmail } = require('./emailService');

dotenv.config();

const paymentRoutes = require('./paymentRoutes');
const additionalMenuItems = require('./additionalMenuItems');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Payment routes
app.use('/api/payment', paymentRoutes);

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    message: 'Backend is running',
    smtpConfigured: Boolean(process.env.SMTP_HOST && process.env.SMTP_USERNAME && process.env.SMTP_PASSWORD),
  });
});

const restaurants = [
  {
    _id: 'r1',
    name: 'Spice Garden',
    cuisine: 'South Indian',
    rating: 4.6,
    address: 'T Nagar, Chennai',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900&auto=format&fit=crop',
  },
  {
    _id: 'r2',
    name: 'Burger Hub',
    cuisine: 'Fast Food',
    rating: 4.3,
    address: 'Anna Nagar, Chennai',
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=900&auto=format&fit=crop',
  },
  {
    _id: 'r3',
    name: 'Ocean Bowl',
    cuisine: 'Seafood',
    rating: 4.5,
    address: 'Besant Nagar, Chennai',
    image: 'https://images.unsplash.com/photo-1481833761820-0509d3217039?w=900&auto=format&fit=crop',
  },
  {
    _id: 'r4',
    name: 'Naan House',
    cuisine: 'North Indian',
    rating: 4.4,
    address: 'Kodambakkam, Chennai',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&auto=format&fit=crop',
  },
  {
    _id: 'r5',
    name: 'Wok Express',
    cuisine: 'Chinese',
    rating: 4.2,
    address: 'Velachery, Chennai',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=900&auto=format&fit=crop',
  },
  {
    _id: 'r6',
    name: 'Tandoor Town',
    cuisine: 'Indian',
    rating: 4.5,
    address: 'Adyar, Chennai',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=900&auto=format&fit=crop',
  },
  {
    _id: 'r7',
    name: 'Curry Leaf',
    cuisine: 'South Indian',
    rating: 4.3,
    address: 'Mylapore, Chennai',
    image: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=900&auto=format&fit=crop',
  },
  {
    _id: 'r8',
    name: 'Pizza Central',
    cuisine: 'Pizza',
    rating: 4.6,
    address: 'Anna Nagar West, Chennai',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=900&auto=format&fit=crop',
  },
  {
    _id: 'r9',
    name: 'Biryani Boulevard',
    cuisine: 'Biryani',
    rating: 4.7,
    address: 'T. Nagar, Chennai',
    image: 'https://images.pexels.com/photos/323682/pexels-photo-323682.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
  {
    _id: 'r10',
    name: 'Sea Salt Kitchen',
    cuisine: 'Seafood',
    rating: 4.4,
    address: 'Neelankarai, Chennai',
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=900&auto=format&fit=crop',
  },
  {
    _id: 'r11',
    name: 'Burger Junction',
    cuisine: 'Fast Food',
    rating: 4.1,
    address: 'Porur, Chennai',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=900&auto=format&fit=crop',
  },
  {
    _id: 'r12',
    name: 'Cafe Aroma',
    cuisine: 'Cafe',
    rating: 4.5,
    address: 'Alwarpet, Chennai',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900&auto=format&fit=crop',
  },
  {
    _id: 'r13',
    name: 'Sushi Bay',
    cuisine: 'Japanese',
    rating: 4.6,
    address: 'ECR, Chennai',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=900&auto=format&fit=crop',
  },
  {
    _id: 'r14',
    name: 'Garden Wok',
    cuisine: 'Pan Asian',
    rating: 4.3,
    address: 'Nungambakkam, Chennai',
    image: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?w=900&auto=format&fit=crop',
  },
  {
    _id: 'r15',
    name: 'Dessert Den',
    cuisine: 'Desserts',
    rating: 4.8,
    address: 'Kilpauk, Chennai',
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=900&auto=format&fit=crop',
  },
  {
    _id: 'r16',
    name: 'Grill House',
    cuisine: 'Barbecue',
    rating: 4.4,
    address: 'Sholinganallur, Chennai',
    image: 'https://images.unsplash.com/photo-1521305916504-4a1121188589?w=900&auto=format&fit=crop',
  },
  {
    _id: 'r17',
    name: 'Veggie Villa',
    cuisine: 'Vegetarian',
    rating: 4.2,
    address: 'West Mambalam, Chennai',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900&auto=format&fit=crop',
  },
  {
    _id: 'r18',
    name: 'Pasta Point',
    cuisine: 'Italian',
    rating: 4.5,
    address: 'OMR, Chennai',
    image: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=900&auto=format&fit=crop',
  },
  {
    _id: 'r19',
    name: 'Momo Mania',
    cuisine: 'Tibetan',
    rating: 4.1,
    address: 'Chromepet, Chennai',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=900&auto=format&fit=crop',
  },
  {
    _id: 'r20',
    name: 'Hotpot Corner',
    cuisine: 'Asian',
    rating: 4.3,
    address: 'Alandur, Chennai',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900&auto=format&fit=crop',
  },
];

const menu = [
  {
    _id: 'm1',
    restaurant: 'r1',
    name: 'Masala Dosa',
    category: 'Beverage',
    description: 'Crispy dosa with potato masala and chutney.',
    price: 120,
    image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=900&auto=format&fit=crop',
  },
  {
    _id: 'm2',
    restaurant: 'r1',
    name: 'Paneer Butter Masala',
    category: 'Chicken',
    description: 'Creamy tomato gravy with soft paneer cubes.',
    price: 220,
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=900&auto=format&fit=crop',
  },
  {
    _id: 'm3',
    restaurant: 'r2',
    name: 'Classic Cheeseburger',
    category: 'Burger',
    description: 'Juicy patty with cheddar, lettuce, and sauce.',
    price: 180,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=900&auto=format&fit=crop',
  },
  {
    _id: 'm4',
    restaurant: 'r2',
    name: 'Peri Peri Fries',
    category: 'Starters',
    description: 'Crispy fries tossed in peri peri seasoning.',
    price: 110,
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=900&auto=format&fit=crop',
  },
  {
    _id: 'm5',
    restaurant: 'r3',
    name: 'Grilled Fish',
    category: 'Seafood',
    description: 'Fresh fish grilled with lemon herb butter.',
    price: 320,
    image: 'https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?w=900&auto=format&fit=crop',
  },
  {
    _id: 'm6',
    restaurant: 'r3',
    name: 'Prawn Pizza',
    category: 'Pizza',
    description: 'Thin crust pizza topped with prawns and cheese.',
    price: 290,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=900&auto=format&fit=crop',
  },
  {
    _id: 'm7',
    restaurant: 'r1',
    name: 'Chocolate Brownie Sundae',
    category: 'Dessert',
    description: 'Warm chocolate brownie topped with vanilla ice cream.',
    price: 180,
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=900&auto=format&fit=crop',
  },
  {
    _id: 'm8',
    restaurant: 'r2',
    name: 'Gulab Jamun',
    category: 'Dessert',
    description: 'Soft khoya dumplings soaked in fragrant sugar syrup.',
    price: 90,
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=900&auto=format&fit=crop',
  },
  {
    _id: 'm9',
    restaurant: 'r1',
    name: 'Creamy Alfredo Pasta',
    category: 'Pasta',
    description: 'Penne pasta tossed in rich alfredo sauce and herbs.',
    price: 240,
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=900&auto=format&fit=crop',
  },
  {
    _id: 'm10',
    restaurant: 'r2',
    name: 'Mediterranean Salad',
    category: 'Salad',
    description: 'Crisp lettuce, olives, cucumber and feta with vinaigrette.',
    price: 170,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=900&auto=format&fit=crop',
  },
  {
    _id: 'm11',
    restaurant: 'r2',
    name: 'Garlic Breadsticks',
    category: 'Breads',
    description: 'Freshly baked breadsticks brushed with garlic butter.',
    price: 130,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=900&auto=format&fit=crop',
  },
  {
    _id: 'm12',
    restaurant: 'r3',
    name: 'Crispy Chicken Wings',
    category: 'Starters',
    description: 'Spicy and crispy wings served with a creamy dip.',
    price: 210,
    image: 'https://images.unsplash.com/photo-1562967916-eb82221dfb92?w=900&auto=format&fit=crop',
  },
  {
    _id: 'm13',
    restaurant: 'r2',
    name: 'Smoky BBQ Burger',
    category: 'Burger',
    description: 'Grilled patty with BBQ sauce, onion rings and cheese.',
    price: 210,
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=900&auto=format&fit=crop',
  },
  {
    _id: 'm14',
    restaurant: 'r2',
    name: 'Double Chicken Burger',
    category: 'Burger',
    description: 'Double chicken patties with pickles and spicy mayo.',
    price: 230,
    image: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=900&auto=format&fit=crop',
  },
  {
    _id: 'm15',
    restaurant: 'r2',
    name: 'Veggie Crunch Burger',
    category: 'Burger',
    description: 'Crispy veg patty with lettuce, tomato and house sauce.',
    price: 170,
    image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=900&auto=format&fit=crop',
  },
  {
    _id: 'm16',
    restaurant: 'r3',
    name: 'Farmhouse Pizza',
    category: 'Pizza',
    description: 'Loaded with onion, capsicum, tomato and olives.',
    price: 260,
    image: 'https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
  {
    _id: 'm17',
    restaurant: 'r3',
    name: 'Margherita Pizza',
    category: 'Pizza',
    description: 'Classic mozzarella pizza with fresh basil leaves.',
    price: 220,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=900&auto=format&fit=crop',
  },
  {
    _id: 'm18',
    restaurant: 'r3',
    name: 'Pepperoni Pizza',
    category: 'Pizza',
    description: 'Cheesy pizza topped with spicy pepperoni slices.',
    price: 310,
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=900&auto=format&fit=crop',
  },
  {
    _id: 'm19',
    restaurant: 'r1',
    name: 'Chicken Biryani Bowl',
    category: 'Chicken',
    description: 'Fragrant basmati rice layered with spicy chicken.',
    price: 260,
    image: 'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=900&auto=format&fit=crop',
  },
  {
    _id: 'm20',
    restaurant: 'r1',
    name: 'Butter Chicken',
    category: 'Chicken',
    description: 'Tender chicken in creamy tomato butter gravy.',
    price: 280,
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=900&auto=format&fit=crop',
  },
  {
    _id: 'm21',
    restaurant: 'r1',
    name: 'Chicken Tikka',
    category: 'Chicken',
    description: 'Char-grilled chicken tikka cubes with spices.',
    price: 240,
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=900&auto=format&fit=crop',
  },
  {
    _id: 'm22',
    restaurant: 'r3',
    name: 'Fish and Chips',
    category: 'Seafood',
    description: 'Beer-battered fish fillet with crispy fries.',
    price: 300,
    image: 'https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
  {
    _id: 'm23',
    restaurant: 'r3',
    name: 'Prawn Curry',
    category: 'Seafood',
    description: 'Coastal-style prawn curry with coconut and spices.',
    price: 330,
    image: 'https://images.unsplash.com/photo-1625943553852-781c6dd46faa?w=900&auto=format&fit=crop',
  },
  {
    _id: 'm24',
    restaurant: 'r3',
    name: 'Garlic Butter Prawns',
    category: 'Seafood',
    description: 'Sauteed prawns tossed in garlic herb butter.',
    price: 350,
    image: 'https://images.pexels.com/photos/566566/pexels-photo-566566.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
  {
    _id: 'm25',
    restaurant: 'r1',
    name: 'Cold Coffee',
    category: 'Beverage',
    description: 'Chilled coffee blended with milk and ice cream.',
    price: 120,
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=900&auto=format&fit=crop',
  },
  {
    _id: 'm26',
    restaurant: 'r1',
    name: 'Fresh Lime Soda',
    category: 'Beverage',
    description: 'Refreshing lime soda with a hint of mint.',
    price: 80,
    image: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=900&auto=format&fit=crop',
  },
  {
    _id: 'm27',
    restaurant: 'r1',
    name: 'Mango Smoothie',
    category: 'Beverage',
    description: 'Creamy mango smoothie made with ripe mangoes.',
    price: 140,
    image: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=900&auto=format&fit=crop',
  },
  {
    _id: 'm28',
    restaurant: 'r2',
    name: 'Arrabbiata Pasta',
    category: 'Pasta',
    description: 'Penne in spicy tomato sauce with garlic and basil.',
    price: 230,
    image: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=900&auto=format&fit=crop',
  },
  {
    _id: 'm29',
    restaurant: 'r2',
    name: 'Mac and Cheese',
    category: 'Pasta',
    description: 'Creamy baked macaroni with cheddar cheese.',
    price: 210,
    image: 'https://images.unsplash.com/photo-1543339494-b4cd4f7ba686?w=900&auto=format&fit=crop',
  },
  {
    _id: 'm30',
    restaurant: 'r2',
    name: 'Pesto Pasta',
    category: 'Pasta',
    description: 'Basil pesto pasta with parmesan and cherry tomatoes.',
    price: 250,
    image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=900&auto=format&fit=crop',
  },
  {
    _id: 'm31',
    restaurant: 'r1',
    name: 'Caesar Salad',
    category: 'Salad',
    description: 'Romaine lettuce, croutons and creamy caesar dressing.',
    price: 190,
    image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=900&auto=format&fit=crop',
  },
  {
    _id: 'm32',
    restaurant: 'r1',
    name: 'Sprout Power Salad',
    category: 'Salad',
    description: 'Healthy mixed sprouts with cucumber and lemon.',
    price: 160,
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=900&auto=format&fit=crop',
  },
  {
    _id: 'm33',
    restaurant: 'r1',
    name: 'Greek Salad',
    category: 'Salad',
    description: 'Tomato, cucumber, olives and feta in olive oil.',
    price: 200,
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=900&auto=format&fit=crop',
  },
  {
    _id: 'm34',
    restaurant: 'r2',
    name: 'Paneer Tikka',
    category: 'Starters',
    description: 'Tandoor grilled paneer cubes with smoky flavor.',
    price: 220,
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=900&auto=format&fit=crop',
  },
  {
    _id: 'm35',
    restaurant: 'r2',
    name: 'Veg Spring Rolls',
    category: 'Starters',
    description: 'Crispy spring rolls filled with fresh veggies.',
    price: 170,
    image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=900&auto=format&fit=crop',
  },
  {
    _id: 'm36',
    restaurant: 'r2',
    name: 'Cheese Corn Balls',
    category: 'Starters',
    description: 'Crunchy corn and cheese balls served hot.',
    price: 180,
    image: 'https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=900&auto=format&fit=crop',
  },
  {
    _id: 'm37',
    restaurant: 'r1',
    name: 'Butter Naan',
    category: 'Breads',
    description: 'Soft tandoori naan brushed with melted butter.',
    price: 50,
    image: 'https://images.unsplash.com/photo-1604909052743-94e838986d24?w=900&auto=format&fit=crop',
  },
  {
    _id: 'm38',
    restaurant: 'r1',
    name: 'Garlic Naan',
    category: 'Breads',
    description: 'Naan topped with garlic and coriander.',
    price: 60,
    image: 'https://images.unsplash.com/photo-1626500155537-93690c24099e?w=900&auto=format&fit=crop',
  },
  {
    _id: 'm39',
    restaurant: 'r1',
    name: 'Tandoori Roti',
    category: 'Breads',
    description: 'Whole wheat tandoori roti served hot.',
    price: 35,
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=900&auto=format&fit=crop',
  },
];

menu.push(...additionalMenuItems);

const users = [
  {
    _id: 'u1',
    name: 'John Customer',
    email: 'john@example.com',
    password: 'password123',
    role: 'customer',
    walletBalance: 500,
    address: 'Chennai',
    settings: { notifications: { email: true, sms: true, push: true } },
  },
  {
    _id: 'u2',
    name: 'Chef Demo',
    email: 'chef@example.com',
    password: 'password123',
    role: 'chef',
    walletBalance: 250,
    address: 'Chennai',
    settings: { notifications: { email: true, sms: false, push: true } },
  },
  {
    _id: 'u3',
    name: 'Waiter Demo',
    email: 'waiter@example.com',
    password: 'password123',
    role: 'waiter',
    walletBalance: 300,
    address: 'Chennai',
    settings: { notifications: { email: true, sms: true, push: true } },
  },
  {
    _id: 'u4',
    name: 'Admin Demo',
    email: 'admin@example.com',
    password: 'password123',
    role: 'admin',
    walletBalance: 1000,
    address: 'Chennai',
    settings: { notifications: { email: true, sms: true, push: true } },
  },
];

const orders = [];
const passwordResetTokens = new Map();

global.__foodOrderingState = {
  users,
  orders,
};

const toAuthPayload = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  walletBalance: Number(user.walletBalance) || 0,
  address: user.address || '',
  settings: user.settings || { notifications: { email: true, sms: true, push: true } },
  token: `mock-token-${user._id}`,
});

const getUserFromAuthHeader = (req) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';
  if (!token.startsWith('mock-token-')) {
    return null;
  }
  const userId = token.replace('mock-token-', '');
  return users.find((u) => u._id === userId) || null;
};

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body || {};
  const normalizedEmail = String(email || '').trim().toLowerCase();
  const normalizedPassword = String(password || '').trim();
  const user = users.find((u) => u.email.toLowerCase() === normalizedEmail);

  if (!user || user.password !== normalizedPassword) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  return res.json(toAuthPayload(user));
});

app.post('/api/auth/register', (req, res) => {
  const { name, email, password, role } = req.body || {};
  const normalizedName = String(name || '').trim();
  const normalizedEmail = String(email || '').trim().toLowerCase();
  const normalizedPassword = String(password || '').trim();

  if (!normalizedName || !normalizedEmail || !normalizedPassword) {
    return res.status(400).json({ message: 'Name, email and password are required' });
  }

  const existingUser = users.find((u) => u.email.toLowerCase() === normalizedEmail);
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const createdUser = {
    _id: `u${users.length + 1}`,
    name: normalizedName,
    email: normalizedEmail,
    password: normalizedPassword,
    role: role || 'customer',
    walletBalance: 0,
    address: '',
    settings: { notifications: { email: true, sms: true, push: true } },
  };

  users.push(createdUser);
  return res.status(201).json(toAuthPayload(createdUser));
});

app.post('/api/auth/request-password-reset', async (req, res) => {
  const normalizedEmail = String(req.body?.email || '').trim().toLowerCase();
  const user = users.find((entry) => entry.email.toLowerCase() === normalizedEmail);

  if (user) {
    const token = crypto.randomBytes(32).toString('hex');
    passwordResetTokens.set(token, {
      userId: user._id,
      expiresAt: Date.now() + 15 * 60 * 1000,
    });

    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    const resetLink = `${frontendUrl}/forgot-password?token=${token}`;

    try {
      await sendPasswordResetEmail(user.email, resetLink);
    } catch (error) {
      passwordResetTokens.delete(token);
      console.error('Password reset email error:', error.message);
      return res.status(503).json({ message: 'Unable to send the password reset email.' });
    }
  }

  return res.json({ message: 'If an account exists for that email, a reset link has been sent.' });
});

app.post('/api/auth/reset-password', (req, res) => {
  const token = String(req.body?.token || '');
  const newPassword = String(req.body?.newPassword || '').trim();
  const resetRequest = passwordResetTokens.get(token);

  if (!resetRequest || resetRequest.expiresAt < Date.now()) {
    passwordResetTokens.delete(token);
    return res.status(400).json({ message: 'This password reset link is invalid or expired.' });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters long.' });
  }

  const user = users.find((entry) => entry._id === resetRequest.userId);
  if (!user) {
    passwordResetTokens.delete(token);
    return res.status(400).json({ message: 'This password reset link is invalid or expired.' });
  }

  user.password = newPassword;
  passwordResetTokens.delete(token);
  return res.json({ message: 'Password reset successful.' });
});

app.put('/api/auth/profile', (req, res) => {
  const user = getUserFromAuthHeader(req);

  if (!user) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  const { name, email, password, address, settings } = req.body || {};

  if (name) user.name = name;
  if (email) user.email = email;
  if (password) user.password = password;
  if (address !== undefined) user.address = address;
  if (settings) user.settings = settings;

  return res.json(toAuthPayload(user));
});

app.get('/api/restaurants', (_req, res) => {
  res.json(restaurants);
});

app.get('/api/restaurants/:id', (req, res) => {
  const restaurant = restaurants.find((r) => r._id === req.params.id);
  if (!restaurant) {
    return res.status(404).json({ message: 'Restaurant not found' });
  }
  return res.json(restaurant);
});

app.get('/api/menu', (_req, res) => {
  res.json(menu);
});

app.get('/api/menu/:restaurantId', (req, res) => {
  const filteredMenu = menu.filter((item) => item.restaurant === req.params.restaurantId);
  res.json(filteredMenu);
});

app.get('/api/bookings/tables/:restaurantId', (_req, res) => {
  res.json([
    { _id: 't1', tableNumber: 1, capacity: 2 },
    { _id: 't2', tableNumber: 2, capacity: 4 },
    { _id: 't3', tableNumber: 3, capacity: 6 },
  ]);
});

app.get('/api/orders/myorders', (req, res) => {
  const user = getUserFromAuthHeader(req);
  if (!user) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  const myOrders = orders
    .filter((order) => order.userId === user._id)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .map((order) => ({
      ...order,
      items: order.items.map((item) => {
        const menuItem = menu.find((menuEntry) => menuEntry._id === item.menuItem);
        return {
          ...item,
          menuItem: menuItem || { _id: item.menuItem, name: 'Order Item', image: '' },
        };
      }),
    }));

  return res.json(myOrders);
});

app.delete('/api/orders/:id', (req, res) => {
  const user = getUserFromAuthHeader(req);
  if (!user) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  const orderIndex = orders.findIndex((order) => order._id === req.params.id && order.userId === user._id);
  if (orderIndex === -1) {
    return res.status(404).json({ message: 'Order not found' });
  }

  const [deletedOrder] = orders.splice(orderIndex, 1);
  return res.json({ message: 'Order deleted successfully', order: deletedOrder });
});

app.post('/api/orders', (req, res) => {
  const user = getUserFromAuthHeader(req);
  if (!user) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  const { restaurantId, items, totalAmount, paymentStatus, transactionId } = req.body || {};

  if (!restaurantId || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: 'Invalid order payload' });
  }

  const newOrder = {
    _id: `o${orders.length + 1}`,
    userId: user._id,
    restaurantId,
    items,
    totalAmount: Number(totalAmount) || 0,
    paymentStatus: paymentStatus || 'Pending',
    transactionId: transactionId || '',
    status: 'Pending',
    createdAt: new Date().toISOString(),
  };

  orders.push(newOrder);
  return res.status(201).json(newOrder);
});

app.get('/api/payment/config', (_req, res) => {
  // Razorpay test key format is enough for frontend enablement in this mock backend.
  res.json({ key: process.env.RAZORPAY_KEY_ID || 'rzp_test_mock_key_123456' });
});

app.post('/api/payment/create-order', (req, res) => {
  const user = getUserFromAuthHeader(req);
  if (!user) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  const amount = Number(req.body?.amount || 0);
  if (!amount || amount <= 0) {
    return res.status(400).json({ message: 'Amount must be greater than 0' });
  }

  const now = Date.now();
  return res.status(201).json({
    id: `order_mock_${now}`,
    amount: Math.round(amount * 100),
    currency: 'INR',
    receipt: `rcpt_${now}`,
  });
});

app.post('/api/payment/verify', (req, res) => {
  const user = getUserFromAuthHeader(req);
  if (!user) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body || {};
  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({ message: 'Invalid payment verification payload' });
  }

  return res.json({ success: true, message: 'Payment verified (mock)' });
});

app.post('/api/bookings', (_req, res) => {
  res.status(201).json({ message: 'Booking created' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
