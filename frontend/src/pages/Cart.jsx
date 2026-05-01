import { useContext } from 'react';
import CartContext from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  const total = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);

  const checkoutHandler = () => {
    navigate('/checkout');
  };

  return (
    <div>
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty <Link to="/">Go Back</Link></p>
      ) : (
        <div className="grid-3" style={{ gridTemplateColumns: '2fr 1fr' }}>
          <div>
            {cartItems.map((item) => (
              <div key={item._id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h4>{item.name}</h4>
                    <p>Price: ₹{item.price}</p>
                    <p>Qty: {item.qty}</p>
                </div>
                <button onClick={() => removeFromCart(item._id)} className="btn" style={{ background: '#dc3545' }}>Remove</button>
              </div>
            ))}
          </div>
          <div className="card">
            <h2>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h2>
            <h3>Total: ₹{total}</h3>
            <button onClick={checkoutHandler} className="btn" disabled={cartItems.length === 0}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
