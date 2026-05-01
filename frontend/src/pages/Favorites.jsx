import { useContext } from 'react';
import { FaHeart, FaTrash } from 'react-icons/fa';
import FavoritesContext from '../context/FavoritesContext';
import CartContext from '../context/CartContext';

const Favorites = () => {
  const { favorites, removeFromFavorites } = useContext(FavoritesContext);
  const { addToCart } = useContext(CartContext);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to remove this item from favorites?')) {
      removeFromFavorites(id);
    }
  };

  const handleOrder = (item) => {
    addToCart({ ...item, qty: 1 });
  };

  const buttonBaseStyle = {
    border: 'none',
    padding: '10px',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease, transform 0.1s ease, box-shadow 0.2s ease'
  };

  return (
    <div className="favorites-page">
      <h2>My Favorites</h2>
      {favorites.length === 0 ? (
        <p style={{ textAlign: 'center', marginTop: '50px', color: '#a4b0be' }}>No favorites yet. Start adding items to your favorites!</p>
      ) : (
        <div className="favorites-list" style={{ marginTop: '20px' }}>
          {favorites.map(item => (
              <div key={item._id} style={{ display: 'flex', alignItems: 'center', background: '#fff', padding: '15px', borderRadius: '15px', marginBottom: '15px', gap: '20px' }}>
                  <div style={{ position: 'relative' }}>
                      <img src={item.image} alt={item.name} style={{ width: '80px', height: '80px', borderRadius: '10px', objectFit: 'cover' }} />
                      <span style={{ position: 'absolute', top: '5px', right: '5px', width: '28px', height: '28px', borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.18)' }}>
                        <FaHeart style={{ color: '#ff0000', fontSize: '14px' }} />
                      </span>
                  </div>
                  <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: '1.1rem', marginBottom: '5px' }}>{item.name}</h3>
                      <p style={{ color: '#a4b0be', fontSize: '0.9rem' }}>{item.restaurant}</p>
                      <span style={{ fontWeight: 'bold', color: '#F29F05' }}>₹{item.price}</span>
                  </div>
                  <button
                    onClick={() => handleOrder(item)}
                    style={{ ...buttonBaseStyle, background: '#ffeaa7', color: '#d35400' }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = '#f8d86a')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = '#ffeaa7')}
                    onMouseDown={(e) => {
                      e.currentTarget.style.background = '#f4c542';
                      e.currentTarget.style.transform = 'translateY(1px)';
                    }}
                    onMouseUp={(e) => {
                      e.currentTarget.style.background = '#f8d86a';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    Order Now
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    style={{ ...buttonBaseStyle, background: '#ff7675', color: '#fff' }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = '#e85f5e')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = '#ff7675')}
                    onMouseDown={(e) => {
                      e.currentTarget.style.background = '#d94d4c';
                      e.currentTarget.style.transform = 'translateY(1px)';
                    }}
                    onMouseUp={(e) => {
                      e.currentTarget.style.background = '#e85f5e';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <FaTrash />
                  </button>
              </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
