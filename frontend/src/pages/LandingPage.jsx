import { FaStar, FaShoppingCart, FaArrowRight, FaArrowLeft, FaLeaf } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      id: 1,
      name: 'Pappardelle',
      desc: 'With Vegetables',
      price: 350,
      img: 'https://images.unsplash.com/photo-1626844131082-256783844137?q=80&w=1935&auto=format&fit=crop'
    },
    {
      id: 2,
      name: 'Ravioli Stuffed',
      desc: 'With Pesto Sauce',
      price: 350,
      img: 'https://images.unsplash.com/photo-1587393855524-087f83d95bc9?q=80&w=1960&auto=format&fit=crop'
    },
    {
      id: 3,
      name: 'Pappardelle',
      desc: 'With Vegetables',
      price: 350,
      img: 'https://images.unsplash.com/photo-1608835291093-394b0c943a75?q=80&w=2072&auto=format&fit=crop'
    },
    {
      id: 4,
      name: 'Ravioli Stuffed',
      desc: 'With Pesto Sauce',
      price: 350,
      img: 'https://images.unsplash.com/photo-1595295333158-4742f28fbd85?q=80&w=2080&auto=format&fit=crop'
    }
  ];

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            it's not just <br />
            Food, It's an <br />
            Experience.
          </h1>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => navigate('/menu')}>View Menu</button>
            <button className="btn-secondary">Book A Table</button>
          </div>
          <div className="hero-reviews">
            <div className="avatars">
                <img src="https://i.pravatar.cc/100?img=1" alt="user" />
                <img src="https://i.pravatar.cc/100?img=2" alt="user" />
                <img src="https://i.pravatar.cc/100?img=3" alt="user" />
            </div>
            <div className="stars">
                <FaStar color="#f1c40f" />
                <FaStar color="#f1c40f" />
                <FaStar color="#f1c40f" />
                <FaStar color="#f1c40f" />
                <FaStar color="#f1c40f" />
            </div>
          </div>
        </div>
        
        <div className="hero-image-container">
            <div className="discount-tag">
                <span className="percent">5%</span>
                <span className="text">Discount for 2 orders</span>
            </div>
            <div className="main-dish-circle">
                <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1760&auto=format&fit=crop" alt="Healthy Food" className="rotating-dish" />
            </div>
            <FaLeaf className="floating-leaf leaf-1" />
            <FaLeaf className="floating-leaf leaf-2" />
        </div>
      </section>

      {/* Menu Carousel Section */}
      <section className="menu-carousel-section">
        <div className="carousel-controls">
            <button className="nav-arrow prev"><FaArrowLeft /></button>
            <button className="nav-arrow next"><FaArrowRight /></button>
        </div>
        <div className="menu-grid">
            {menuItems.map(item => (
                <div key={item.id} className="menu-card">
                    <div className="card-image-wrapper">
                        <img src={item.img} alt={item.name} />
                    </div>
                    <div className="card-content">
                        <div className="card-header">
                            <h3>{item.name}</h3>
                            <button className="add-cart-btn"><FaShoppingCart /></button>
                        </div>
                        <p>{item.desc}</p>
                        <div className="card-footer">
                            <span className="price">₹{item.price}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
