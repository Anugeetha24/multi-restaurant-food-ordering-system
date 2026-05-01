import { Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import CartContext from '../context/CartContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);

  return (
    <nav className="navbar">
      <h1><Link to="/">FoodOrder</Link></h1>
      <ul>
        <li><Link to="/">Restaurants</Link></li>
        {user ? (
          <>
            <li><Link to="/myorders">My Orders</Link></li>
            {(user.role === 'chef' || user.role === 'waiter' || user.role === 'admin') && (
              <li><Link to="/dashboard">Dashboard</Link></li>
            )}
            <li>
              <Link to="/profile" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <img 
                  src={`https://ui-avatars.com/api/?name=${user.name}&background=F29F05&color=fff&size=32&rounded=true`} 
                  alt={user.name}
                  style={{ width: '32px', height: '32px', borderRadius: '50%' }}
                />
                {user.name}
              </Link>
            </li>
            <li><button onClick={logout} className="btn">Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
        <li><Link to="/cart">Cart ({cartItems.reduce((acc, item) => acc + item.qty, 0)})</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
