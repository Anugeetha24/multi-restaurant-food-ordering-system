import { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import { FaSearch, FaBell, FaCog, FaStar, FaPlus, FaHeart, FaRegHeart, FaSun, FaMoon } from 'react-icons/fa';
import AuthContext from '../context/AuthContext';
import CartContext from '../context/CartContext';
import FavoritesContext from '../context/FavoritesContext';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);
  const { toggleFavorite, isFavorite } = useContext(FavoritesContext);
  const navigate = useNavigate();
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recentOrders, setRecentOrders] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [theme, setTheme] = useState('light');
  const notificationsRef = useRef(null);
  const themeMenuRef = useRef(null);

  const asArray = (value) => (Array.isArray(value) ? value : []);

  const [activeCategory, setActiveCategory] = useState('All');

  // Categories
  const categories = [
    { name: 'All', icon: '🍽️' },
    { name: 'Biryani', icon: '🍛' },
    { name: 'South Indian', icon: '🥞' },
    { name: 'North Indian', icon: '🫓' },
    { name: 'Pizza', icon: '🍕' },
    { name: 'Beverages', icon: '🥤' },
    { name: 'Chicken', icon: '🍗' },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Get All Menu Items (Top Dishes)
        const { data: allDishes } = await axios.get('/api/menu');
        const dishesList = asArray(allDishes?.data ?? allDishes);
        // Randomly shuffle or pick top 20 for display
        setDishes(dishesList.slice(0, 20));

        // 2. Get Restaurants
        const { data: allRestaurants } = await axios.get('/api/restaurants');
        const restaurantsList = asArray(allRestaurants?.data ?? allRestaurants);
        setRestaurants(restaurantsList.slice(0, 20));

        // 3. Get Recent Orders
        if (user) {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const { data: myOrders } = await axios.get('/api/orders/myorders', config);
            setRecentOrders(asArray(myOrders?.data ?? myOrders));
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  useEffect(() => {
    const savedTheme = localStorage.getItem('themeMode') || 'light';
    setTheme(savedTheme);
    document.body.classList.toggle('theme-dark', savedTheme === 'dark');
  }, []);

  useEffect(() => {
    document.body.classList.toggle('theme-dark', theme === 'dark');
    localStorage.setItem('themeMode', theme);
  }, [theme]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (themeMenuRef.current && !themeMenuRef.current.contains(event.target)) {
        setShowThemeMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredDishes = activeCategory === 'All' ? dishes : dishes.filter((dish) => {
    const category = String(dish.category || '').toLowerCase();
    const dishName = String(dish.name || '').toLowerCase();
    if (category === activeCategory.toLowerCase()) return true;
    if (activeCategory === 'Beverages') return category === 'beverage' || category === 'beverages';
    if (activeCategory === 'Biryani') return dishName.includes('biryani');
    if (activeCategory === 'South Indian') return /dosa|idli|vada|sambar/.test(dishName);
    if (activeCategory === 'North Indian') return /paneer|naan|butter chicken|tikka/.test(dishName);
    return category === activeCategory.toLowerCase();
  });
  const unreadCount = recentOrders.filter((order) => order.status !== 'Delivered').length;

  return (
    <div className="dashboard-container">
      {/* Top Header */}
      <header className="dashboard-header">
        <div className="welcome-text">
            <span className="date">Morning, {user?.name || 'User'}</span>
            <h2>Welcome Back!</h2>
        </div>
        <div className="header-actions">
            <div className="search-box">
                <FaSearch />
                <input type="text" placeholder="Search" />
            </div>
            <div className="notification-wrapper" ref={notificationsRef}>
              <button
                type="button"
                className="icon-btn"
                onClick={() => setShowNotifications((prev) => !prev)}
                aria-label="Open notifications"
                aria-expanded={showNotifications}
              >
                <FaBell />
                {unreadCount > 0 && <span className="notification-badge">{unreadCount > 9 ? '9+' : unreadCount}</span>}
              </button>
              {showNotifications && (
                <div className="notifications-panel">
                  <p className="notifications-title">Notifications</p>
                  {recentOrders.length === 0 ? (
                    <p className="notifications-empty">No notifications yet</p>
                  ) : (
                    recentOrders.slice(0, 4).map((order) => (
                      <div key={order._id} className="notification-item">
                        <p>Order #{String(order._id).slice(0, 6)} - ₹{order.totalAmount}</p>
                        <span>{order.status}</span>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
            <div className="theme-wrapper" ref={themeMenuRef}>
              <button
                type="button"
                className="icon-btn"
                onClick={() => setShowThemeMenu((prev) => !prev)}
                aria-label="Theme settings"
                aria-expanded={showThemeMenu}
              >
                <FaCog />
              </button>
              {showThemeMenu && (
                <div className="theme-menu">
                  <button
                    type="button"
                    className={`theme-option ${theme === 'light' ? 'active' : ''}`}
                    onClick={() => {
                      setTheme('light');
                      setShowThemeMenu(false);
                    }}
                  >
                    <FaSun /> Light mode
                  </button>
                  <button
                    type="button"
                    className={`theme-option ${theme === 'dark' ? 'active' : ''}`}
                    onClick={() => {
                      setTheme('dark');
                      setShowThemeMenu(false);
                    }}
                  >
                    <FaMoon /> Dark mode
                  </button>
                </div>
              )}
            </div>
            <button
              type="button"
              className="user-avatar"
              onClick={() => navigate('/profile')}
              aria-label="Open profile"
              title="Profile"
              style={{ cursor: 'pointer', border: 'none', background: 'transparent', padding: 0 }}
            >
                <img src={`https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=random`} alt="User" />
            </button>
        </div>
      </header>

      {/* Banner */}
      <div className="promo-banner">
        <div className="promo-content">
            <h1>Order Your Favorite Food From Multiple Restaurants</h1>
            <p>Explore multiple restaurants, browse their menus, add your favorite dishes to your cart, and place your order through a single platform.</p>
        </div>
        <div className="promo-image">
            {/* Chef Illustration Placeholder */}
            <img src="https://cdn-icons-png.flaticon.com/512/3461/3461980.png" alt="Chef" />
        </div>
      </div>

      {/* Categories */}
      <div className="section-header">
        <h3>Category</h3>
        <Link to="/categories" className="view-all">View all &gt;</Link>
      </div>
      <div className="category-row">
        {categories.map((cat, index) => (
            <div 
                key={index} 
                className={`category-card ${activeCategory === cat.name ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.name)}
                style={{ cursor: 'pointer', border: activeCategory === cat.name ? '2px solid #F29F05' : 'none' }}
            >
                <span className="cat-icon">{cat.icon}</span>
                <span className="cat-name">{cat.name}</span>
            </div>
        ))}
      </div>

      {/* Restaurants */}
      <div className="section-header">
        <h3>Popular Restaurants</h3>
        <Link to="/food-order" className="view-all">View all &gt;</Link>
      </div>
      <div className="dishes-grid">
        {loading ? <p>Loading...</p> : restaurants.map((restaurant) => (
            <div key={restaurant._id} className="dish-card" style={{ cursor: 'pointer' }} onClick={() => navigate('/food-order')}>
                <div className="dish-img">
                  <img
                    src={restaurant.image || 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=900'}
                    alt={restaurant.name}
                    onError={(event) => {
                      event.currentTarget.src = 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=900';
                    }}
                  />
                </div>
                <div className="dish-info">
                    {Number.isFinite(Number(restaurant.rating)) && <div className="rating">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} color={i < Math.floor(Number(restaurant.rating)) ? "#f1c40f" : "#ddd"} size={12} />
                      ))}
                      <span style={{ marginLeft: '5px', fontSize: '0.8rem', color: '#636e72' }}>{restaurant.rating}</span>
                    </div>}
                    <h4>{restaurant.name}</h4>
                    <p style={{ fontSize: '0.85rem', color: '#636e72' }}>{restaurant.cuisine}</p>
                    <p style={{ fontSize: '0.8rem', color: '#999' }}>📍 {restaurant.address}</p>
                    <button 
                        onClick={(e) => { e.stopPropagation(); navigate('/food-order'); }} 
                        style={{ marginTop: '10px', background: '#F29F05', color: '#fff', border: 'none', padding: '8px 15px', borderRadius: '10px', cursor: 'pointer', fontWeight: '600', width: '100%' }}
                    >
                        View Menu
                    </button>
                </div>
            </div>
        ))}
      </div>

      {/* Popular Dishes */}
      <div className="section-header">
        <h3>Popular Dishes</h3>
        <Link to="/food-order" className="view-all">View all &gt;</Link>
      </div>
      <div className="dishes-grid">
        {loading ? <p>Loading...</p> : filteredDishes.map((dish) => (
            <div key={dish._id} className="dish-card">
                <div className="dish-img">
                    <img src={dish.image || 'https://via.placeholder.com/150'} alt={dish.name} />
                    <span className="fav-icon" onClick={() => toggleFavorite(dish)} style={{ cursor: 'pointer' }}>
                      {isFavorite(dish._id) ? 
                        <FaHeart style={{ color: '#ff0000' }} /> : 
                        <FaRegHeart style={{ color: '#000' }} />
                      }
                    </span>
                </div>
                <div className="dish-info">
                    <h4>{dish.name}</h4>
                    <p className="price">₹{dish.price}</p>
                    <button className="add-btn" onClick={() => addToCart({ ...dish, qty: 1 })}><FaPlus /></button>
                </div>
            </div>
        ))}
      </div>
      
      {/* Recent Orders */}
      <div className="section-header">
        <h3>Recent Order</h3>
        <span className="view-all">View all &gt;</span>
      </div>
      <div className="dishes-grid">
         {recentOrders.length > 0 ? recentOrders.slice(0, 4).map((order) => (
            <div key={order._id} className="dish-card">
                <div className="dish-img">
                     {/* Assuming order items have menuItem populated or we just show a generic image if not */}
              <img src={order.items?.[0]?.menuItem?.image || 'https://via.placeholder.com/150'} alt="Order" />
                </div>
                <div className="dish-info">
              <h4>Order #{String(order?._id || '').substring(0, 6) || 'N/A'}</h4>
              <p className="price">₹{order?.totalAmount ?? 0}</p>
                    <span style={{ fontSize: '0.8rem', color: order.status === 'Delivered' ? 'green' : 'orange' }}>{order.status}</span>
                </div>
            </div>
        )) : <p>No recent orders found.</p>}
      </div>

    </div>
  );
};

export default Dashboard;
