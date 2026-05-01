import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaLock, FaArrowLeft } from 'react-icons/fa';

const ForgotPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    if (newPassword.length < 6) {
      alert('Password must be at least 6 characters long');
      return;
    }

    // Here you would typically call an API to reset the password
    alert('Password reset successful! Please login with your new password.');
    navigate('/login');
  };

  return (
    <div className="auth-container" style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden' }}>
      {/* Left Side - Image */}
      <div className="auth-image" style={{ flex: 1, position: 'relative', display: 'none', md: { display: 'block' } }}>
        <img 
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop" 
            alt="Food" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.3)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'white', textAlign: 'center', padding: '20px' }}>
            <h1 style={{ fontFamily: 'Playfair Display', fontSize: '3.5rem', marginBottom: '10px' }}>Reset Password</h1>
            <p style={{ fontSize: '1.2rem', maxWidth: '400px' }}>Create a new password for your account.</p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="auth-form-container" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '40px', background: '#fff' }}>
        <div style={{ width: '100%', maxWidth: '400px' }}>
            <Link to="/login" style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#777', textDecoration: 'none', marginBottom: '30px', fontWeight: '500' }}>
                <FaArrowLeft /> Back to Login
            </Link>
            
            <h2 style={{ fontFamily: 'Playfair Display', fontSize: '2.5rem', marginBottom: '10px', color: '#333' }}>Forgot Password</h2>
            <p style={{ color: '#777', marginBottom: '40px' }}>Enter your new password below.</p>

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold', color: '#333' }}>New Password</label>
                    <div style={{ position: 'relative' }}>
                        <FaLock style={{ position: 'absolute', top: '50%', left: '12px', transform: 'translateY(-50%)', color: '#a4b0be' }} />
                        <input 
                            type="password" 
                            placeholder="Enter new password" 
                            value={newPassword} 
                            onChange={(e) => setNewPassword(e.target.value)} 
                            style={{ width: '100%', padding: '12px 12px 12px 40px', borderRadius: '10px', border: '1px solid #dfe6e9', outline: 'none', fontSize: '0.95rem', boxSizing: 'border-box' }}
                            required
                        />
                    </div>
                </div>

                <div style={{ marginBottom: '30px' }}>
                    <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold', color: '#333' }}>Confirm Password</label>
                    <div style={{ position: 'relative' }}>
                        <FaLock style={{ position: 'absolute', top: '50%', left: '12px', transform: 'translateY(-50%)', color: '#a4b0be' }} />
                        <input 
                            type="password" 
                            placeholder="Confirm new password" 
                            value={confirmPassword} 
                            onChange={(e) => setConfirmPassword(e.target.value)} 
                            style={{ width: '100%', padding: '12px 12px 12px 40px', borderRadius: '10px', border: '1px solid #dfe6e9', outline: 'none', fontSize: '0.95rem', boxSizing: 'border-box' }}
                            required
                        />
                    </div>
                </div>

                <button type="submit" style={{ width: '100%', padding: '12px', background: '#d32f2f', color: 'white', border: 'none', borderRadius: '10px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 5px 15px rgba(211, 47, 47, 0.3)' }}>
                    Reset Password
                </button>
            </form>

            <p style={{ textAlign: 'center', marginTop: '30px', color: '#777' }}>
                Remember your password? <Link to="/login" style={{ color: '#d32f2f', fontWeight: 'bold', textDecoration: 'none' }}>Sign in</Link>
            </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
