import { useState, useContext, useEffect } from 'react';
import AuthContext from '../context/AuthContext';
import { FaUser, FaWallet, FaBell, FaSave, FaCamera } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

const Profile = () => {
    const location = useLocation();
  const { user, updateUser } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('profile');
    const walletBalance = Number(user?.walletBalance);
    const formattedWalletBalance = Number.isFinite(walletBalance)
        ? walletBalance.toFixed(2)
        : '0.00';
  
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [notifications, setNotifications] = useState({
      email: true,
      sms: true,
      push: true
  });

  useEffect(() => {
      if (user) {
          setName(user.name);
          setEmail(user.email);
          if (user.settings?.notifications) {
              setNotifications(user.settings.notifications);
          }
      }
  }, [user]);

  useEffect(() => {
      const requestedTab = location.state?.activeTab;
      if (requestedTab && ['profile', 'wallet', 'settings'].includes(requestedTab)) {
          setActiveTab(requestedTab);
      }
  }, [location.state]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    const res = await updateUser({ name, email, password });
    if (res.success) alert('Profile Updated Successfully');
    else alert(res.message);
  };

  const handleUpdateSettings = async () => {
      const res = await updateUser({ settings: { notifications } });
      if (res.success) alert('Settings Saved');
      else alert(res.message);
  };

  const toggleNotification = (type) => {
      setNotifications(prev => ({ ...prev, [type]: !prev[type] }));
  };

  return (
    <div className="profile-page" style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '2rem', marginBottom: '30px' }}>My Account</h2>

      <div className="profile-tabs" style={{ display: 'flex', gap: '20px', marginBottom: '30px', borderBottom: '1px solid #dfe6e9' }}>
          <button onClick={() => setActiveTab('profile')} style={{ padding: '10px 20px', background: 'none', border: 'none', borderBottom: activeTab === 'profile' ? '3px solid #F29F05' : '3px solid transparent', fontWeight: 'bold', color: activeTab === 'profile' ? '#F29F05' : '#636e72', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}><FaUser /> Profile</button>
          <button onClick={() => setActiveTab('wallet')} style={{ padding: '10px 20px', background: 'none', border: 'none', borderBottom: activeTab === 'wallet' ? '3px solid #F29F05' : '3px solid transparent', fontWeight: 'bold', color: activeTab === 'wallet' ? '#F29F05' : '#636e72', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}><FaWallet /> Wallet</button>
          <button onClick={() => setActiveTab('settings')} style={{ padding: '10px 20px', background: 'none', border: 'none', borderBottom: activeTab === 'settings' ? '3px solid #F29F05' : '3px solid transparent', fontWeight: 'bold', color: activeTab === 'settings' ? '#F29F05' : '#636e72', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}><FaBell /> Settings</button>
      </div>

      <div className="tab-content" style={{ background: '#fff', padding: '30px', borderRadius: '20px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
          
          {activeTab === 'profile' && (
            <form onSubmit={handleUpdateProfile}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px' }}>
                    <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#dfe6e9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', color: '#fff', position: 'relative' }}>
                        {name.charAt(0)}
                        <button type="button" style={{ position: 'absolute', bottom: '0', right: '0', background: '#F29F05', border: 'none', borderRadius: '50%', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', cursor: 'pointer' }}><FaCamera size={12} /></button>
                    </div>
                    <div>
                        <h3 style={{ margin: 0 }}>{name}</h3>
                        <p style={{ margin: 0, color: '#636e72' }}>{email}</p>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', color: '#636e72' }}>Full Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #dfe6e9', outline: 'none' }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', color: '#636e72' }}>Email Address</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #dfe6e9', outline: 'none' }} />
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', color: '#636e72' }}>New Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Leave blank to keep current" style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #dfe6e9', outline: 'none' }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', color: '#636e72' }}>Confirm Password</label>
                        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm new password" style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #dfe6e9', outline: 'none' }} />
                    </div>
                </div>

                <button type="submit" style={{ background: '#F29F05', color: '#fff', padding: '12px 30px', borderRadius: '10px', border: 'none', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <FaSave /> Save Changes
                </button>
            </form>
          )}

          {activeTab === 'wallet' && (
              <div style={{ textAlign: 'center', padding: '20px' }}>
                  <FaWallet size={50} color="#F29F05" style={{ marginBottom: '20px' }} />
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Current Balance</h3>
                  <h1 style={{ fontSize: '3rem', color: '#2d3436', marginBottom: '30px' }}>₹{formattedWalletBalance}</h1>
                  <button style={{ background: '#F29F05', color: '#fff', padding: '15px 40px', borderRadius: '10px', border: 'none', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer' }}>Top Up Wallet</button>
                  <p style={{ marginTop: '20px', color: '#636e72', fontSize: '0.9rem' }}>Secure payments via Razorpay, PayPal, etc.</p>
              </div>
          )}

          {activeTab === 'settings' && (
              <div>
                  <h3 style={{ marginBottom: '20px' }}>Notification Preferences</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '30px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', border: '1px solid #dfe6e9', borderRadius: '10px' }}>
                          <div>
                              <h4 style={{ margin: 0 }}>Email Notifications</h4>
                              <p style={{ margin: 0, color: '#636e72', fontSize: '0.9rem' }}>Receive updates about your orders via email</p>
                          </div>
                          <label className="switch">
                              <input type="checkbox" checked={notifications.email} onChange={() => toggleNotification('email')} />
                              <span className="slider round"></span>
                          </label>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', border: '1px solid #dfe6e9', borderRadius: '10px' }}>
                          <div>
                              <h4 style={{ margin: 0 }}>SMS Notifications</h4>
                              <p style={{ margin: 0, color: '#636e72', fontSize: '0.9rem' }}>Get text messages for delivery updates</p>
                          </div>
                          <label className="switch">
                              <input type="checkbox" checked={notifications.sms} onChange={() => toggleNotification('sms')} />
                              <span className="slider round"></span>
                          </label>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', border: '1px solid #dfe6e9', borderRadius: '10px' }}>
                          <div>
                              <h4 style={{ margin: 0 }}>Push Notifications</h4>
                              <p style={{ margin: 0, color: '#636e72', fontSize: '0.9rem' }}>Receive real-time alerts on your device</p>
                          </div>
                          <label className="switch">
                              <input type="checkbox" checked={notifications.push} onChange={() => toggleNotification('push')} />
                              <span className="slider round"></span>
                          </label>
                      </div>
                  </div>
                  <button onClick={handleUpdateSettings} style={{ background: '#F29F05', color: '#fff', padding: '12px 30px', borderRadius: '10px', border: 'none', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <FaSave /> Save Preferences
                </button>
              </div>
          )}

      </div>
      <style>{`
        .switch { position: relative; display: inline-block; width: 50px; height: 26px; }
        .switch input { opacity: 0; width: 0; height: 0; }
        .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #ccc; transition: .4s; border-radius: 34px; }
        .slider:before { position: absolute; content: ""; height: 20px; width: 20px; left: 3px; bottom: 3px; background-color: white; transition: .4s; border-radius: 50%; }
        input:checked + .slider { background-color: #F29F05; }
        input:checked + .slider:before { transform: translateX(24px); }
      `}</style>
    </div>
  );
};

export default Profile;
