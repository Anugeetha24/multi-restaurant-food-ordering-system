import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaSearch, FaFilter, FaStar } from 'react-icons/fa';

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const { data } = await axios.get('/api/restaurants');
        setRestaurants(data);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurants();
  }, []);

  // Mock brands for the carousel (using fetched restaurants or placeholders)
  const brands = restaurants.length > 0 ? restaurants : [
    { _id: '1', name: 'Sangeetha' },
    { _id: '2', name: 'Thalappakati' },
    { _id: '3', name: 'Subway' },
    { _id: '4', name: 'Chai Kings' },
    { _id: '5', name: 'BBQ Nation' },
    { _id: '6', name: 'KFC' },
  ];

  return (
    <div className="home-page">
      {/* Search Bar */}
      <div className="search-bar-container">
        <div className="search-input-wrapper">
          <FaSearch color="#95a5a6" />
          <input type="text" placeholder="What would you like to eat?" />
          <FaFilter color="#95a5a6" style={{ cursor: 'pointer' }} />
        </div>
      </div>

      {/* Banner */}
      <div className="banner">
        <div className="banner-content">
          <h1>Get 50% OFF on your first order</h1>
          <p>Order from top restaurants near you</p>
        </div>
        {/* In a real app, you'd have an <img> here for the burger/food */}
      </div>

      {/* Popular Brands */}
      <div className="section">
        <h2 className="section-title">Popular Brands</h2>
        <div className="brands-scroll">
          {brands.map((brand, index) => (
            <div key={brand._id || index} className="brand-circle">
              <div className="brand-img">
                {/* Placeholder image */}
                <img src={`https://ui-avatars.com/api/?name=${brand.name}&background=random`} alt={brand.name} />
              </div>
              <span className="brand-name">{brand.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* In the Spotlight */}
      <div className="section">
        <h2 className="section-title">In the Spotlight!</h2>
        {loading ? (
            <p>Loading restaurants...</p>
        ) : (
            <div className="spotlight-grid">
            {restaurants.map((restaurant) => (
                <Link to={`/restaurant/${restaurant._id}`} key={restaurant._id} className="restaurant-card">
                <div className="card-img">
                    <img src={`https://source.unsplash.com/random/400x300/?food,restaurant,${restaurant.cuisine}`} alt={restaurant.name} />
                    {/* Mock Offer Badge */}
                    <div style={{ position: 'absolute', bottom: '10px', left: '10px', background: 'white', padding: '2px 8px', borderRadius: '5px', fontSize: '0.8rem', fontWeight: 'bold', color: '#e74c3c' }}>
                        20% OFF
                    </div>
                </div>
                <div className="card-info">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3>{restaurant.name}</h3>
                        <span className="rating"><FaStar /> 4.2</span>
                    </div>
                    <div className="card-meta">
                        <span>{restaurant.cuisine}</span>
                        <span>•</span>
                        <span>30-40 mins</span>
                    </div>
                    <p style={{ fontSize: '0.9rem', color: '#636e72' }}>{restaurant.address}</p>
                </div>
                </Link>
            ))}
            </div>
        )}
      </div>
    </div>
  );
};

export default Home;
