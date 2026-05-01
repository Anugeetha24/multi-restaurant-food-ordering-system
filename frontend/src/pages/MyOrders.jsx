import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

const orderFallbackImages = [
  'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=900',
  'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=900',
  'https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=900',
  'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=900'
];

const getOrderImage = (order) => {
  const imageUrl = order.items?.[0]?.menuItem?.image || order.items?.[0]?.image;
  if (imageUrl) {
    return imageUrl;
  }

  const seed = Number(String(order._id || '').replace(/\D/g, '')) || 0;
  return orderFallbackImages[seed % orderFallbackImages.length];
};

const getOrderPreviewName = (order) => {
  const firstItem = order.items?.[0];
  if (!firstItem) {
    return 'Order';
  }

  if (firstItem.menuItem && typeof firstItem.menuItem === 'object') {
    return firstItem.menuItem.name || 'Order Item';
  }

  return firstItem.name || 'Order Item';
};

const getItemDisplayName = (item) => {
  if (!item) {
    return 'Order Item';
  }

  if (item.menuItem && typeof item.menuItem === 'object') {
    return item.menuItem.name || item.name || 'Order Item';
  }

  return item.name || 'Order Item';
};

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState('');
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError('');
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const [ordersResponse, menuResponse] = await Promise.all([
          axios.get('/api/orders/myorders', config),
          axios.get('/api/menu')
        ]);
        setOrders(Array.isArray(ordersResponse.data) ? ordersResponse.data : []);
        setMenuItems(Array.isArray(menuResponse.data) ? menuResponse.data : []);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load your orders.');
        setOrders([]);
        setMenuItems([]);
      } finally {
        setLoading(false);
      }
    };
    if (user?.token) {
      fetchData();
    } else {
      setLoading(false);
      setOrders([]);
      setMenuItems([]);
      setError('Please login to view your orders.');
    }
  }, [user]);

  const resolveMenuItem = (order) => {
    const firstItem = order.items?.[0];
    if (!firstItem) {
      return null;
    }

    const menuItemRef = firstItem.menuItem;
    const itemId = typeof menuItemRef === 'object' ? menuItemRef?._id : menuItemRef || firstItem._id || firstItem.id;
    const itemName = typeof menuItemRef === 'object' ? menuItemRef?.name : firstItem.name;

    const matchedById = menuItems.find((menuItem) => menuItem._id === itemId);
    if (matchedById?.image) {
      return matchedById;
    }

    const matchedByName = itemName
      ? menuItems.find((menuItem) => menuItem.name?.toLowerCase() === itemName.toLowerCase())
      : null;
    if (matchedByName?.image) {
      return matchedByName;
    }

    if (menuItemRef && typeof menuItemRef === 'object' && menuItemRef.image && menuItemRef.name !== 'Order Item') {
      return menuItemRef;
    }

    return matchedById || matchedByName || null;
  };

  const renderImage = (order) => {
    const menuItem = resolveMenuItem(order);
    if (menuItem?.image) {
      return menuItem.image;
    }

    return getOrderImage(order);
  };

  const deleteOrder = async (orderId) => {
    if (!user?.token) {
      setError('Please login to delete orders.');
      return;
    }

    const confirmDelete = window.confirm('Delete this order from your history?');
    if (!confirmDelete) {
      return;
    }

    try {
      setDeletingId(orderId);
      const config = {
        headers: { Authorization: `Bearer ${user.token}` }
      };
      await axios.delete(`/api/orders/${orderId}`, config);
      setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete order.');
    } finally {
      setDeletingId('');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ marginBottom: '30px' }}>Recent Order</h1>
      {loading && <p style={{ color: '#636e72' }}>Loading your orders...</p>}
      {!loading && error && <p style={{ color: '#d63031' }}>{error}</p>}
      {!loading && !error && orders.length === 0 && <p style={{ color: '#636e72' }}>No recent orders found. Place an order to see it here.</p>}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {!loading && !error && orders.map((order) => (
          <div key={order._id} style={{ background: '#fff', borderRadius: '15px', padding: '15px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <div style={{ width: '100%', height: '150px', borderRadius: '10px', overflow: 'hidden', marginBottom: '15px', background: '#f1f5f9' }}>
              <img 
                src={renderImage(order)} 
                alt={getOrderPreviewName(order)}
                onError={(event) => {
                  event.currentTarget.src = getOrderImage(order);
                }}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <h3 style={{ fontSize: '1rem', marginBottom: '8px' }}>Order #{order._id.substring(0, 6)}</h3>
            <p style={{ fontSize: '0.9rem', color: '#636e72', marginBottom: '8px' }}>
              {(order.items || []).length} item{(order.items || []).length !== 1 ? 's' : ''}
            </p>
            <p style={{ fontSize: '0.95rem', fontWeight: 600, color: '#1f2937', marginBottom: '8px' }}>
              {getOrderPreviewName(order)}
            </p>
            {Array.isArray(order.items) && order.items.length > 0 && (
              <div style={{ marginBottom: '10px' }}>
                {(order.items || []).map((item, index) => (
                  <p key={`${order._id}_${index}`} style={{ fontSize: '0.85rem', color: '#475569', margin: '2px 0' }}>
                    {item.quantity || 1} x {getItemDisplayName(item)}
                  </p>
                ))}
              </div>
            )}
            <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#F29F05', marginBottom: '5px' }}>₹{order.totalAmount}</p>
            <p style={{ fontSize: '0.9rem', color: order.status === 'Delivered' ? '#00b894' : '#fdcb6e', marginBottom: '5px' }}>{order.status}</p>
            <p style={{ fontSize: '0.85rem', color: '#636e72' }}>{new Date(order.createdAt).toLocaleDateString()}</p>
            <button
              type="button"
              onClick={() => deleteOrder(order._id)}
              disabled={deletingId === order._id}
              style={{
                marginTop: '12px',
                width: '100%',
                border: 'none',
                borderRadius: '10px',
                padding: '10px 12px',
                background: deletingId === order._id ? '#dfe6e9' : '#dc3545',
                color: deletingId === order._id ? '#636e72' : '#fff',
                fontWeight: 600,
                cursor: deletingId === order._id ? 'not-allowed' : 'pointer'
              }}
            >
              {deletingId === order._id ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
