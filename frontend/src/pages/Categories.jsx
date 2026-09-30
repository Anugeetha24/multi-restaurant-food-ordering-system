import { useContext, useEffect, useState } from 'react';
import { FaArrowLeft, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CartContext from '../context/CartContext';

const categories = [
  { name: 'All', icon: '🍽️' },
  { name: 'Biryani', icon: '🍛' },
  { name: 'South Indian', icon: '🥞' },
  { name: 'North Indian', icon: '🫓' },
  { name: 'Pizza', icon: '🍕' },
  { name: 'Beverages', icon: '🥤' },
  { name: 'Chicken', icon: '🍗' },
  { name: 'Desserts', icon: '🍰' },
  { name: 'Chinese', icon: '🥡' },
  { name: 'Fast Food', icon: '🍔' },
  { name: 'Snacks', icon: '🍟' },
];

const matchesCategory = (dish, category) => {
  if (category === 'All') return true;

  const dishName = String(dish.name || '').toLowerCase();
  const dishCategory = String(dish.category || '').toLowerCase();
  const selectedCategory = category.toLowerCase();

  if (dishCategory === selectedCategory) return true;
  if (selectedCategory === 'beverages') return dishCategory === 'beverage' || dishCategory === 'beverages';
  if (selectedCategory === 'biryani') return dishName.includes('biryani');
  if (selectedCategory === 'south indian') return /dosa|idli|vada|sambar/.test(dishName);
  if (selectedCategory === 'north indian') return /paneer|naan|butter chicken|tikka/.test(dishName);
  if (selectedCategory === 'desserts') return dishCategory === 'dessert' || dishCategory === 'desserts';
  if (selectedCategory === 'fast food') return /burger|fries|pizza/.test(dishName) || dishCategory === 'burger';
  if (selectedCategory === 'snacks') return /roll|fries|bread|wings|balls/.test(dishName) || dishCategory === 'starters';
  return dishCategory === selectedCategory;
};

const getOptimizedImageUrl = (image) => image?.replace('/960px-', '/480px-') || 'https://via.placeholder.com/400x300?text=Dish';

const Categories = () => {
  const { addToCart } = useContext(CartContext);
  const [dishes, setDishes] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const [menuResult, restaurantResult] = await Promise.allSettled([
          axios.get('/api/menu'),
          axios.get('/api/restaurants'),
        ]);
        if (menuResult.status === 'rejected') {
          throw menuResult.reason;
        }

        const menuData = menuResult.value.data;
        setDishes(Array.isArray(menuData?.data ?? menuData) ? menuData?.data ?? menuData : []);
        if (restaurantResult.status === 'fulfilled') {
          const restaurantData = restaurantResult.value.data;
          setRestaurants(Array.isArray(restaurantData?.data ?? restaurantData) ? restaurantData?.data ?? restaurantData : []);
        }
      } catch (fetchError) {
        console.error('Error fetching menu categories', fetchError);
        setError('Unable to load food categories right now.');
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  const visibleDishes = dishes.filter((dish) => matchesCategory(dish, activeCategory));
  const restaurantNames = restaurants.reduce((names, restaurant) => {
    names[restaurant._id] = restaurant.name;
    return names;
  }, {});

  return (
    <div className="dashboard-container">
      <div className="section-header" style={{ alignItems: 'center' }}>
        <div>
          <h2>Food Categories</h2>
          <p style={{ color: '#636e72', marginTop: '8px' }}>Explore food from different categories and find your favorite dishes.</p>
        </div>
        <Link to="/dashboard" className="view-all" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <FaArrowLeft size={12} /> Back to Dashboard
        </Link>
      </div>

      <div className="category-row" style={{ flexWrap: 'wrap' }}>
        {categories.map((category) => (
          <button
            type="button"
            key={category.name}
            className={`category-card ${activeCategory === category.name ? 'active' : ''}`}
            onClick={() => setActiveCategory(category.name)}
            style={{ cursor: 'pointer', border: activeCategory === category.name ? '2px solid #F29F05' : 'none' }}
          >
            <span className="cat-icon">{category.icon}</span>
            <span className="cat-name">{category.name}</span>
          </button>
        ))}
      </div>

      <div className="section-header" style={{ marginTop: '30px' }}>
        <h3>{activeCategory} Food</h3>
      </div>

      {loading ? <p>Loading food items...</p> : error ? <p style={{ color: '#c0392b' }}>{error}</p> : visibleDishes.length === 0 ? (
        <p style={{ color: '#636e72' }}>No food items are available in this category yet.</p>
      ) : (
        <div className="dishes-grid">
          {visibleDishes.map((dish) => (
            <div key={dish._id} className="dish-card">
              <div className="dish-img">
                <img
                  src={getOptimizedImageUrl(dish.image)}
                  alt={dish.name}
                  loading="eager"
                  decoding="async"
                  style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src = 'https://via.placeholder.com/400x300?text=Dish';
                  }}
                />
              </div>
              <div className="dish-info">
                <h4>{dish.name}</h4>
                {restaurantNames[dish.restaurant] && <p style={{ color: '#F29F05', fontSize: '0.8rem', marginBottom: '6px' }}>{restaurantNames[dish.restaurant]}</p>}
                <p style={{ color: '#636e72', fontSize: '0.85rem', lineHeight: 1.4 }}>{dish.description || 'Freshly prepared for your order.'}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                  <span className="price">₹{dish.price}</span>
                  <button type="button" aria-label={`Add ${dish.name} to cart`} className="add-btn" onClick={() => addToCart({ ...dish, qty: 1 })}>
                    <FaPlus />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;
