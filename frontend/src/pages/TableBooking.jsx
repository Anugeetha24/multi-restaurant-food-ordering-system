import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const TableBooking = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState('');
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState('');
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');

  useEffect(() => {
    const fetchRestaurants = async () => {
      const { data } = await axios.get('/api/restaurants');
      setRestaurants(data);
    };
    fetchRestaurants();
  }, []);

  useEffect(() => {
    if (selectedRestaurant) {
      const fetchTables = async () => {
        const { data } = await axios.get(`/api/bookings/tables/${selectedRestaurant}`);
        setTables(data);
      };
      fetchTables();
    }
  }, [selectedRestaurant]);

  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.post('/api/bookings', {
        restaurantId: selectedRestaurant,
        tableId: selectedTable,
        date,
        timeSlot
      }, config);
      alert('Table Booked Successfully!');
      navigate('/myorders');
    } catch (error) {
      alert(error.response?.data?.message || 'Booking Failed');
    }
  };

  return (
    <div className="table-booking-page" style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>📅 Book A Table</h1>
      <div className="card" style={{ marginTop: '20px' }}>
        <form onSubmit={handleBooking}>
          <div className="form-group">
            <label>Select Restaurant</label>
            <select value={selectedRestaurant} onChange={(e) => setSelectedRestaurant(e.target.value)} required>
                <option value="">-- Select --</option>
                {restaurants.map(r => (
                    <option key={r._id} value={r._id}>{r.name}</option>
                ))}
            </select>
          </div>
          
          {selectedRestaurant && (
              <div className="form-group">
                <label>Select Table</label>
                <select value={selectedTable} onChange={(e) => setSelectedTable(e.target.value)} required>
                    <option value="">-- Select --</option>
                    {tables.map(t => (
                        <option key={t._id} value={t._id}>Table {t.tableNumber} (Capacity: {t.capacity})</option>
                    ))}
                </select>
              </div>
          )}

          <div className="form-group">
            <label>Date</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Time Slot</label>
            <input type="time" value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)} required />
          </div>

          <button type="submit" className="btn" style={{ width: '100%' }}>Confirm Booking</button>
        </form>
      </div>
    </div>
  );
};

export default TableBooking;
