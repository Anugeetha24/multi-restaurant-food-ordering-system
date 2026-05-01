import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaThLarge, FaUtensils, FaHeart, FaEnvelope, FaHistory, FaEllipsisH, FaQuestionCircle, FaSignOutAlt, FaGift } from 'react-icons/fa';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const Sidebar = () => {
  const { logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
      logout();
      navigate('/login');
  };

  return (
    <div className="sidebar">
      <div className="logo">
        <h2>LetsMeal 📦</h2>
      </div>
      <nav>
        <ul>
          <li className={isActive('/dashboard') ? 'active' : ''}>
            <Link to="/dashboard"><FaThLarge /> Overview</Link>
          </li>
          <li className={isActive('/food-order') ? 'active' : ''}>
            <Link to="/food-order"><FaUtensils /> Food Order</Link>
          </li>
          <li className={isActive('/favorites') ? 'active' : ''}>
            <Link to="/favorites"><FaHeart /> Favorite</Link>
          </li>
          <li className={isActive('/messages') ? 'active' : ''}>
            <Link to="/messages"><FaEnvelope /> Messages</Link>
          </li>
          <li className={isActive('/myorders') ? 'active' : ''}>
            <Link to="/myorders"><FaHistory /> Order History</Link>
          </li>
          <li className={isActive('/others') ? 'active' : ''}>
            <Link to="/others"><FaEllipsisH /> Others</Link>
          </li>
        </ul>
      </nav>

      <div className="upgrade-card">
        <p>Upgrade Your Account To Get Free Coupon</p>
        <button className="upgrade-btn">Upgrade</button>
      </div>

      <div className="sidebar-footer">
        <Link to="/help" className="footer-link"><FaQuestionCircle /> Help</Link>
        <button onClick={handleLogout} className="footer-link logout"><FaSignOutAlt /> Logout</button>
      </div>
    </div>
  );
};

export default Sidebar;
