import { useContext, useState, useEffect } from 'react';
import CartContext from '../context/CartContext';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaMinus, FaPlus, FaTrash } from 'react-icons/fa';
import axios from 'axios';

const RightPanel = () => {
    const { cartItems, decreaseQty, addToCart, removeFromCart } = useContext(CartContext);
  const { user, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
    const [address, setAddress] = useState(user?.address || 'Select Delivery Location');
  const [locationLoading, setLocationLoading] = useState(false);

  // Update local address state if user context updates (e.g. on login)
  useEffect(() => {
      if (user?.address) setAddress(user.address);
  }, [user]);

  const getUserLocation = () => {
    if (navigator.geolocation) {
        setLocationLoading(true);
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                    // Use OpenStreetMap Nominatim for free reverse geocoding
                    const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
                    let newAddress = `Lat: ${latitude.toFixed(4)}, Lon: ${longitude.toFixed(4)}`;
                    
                    if (response.data && response.data.display_name) {
                        // Shorten the address for display
                        newAddress = response.data.display_name.split(',').slice(0, 3).join(',');
                    } 
                    
                    setAddress(newAddress);
                    if (user) {
                        await updateUser({ address: newAddress });
                    }

                } catch (error) {
                    console.error("Error fetching address", error);
                    setAddress(`Lat: ${latitude.toFixed(4)}, Lon: ${longitude.toFixed(4)}`);
                }
                setLocationLoading(false);
            },
            (error) => {
                console.error("Error getting location", error);
                alert("Unable to retrieve your location");
                setLocationLoading(false);
            }
        );
    } else {
        alert("Geolocation is not supported by this browser.");
    }
  };

  const total = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);
  const deliveryFee = 40;
  const finalTotal = total + deliveryFee;

  return (
    <div className="right-panel">
      {/* Address Section */}
      <div className="address-section">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <h3>Your Address</h3>
            <button 
                onClick={getUserLocation} 
                style={{ background: 'none', border: 'none', color: '#F29F05', cursor: 'pointer', fontWeight: 'bold' }}
            >
                {locationLoading ? 'Locating...' : 'Change'}
            </button>
        </div>
        <div className="address-card">
            <FaMapMarkerAlt className="map-icon" size={20} />
            <div style={{ flex: 1 }}>
                <p className="address-note" style={{ fontSize: '0.9rem', color: '#2d3436', fontWeight: '500' }}>
                    {address}
                </p>
            </div>
        </div>
      </div>

      {/* Order Menu (Cart) */}
      <div className="order-menu-section">
        <h3>Your Cart</h3>
        <div className="cart-list">
            {cartItems.length === 0 ? (
                <div className="empty-cart-text">
                    <p>Your cart is empty</p>
                    <p>Add delicious food from a restaurant to get started.</p>
                </div>
            ) : (
                cartItems.map((item) => (
                    <div key={item._id} className="cart-item-row">
                        <div className="item-img">
                            <img src={item.image || `https://source.unsplash.com/random/100x100/?food,${item.name}`} alt={item.name} />
                        </div>
                        <div className="item-info">
                            <h4>{item.name}</h4>
                            <span className="item-price-qty">₹{Number(item.price).toFixed(2)} each</span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
                                <button type="button" aria-label={`Decrease ${item.name} quantity`} onClick={() => decreaseQty(item._id)} style={{ border: 'none', background: '#f1f2f6', borderRadius: '6px', width: '24px', height: '24px', cursor: 'pointer' }}><FaMinus size={10} /></button>
                                <span>{item.qty}</span>
                                <button type="button" aria-label={`Increase ${item.name} quantity`} onClick={() => addToCart(item)} style={{ border: 'none', background: '#fff5e6', color: '#F29F05', borderRadius: '6px', width: '24px', height: '24px', cursor: 'pointer' }}><FaPlus size={10} /></button>
                                <button type="button" aria-label={`Remove ${item.name} from cart`} onClick={() => removeFromCart(item._id)} style={{ border: 'none', background: 'none', color: '#dc3545', cursor: 'pointer', marginLeft: 'auto' }}><FaTrash size={12} /></button>
                            </div>
                            <span className="item-price-qty"><span className="price">₹{(item.price * item.qty).toFixed(2)}</span></span>
                        </div>
                    </div>
                ))
            )}
        </div>
      </div>

      {/* Totals & Checkout - Only show if cart has items */}
      {cartItems.length > 0 && (
          <div className="checkout-section">
                        <div className="summary-row">
                                <span>Subtotal</span>
                                <span>₹{total.toFixed(2)}</span>
                        </div>
            <div className="summary-row">
                <span>Delivery</span>
                <span>+₹{deliveryFee.toFixed(2)}</span>
            </div>
            <div className="summary-row total">
                <span>Total</span>
                <span>₹{finalTotal.toFixed(2)}</span>
            </div>
            
            <button className="checkout-btn-orange" onClick={() => navigate('/checkout')}>
                Checkout
            </button>
          </div>
      )}
    </div>
  );
};

export default RightPanel;
