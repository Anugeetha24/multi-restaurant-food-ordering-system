import { useEffect, useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { FaEnvelope, FaLock, FaArrowLeft, FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [infoMessage, setInfoMessage] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.from || '/dashboard';

  useEffect(() => {
    if (location.state?.registered) {
      setInfoMessage('Signup successful. Please login to continue.');
      if (location.state?.email) {
        setEmail(String(location.state.email));
      }
    }
  }, [location.state]);

  const demoUsers = [
    { label: 'Customer', email: 'john@example.com', password: 'password123' },
    { label: 'Chef', email: 'chef@example.com', password: 'password123' },
    { label: 'Waiter', email: 'waiter@example.com', password: 'password123' },
    { label: 'Admin', email: 'admin@example.com', password: 'password123' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    const result = await login(email.trim(), password.trim());
    if (result.success) {
      navigate(redirectPath, { replace: true });
    } else {
      setErrorMessage(`${result.message || 'Invalid credentials'}. Try a demo account below or register a new account.`);
    }
  };

  return (
    <div className="auth-container" style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden' }}>
      {/* Left Side - Image */}
      <div className="auth-image" style={{ flex: 1, position: 'relative', display: 'none', md: { display: 'block' } }}>
        <img 
            src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1981&auto=format&fit=crop" 
            alt="Food" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.3)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'white', textAlign: 'center', padding: '20px' }}>
            <h1 style={{ fontFamily: 'Playfair Display', fontSize: '3.5rem', marginBottom: '10px' }}>Welcome Back!</h1>
            <p style={{ fontSize: '1.2rem', maxWidth: '400px' }}>Sign in to continue your delicious journey with Foody.</p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="auth-form-container" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '40px', background: '#fff' }}>
        <div style={{ width: '100%', maxWidth: '400px' }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#777', textDecoration: 'none', marginBottom: '30px', fontWeight: '500' }}>
                <FaArrowLeft /> Back to Home
            </Link>
            
            <h2 style={{ fontFamily: 'Playfair Display', fontSize: '2.5rem', marginBottom: '10px', color: '#333' }}>Login</h2>
            <p style={{ color: '#777', marginBottom: '40px' }}>Please enter your details.</p>

            {errorMessage && (
              <div style={{ marginBottom: '20px', padding: '12px 14px', borderRadius: '8px', background: '#ffecec', color: '#b00020', border: '1px solid #ffcdd2', fontSize: '0.95rem' }}>
                {errorMessage}
              </div>
            )}

            {infoMessage && (
              <div style={{ marginBottom: '20px', padding: '12px 14px', borderRadius: '8px', background: '#ecfdf3', color: '#166534', border: '1px solid #a7f3d0', fontSize: '0.95rem' }}>
                {infoMessage}
              </div>
            )}

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold', color: '#333' }}>Email</label>
                    <div style={{ position: 'relative' }}>
                        <FaEnvelope style={{ position: 'absolute', top: '50%', left: '15px', transform: 'translateY(-50%)', color: '#a4b0be' }} />
                        <input 
                            type="email" 
                            placeholder="Enter your email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            style={{ width: '100%', padding: '15px 45px 15px 45px', borderRadius: '10px', border: '1px solid #dfe6e9', outline: 'none', fontSize: '1rem', boxSizing: 'border-box' }}
                            required
                        />
                    </div>
                </div>

                <div style={{ marginBottom: '30px' }}>
                    <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold', color: '#333' }}>Password</label>
                    <div style={{ position: 'relative' }}>
                        <FaLock style={{ position: 'absolute', top: '50%', left: '15px', transform: 'translateY(-50%)', color: '#a4b0be' }} />
                        <input 
                            type={showPassword ? "text" : "password"} 
                            placeholder="••••••••" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            style={{ width: '100%', padding: '15px 45px 15px 45px', borderRadius: '10px', border: '1px solid #dfe6e9', outline: 'none', fontSize: '1rem', boxSizing: 'border-box' }}
                            required
                        />
                        <div 
                            onClick={() => setShowPassword(!showPassword)}
                            style={{ position: 'absolute', top: '50%', right: '15px', transform: 'translateY(-50%)', cursor: 'pointer', color: '#a4b0be' }}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </div>
                    </div>
                    <div style={{ marginTop: '10px', textAlign: 'right' }}>
                        <Link to="/forgot-password" style={{ color: '#d32f2f', fontSize: '0.9rem', textDecoration: 'none', fontWeight: '500' }}>Forgot Password?</Link>
                    </div>
                </div>

                <button type="submit" style={{ width: '100%', padding: '15px', background: '#d32f2f', color: 'white', border: 'none', borderRadius: '10px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 5px 15px rgba(211, 47, 47, 0.3)' }}>
                    Sign In
                </button>
            </form>

              <div style={{ marginTop: '16px', padding: '14px', borderRadius: '10px', border: '1px dashed #dfe6e9', background: '#fafafa' }}>
                <p style={{ margin: '0 0 10px', color: '#555', fontWeight: '600' }}>Quick demo login</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  {demoUsers.map((demo) => (
                    <button
                      key={demo.label}
                      type="button"
                      onClick={() => {
                        setEmail(demo.email);
                        setPassword(demo.password);
                        setErrorMessage('');
                      }}
                      style={{ padding: '9px 10px', borderRadius: '8px', border: '1px solid #e0e0e0', background: 'white', cursor: 'pointer', color: '#333', fontWeight: '600' }}
                    >
                      {demo.label}
                    </button>
                  ))}
                </div>
                <p style={{ margin: '10px 0 0', fontSize: '0.85rem', color: '#666' }}>Password for all demo users: password123</p>
              </div>

            <p style={{ textAlign: 'center', marginTop: '30px', color: '#777' }}>
                Don't have an account? <Link to="/register" style={{ color: '#d32f2f', fontWeight: 'bold', textDecoration: 'none' }}>Sign up</Link>
            </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
