import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaThLarge, FaUtensils, FaHeart, FaHistory, FaQuestionCircle, FaSignOutAlt } from 'react-icons/fa';
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
        <h2>Foody 📦</h2>
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
          <li className={isActive('/myorders') ? 'active' : ''}>
            <Link to="/myorders"><FaHistory /> Order History</Link>
          </li>
        </ul>
      </nav>

      <div className="sidebar-footer">
        <Link to="/help" className="footer-link help-link"><FaQuestionCircle /> Help</Link>
        <button onClick={handleLogout} className="footer-link logout"><FaSignOutAlt /> Logout</button>
      </div>
    </div>
  );
};

export default Sidebar;
