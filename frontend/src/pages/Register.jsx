import { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaArrowLeft } from 'react-icons/fa';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await register(name.trim(), email.trim(), password.trim());
    if (result.success) {
      navigate('/login', {
        replace: true,
        state: { registered: true, email: email.trim() },
      });
    } else {
      alert(result.message || 'Registration failed');
    }
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
            <h1 style={{ fontFamily: 'Playfair Display', fontSize: '3.5rem', marginBottom: '10px' }}>Join Foody</h1>
            <p style={{ fontSize: '1.2rem', maxWidth: '400px' }}>Create an account and start ordering your favorite meals today.</p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="auth-form-container" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '40px', background: '#fff' }}>
        <div style={{ width: '100%', maxWidth: '400px' }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#777', textDecoration: 'none', marginBottom: '30px', fontWeight: '500' }}>
                <FaArrowLeft /> Back to Home
            </Link>
            
            <h2 style={{ fontFamily: 'Playfair Display', fontSize: '2.5rem', marginBottom: '10px', color: '#333' }}>Sign Up</h2>
            <p style={{ color: '#777', marginBottom: '40px' }}>Create your account for free.</p>

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '10px', fontWeight: '500', color: '#333' }}>Full Name</label>
                    <div style={{ position: 'relative' }}>
                        <FaUser style={{ position: 'absolute', top: '50%', left: '15px', transform: 'translateY(-50%)', color: '#a4b0be' }} />
                        <input 
                            type="text" 
                            placeholder="John Doe" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            style={{ width: '100%', padding: '15px 15px 15px 45px', borderRadius: '10px', border: '1px solid #dfe6e9', outline: 'none', fontSize: '1rem' }}
                            required
                        />
                    </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '10px', fontWeight: '500', color: '#333' }}>Email</label>
                    <div style={{ position: 'relative' }}>
                        <FaEnvelope style={{ position: 'absolute', top: '50%', left: '15px', transform: 'translateY(-50%)', color: '#a4b0be' }} />
                        <input 
                            type="email" 
                            placeholder="Enter your email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            style={{ width: '100%', padding: '15px 15px 15px 45px', borderRadius: '10px', border: '1px solid #dfe6e9', outline: 'none', fontSize: '1rem' }}
                            required
                        />
                    </div>
                </div>

                <div style={{ marginBottom: '30px' }}>
                    <label style={{ display: 'block', marginBottom: '10px', fontWeight: '500', color: '#333' }}>Password</label>
                    <div style={{ position: 'relative' }}>
                        <FaLock style={{ position: 'absolute', top: '50%', left: '15px', transform: 'translateY(-50%)', color: '#a4b0be' }} />
                        <input 
                            type="password" 
                            placeholder="Create a password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            style={{ width: '100%', padding: '15px 15px 15px 45px', borderRadius: '10px', border: '1px solid #dfe6e9', outline: 'none', fontSize: '1rem' }}
                            required
                        />
                    </div>
                </div>

                <button type="submit" style={{ width: '100%', padding: '15px', background: '#d32f2f', color: 'white', border: 'none', borderRadius: '10px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 5px 15px rgba(211, 47, 47, 0.3)' }}>
                    Create Account
                </button>
            </form>

            <p style={{ textAlign: 'center', marginTop: '30px', color: '#777' }}>
                Already have an account? <Link to="/login" style={{ color: '#d32f2f', fontWeight: 'bold', textDecoration: 'none' }}>Login</Link>
            </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
