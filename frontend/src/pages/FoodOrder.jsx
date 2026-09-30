import { useState, useContext, useEffect } from 'react';
import { FaSearch, FaPlus, FaHeart, FaRegHeart, FaFilter } from 'react-icons/fa';
import CartContext from '../context/CartContext';
import FavoritesContext from '../context/FavoritesContext';
import axios from 'axios';

const FoodOrder = () => {
  const { addToCart } = useContext(CartContext);
  const { toggleFavorite, isFavorite } = useContext(FavoritesContext);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [dishes, setDishes] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const asArray = (value) => (Array.isArray(value) ? value : []);
  const getDishImage = (dish) => dish?.image || dish?.photo || dish?.imageUrl || 'https://via.placeholder.com/400x300?text=Dish';
  const getFallbackImage = (dish) => {
    const dishName = String(dish?.name || 'Dish').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="#F2F4F8"/><text x="200" y="145" text-anchor="middle" fill="#6B7280" font-family="Arial, sans-serif" font-size="22">${dishName}</text><text x="200" y="175" text-anchor="middle" fill="#9CA3AF" font-family="Arial, sans-serif" font-size="14">Image unavailable</text></svg>`;
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  };
  const normalizeCategory = (value) => String(value || '').trim().toLowerCase();
  const categoryAliases = {
    dessert: ['dessert', 'desserts', 'desert', 'desser', 'sweet', 'sweets'],
    pasta: ['pasta', 'pastas'],
    salad: ['salad', 'salads'],
    starters: ['starter', 'starters', 'appetizer', 'appetizers'],
    breads: ['bread', 'breads', 'flatbread', 'flatbreads']
  };

  const categories = ['All', 'Burger', 'Pizza', 'Chicken', 'Seafood', 'Beverage', 'Dessert', 'Pasta', 'Salad', 'Starters', 'Breads'];

  useEffect(() => {
    const fetchMenu = async () => {
        try {
            const [{ data: menuData }, { data: restaurantData }] = await Promise.all([
              axios.get('/api/menu'),
              axios.get('/api/restaurants')
            ]);
            setDishes(asArray(menuData?.data ?? menuData));
            setRestaurants(asArray(restaurantData?.data ?? restaurantData));
            setLoading(false);
        } catch (error) {
            console.error("Error fetching menu", error);
            setLoading(false);
        }
    };
    fetchMenu();
  }, []);

  const matchesCategory = (dishCategory, selectedCategory) => {
    if (selectedCategory === 'All') {
      return true;
    }

    const normalizedDishCategory = normalizeCategory(dishCategory);
    const normalizedSelectedCategory = normalizeCategory(selectedCategory);

    if (normalizedDishCategory === normalizedSelectedCategory) {
      return true;
    }

    const aliases = categoryAliases[normalizedSelectedCategory];
    if (aliases) {
      return aliases.includes(normalizedDishCategory);
    }

    return false;
  };

  const filteredDishes = dishes.filter((dish) => {
    const matchesSearch = [dish.name, dish.description, dish.category]
      .some((value) => String(value || '').toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory(dish.category, activeCategory) && matchesSearch;
  });
  const restaurantNames = restaurants.reduce((names, restaurant) => {
    names[restaurant._id] = restaurant.name;
    return names;
  }, {});
  const groupedDishes = filteredDishes.reduce((groups, dish) => {
    const restaurantId = dish.restaurant || 'other';
    if (!groups[restaurantId]) {
      groups[restaurantId] = [];
    }
    groups[restaurantId].push(dish);
    return groups;
  }, {});

  return (
    <div className="food-order-page">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2>Food Order</h2>
        <div className="search-box" style={{ background: '#fff', padding: '10px 20px', borderRadius: '25px', display: 'flex', alignItems: 'center', gap: '10px', width: '300px' }}>
            <FaSearch color="#a4b0be" />
            <input type="text" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Search food..." style={{ border: 'none', outline: 'none', width: '100%' }} />
        </div>
      </div>

      <div className="category-filter" style={{ display: 'flex', gap: '15px', marginBottom: '30px', overflowX: 'auto', paddingBottom: '10px' }}>
        {categories.map(cat => (
            <button 
                key={cat} 
                onClick={() => setActiveCategory(cat)}
                style={{ 
                    padding: '10px 25px', 
                    borderRadius: '20px', 
                    border: 'none', 
                    background: activeCategory === cat ? '#F29F05' : '#fff', 
                    color: activeCategory === cat ? '#fff' : '#2d3436',
                    cursor: 'pointer',
                    fontWeight: '600',
                    whiteSpace: 'nowrap'
                }}
            >
                {cat}
            </button>
        ))}
      </div>

      <div>
        {loading ? <p>Loading menu...</p> : filteredDishes.length === 0 ? (
          <p style={{ color: '#636e72' }}>No items found in {activeCategory}. Try another category.</p>
        ) : Object.entries(groupedDishes).map(([restaurantId, restaurantDishes]) => (
          <section key={restaurantId} style={{ marginBottom: '35px' }}>
            <h3 style={{ marginBottom: '15px' }}>{restaurantNames[restaurantId] || 'Restaurant Menu'}</h3>
            <div className="dishes-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '25px' }}>
              {restaurantDishes.map((dish) => (
                <div key={dish._id} className="dish-card" style={{ background: '#fff', borderRadius: '20px', padding: '15px', position: 'relative' }}>
                    <div className="dish-img" style={{ height: '150px', borderRadius: '15px', overflow: 'hidden', marginBottom: '15px', position: 'relative' }}>
                      <img
                        src={getDishImage(dish)}
                        alt={dish.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={(event) => {
                          event.currentTarget.onerror = null;
                          event.currentTarget.src = getFallbackImage(dish);
                        }}
                      />
                        <span onClick={() => toggleFavorite(dish)} style={{ position: 'absolute', top: '10px', right: '10px', background: '#fff', padding: '8px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {isFavorite(dish._id) ? 
                            <FaHeart style={{ color: '#ff0000' }} /> : 
                            <FaRegHeart style={{ color: '#000' }} />
                          }
                        </span>
                    </div>
                    <div className="dish-info">
                        <h4 style={{ fontSize: '1rem', marginBottom: '5px' }}>{dish.name}</h4>
                        <p style={{ color: '#636e72', fontSize: '0.85rem', lineHeight: 1.4, marginBottom: '8px' }}>{dish.description || 'Freshly prepared for your order.'}</p>
                        <p style={{ color: '#a4b0be', fontSize: '0.8rem', marginBottom: '10px' }}>{dish.category}</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>₹{dish.price}</span>
                            <button aria-label={`Add ${dish.name} to cart`} onClick={() => addToCart({ ...dish, qty: 1 })} style={{ background: '#F29F05', color: '#fff', border: 'none', width: '35px', height: '35px', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FaPlus /></button>
                        </div>
                    </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default FoodOrder;
