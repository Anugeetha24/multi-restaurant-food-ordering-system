import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import PublicLayout from './components/PublicLayout';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import FoodOrder from './pages/FoodOrder';
import MyOrders from './pages/MyOrders';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import RestaurantMenu from './pages/RestaurantMenu';
import ChefDashboard from './pages/ChefDashboard';
import WaiterDashboard from './pages/WaiterDashboard';
import TableBooking from './pages/TableBooking';
import Upgrade from './pages/Upgrade';
import Help from './pages/Help';
import Favorites from './pages/Favorites';
import Messages from './pages/Messages';
import Others from './pages/Others';
import PublicMenu from './pages/PublicMenu';
import About from './pages/About';
import Contact from './pages/Contact';
import Categories from './pages/Categories';

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<PublicLayout><LandingPage /></PublicLayout>} />
      <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
      <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Protected/Dashboard Routes */}
      <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/food-order" element={<FoodOrder />} />
          <Route path="/orders" element={<MyOrders />} />
          <Route path="/myorders" element={<MyOrders />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/upgrade" element={<Upgrade />} />
          <Route path="/help" element={<Help />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/others" element={<Others />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/menu" element={<PublicMenu />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/restaurant/:id" element={<RestaurantMenu />} />
          
          {/* Chef Dashboard */}
          <Route path="/chef-dashboard" element={<ChefDashboard />} />
          
          {/* Waiter Dashboard */}
          <Route path="/waiter-dashboard" element={<WaiterDashboard />} />

          {/* Table Booking */}
          <Route path="/book-table" element={<TableBooking />} />
      </Route>
    </Routes>
  );
}

export default App;
