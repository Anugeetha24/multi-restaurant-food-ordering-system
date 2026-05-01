import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CartContext from '../context/CartContext';
import AuthContext from '../context/AuthContext';

const RestaurantMenu = () => {
  const { id } = useParams();
  const [menu, setMenu] = useState([]);
  const [restaurant, setRestaurant] = useState({});
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  // Booking state
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState('');
    const asArray = (value) => (Array.isArray(value) ? value : []);
    const getDishImage = (dish) => dish?.image || dish?.photo || dish?.imageUrl || 'https://via.placeholder.com/400x300?text=Dish';
    const getRestaurantImage = (rest) => rest?.image || rest?.photo || rest?.imageUrl || 'https://via.placeholder.com/800x260?text=Restaurant';

  useEffect(() => {
    const fetchData = async () => {
            try {
                const resRest = await axios.get(`/api/restaurants/${id}`);
                setRestaurant(resRest.data?.data ?? resRest.data ?? {});

                const resMenu = await axios.get(`/api/menu/${id}`);
                setMenu(asArray(resMenu.data?.data ?? resMenu.data));

                const resTables = await axios.get(`/api/bookings/tables/${id}`);
                setTables(asArray(resTables.data?.data ?? resTables.data));
            } catch (error) {
                console.error('Error loading restaurant menu', error);
                setRestaurant({});
                setMenu([]);
                setTables([]);
            }
    };
    fetchData();
  }, [id]);

  const handleBookTable = async (e) => {
    e.preventDefault();
    if (!user) {
        alert('Please login to book a table');
        return;
    }
    try {
        const config = {
            headers: { Authorization: `Bearer ${user.token}` }
        };
        await axios.post('/api/bookings', {
            restaurantId: id,
            tableId: selectedTable,
            date,
            timeSlot
        }, config);
        alert('Table booked successfully!');
    } catch (error) {
        alert(error.response?.data?.message || 'Booking failed');
    }
  };

  return (
    <div>
      <h1>{restaurant.name}</h1>
      <p>{restaurant.address}</p>
            <div style={{ marginTop: '16px', borderRadius: '16px', overflow: 'hidden', maxHeight: '260px' }}>
                <img src={getRestaurantImage(restaurant)} alt={restaurant.name || 'Restaurant'} style={{ width: '100%', objectFit: 'cover' }} />
            </div>
      
      <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        <div style={{ flex: 2 }}>
            <h2>Menu</h2>
            <div className="grid-3">
                                {menu.map((item) => (
                <div key={item._id} className="card">
                                        <div style={{ height: '150px', overflow: 'hidden', borderRadius: '12px', marginBottom: '10px' }}>
                                            <img src={getDishImage(item)} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        </div>
                    <h4>{item.name}</h4>
                    <p>{item.description}</p>
                    <p>₹{item.price}</p>
                    <button onClick={() => addToCart(item)} className="btn">Add to Cart</button>
                </div>
                ))}
            </div>
                        {menu.length === 0 && <p>No dishes available for this restaurant.</p>}
        </div>

        <div style={{ flex: 1 }} className="card">
            <h2>Book a Table</h2>
            <form onSubmit={handleBookTable}>
                <div className="form-group">
                    <label>Date</label>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Time Slot</label>
                    <input type="time" value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Table</label>
                    <select value={selectedTable} onChange={(e) => setSelectedTable(e.target.value)} required>
                        <option value="">Select Table</option>
                        {tables.map(table => (
                            <option key={table._id} value={table._id}>Table {table.tableNumber} (Cap: {table.capacity})</option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn">Book Now</button>
            </form>
        </div>
      </div>
    </div>
  );
};

export default RestaurantMenu;
