import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

const WaiterDashboard = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 10000);
    return () => clearInterval(interval);
  }, []);

  const fetchOrders = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.get('/api/orders', config);
      // Filter orders relevant to waiter (Ready to Serve)
      const waiterOrders = data.filter(o => o.status === 'Ready to Serve');
      setOrders(waiterOrders);
    } catch (error) {
      console.error("Error fetching orders", error);
    }
  };

  const markDelivered = async (id) => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.put(`/api/orders/${id}/status`, { status: 'Delivered' }, config);
      fetchOrders();
    } catch (error) {
      alert('Error updating status');
    }
  };

  return (
    <div className="waiter-dashboard" style={{ padding: '20px' }}>
      <h1>🤵 Waiter Dashboard</h1>
      <div className="orders-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', marginTop: '20px' }}>
        {orders.map(order => (
          <div key={order._id} className="order-card" style={{ background: '#fff', padding: '20px', borderRadius: '10px', borderLeft: '5px solid #2ecc71' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <h3>Order #{order._id.slice(-4)}</h3>
                <span style={{ fontWeight: 'bold', color: '#2ecc71' }}>{order.status}</span>
            </div>
            <p><strong>Table:</strong> {order.tableNumber || 'N/A'}</p>
            <p><strong>Items:</strong></p>
            <ul style={{ paddingLeft: '20px', marginBottom: '15px' }}>
                {order.items.map((item, idx) => (
                    <li key={idx}>{item.quantity}x {item.menuItem?.name || 'Unknown Item'}</li>
                ))}
            </ul>
            <button onClick={() => markDelivered(order._id)} style={{ background: '#3498db', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', width: '100%' }}>Mark Delivered</button>
          </div>
        ))}
        {orders.length === 0 && <p>No orders ready to serve.</p>}
      </div>
    </div>
  );
};

export default WaiterDashboard;
