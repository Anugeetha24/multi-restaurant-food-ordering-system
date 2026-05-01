import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

const ChefDashboard = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 10000); // Poll every 10s
    return () => clearInterval(interval);
  }, []);

  const fetchOrders = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.get('/api/orders', config);
      // Filter orders relevant to chef (Pending, In Preparation)
      const chefOrders = data.filter(o => o.status === 'Pending' || o.status === 'In Preparation');
      setOrders(chefOrders);
    } catch (error) {
      console.error("Error fetching orders", error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.put(`/api/orders/${id}/status`, { status }, config);
      fetchOrders();
    } catch (error) {
      alert('Error updating status');
    }
  };

  return (
    <div className="chef-dashboard" style={{ padding: '20px' }}>
      <h1>👨‍🍳 Chef Dashboard</h1>
      <div className="orders-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', marginTop: '20px' }}>
        {orders.map(order => (
          <div key={order._id} className="order-card" style={{ background: '#fff', padding: '20px', borderRadius: '10px', borderLeft: order.status === 'Pending' ? '5px solid #e74c3c' : '5px solid #f1c40f' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <h3>Order #{order._id.slice(-4)}</h3>
                <span style={{ fontWeight: 'bold', color: order.status === 'Pending' ? '#e74c3c' : '#f1c40f' }}>{order.status}</span>
            </div>
            <p><strong>Items:</strong></p>
            <ul style={{ paddingLeft: '20px', marginBottom: '15px' }}>
                {order.items.map((item, idx) => (
                    <li key={idx}>{item.quantity}x {item.menuItem?.name || 'Unknown Item'}</li>
                ))}
            </ul>
            <div className="actions">
                {order.status === 'Pending' && (
                    <button onClick={() => updateStatus(order._id, 'In Preparation')} style={{ background: '#f1c40f', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', width: '100%' }}>Start Preparing</button>
                )}
                {order.status === 'In Preparation' && (
                    <button onClick={() => updateStatus(order._id, 'Ready to Serve')} style={{ background: '#2ecc71', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', width: '100%' }}>Mark Ready</button>
                )}
            </div>
          </div>
        ))}
        {orders.length === 0 && <p>No active orders.</p>}
      </div>
    </div>
  );
};

export default ChefDashboard;
