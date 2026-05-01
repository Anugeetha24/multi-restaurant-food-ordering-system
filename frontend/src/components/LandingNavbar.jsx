import { Link } from 'react-router-dom';
import { FaShoppingBag } from 'react-icons/fa';

const LandingNavbar = () => {
  return (
    <nav className="landing-navbar">
      <div className="landing-logo">
        <h1>Foody</h1>
      </div>
      <ul className="landing-nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/menu">Menu</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
      <div className="landing-nav-actions">
        <div className="cart-icon">
            <FaShoppingBag />
            <span className="badge">0</span>
        </div>
        <Link to="/login" className="login-btn" style={{ marginRight: '10px', color: '#2d3436', textDecoration: 'none', fontWeight: '500' }}>Login</Link>
        <Link to="/register" className="signup-btn">Sign Up</Link>
      </div>
    </nav>
  );
};

export default LandingNavbar;
