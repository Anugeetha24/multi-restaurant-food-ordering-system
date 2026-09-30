import { Link, NavLink } from 'react-router-dom';
import { FaShoppingBag } from 'react-icons/fa';

const LandingNavbar = () => {
  return (
    <nav className="landing-navbar">
      <div className="landing-logo">
        <h1>Foody</h1>
      </div>
      <ul className="landing-nav-links">
        <li><NavLink to="/" end>Home</NavLink></li>
        <li><NavLink to="/menu">Menu</NavLink></li>
        <li><NavLink to="/about">About Us</NavLink></li>
        <li><NavLink to="/contact">Contact</NavLink></li>
      </ul>
      <div className="landing-nav-actions">
        <Link to="/cart" className="cart-icon" aria-label="Cart">
            <FaShoppingBag />
            <span className="badge">0</span>
        </Link>
        <Link to="/login" className="login-btn">Login</Link>
        <Link to="/register" className="signup-btn">Sign Up</Link>
      </div>
    </nav>
  );
};

export default LandingNavbar;
