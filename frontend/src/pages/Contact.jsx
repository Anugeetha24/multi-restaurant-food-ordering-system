import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="contact-page" style={{ padding: '50px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontFamily: 'Playfair Display', fontSize: '3rem', textAlign: 'center', marginBottom: '50px' }}>Contact Us</h1>
      
      <div className="contact-container" style={{ display: 'flex', gap: '50px', flexWrap: 'wrap' }}>
        <div className="contact-info" style={{ flex: 1, minWidth: '300px' }}>
          <div style={{ marginBottom: '30px' }}>
            <h3 style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}><FaMapMarkerAlt color="#d32f2f" /> Address</h3>
            <p style={{ color: '#777' }}>123, Anna Salai, T. Nagar<br/>Chennai, Tamil Nadu 600017<br/>India</p>
          </div>
          <div style={{ marginBottom: '30px' }}>
            <h3 style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}><FaPhone color="#d32f2f" /> Phone</h3>
            <p style={{ color: '#777' }}>🇮🇳 +91 97918 06569</p>
            <p style={{ color: '#777' }}>🇮🇳 +91 98765 43211</p>
          </div>
          <div style={{ marginBottom: '30px' }}>
            <h3 style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}><FaEnvelope color="#d32f2f" /> Email</h3>
            <p style={{ color: '#777' }}>A2B@gmail.com</p>
            <p style={{ color: '#777' }}>info@foody.in</p>
          </div>
          <div style={{ marginBottom: '30px' }}>
            <h3 style={{ marginBottom: '15px', color: '#333' }}>Business Hours</h3>
            <p style={{ color: '#777', marginBottom: '5px' }}><strong>Monday - Friday:</strong> 9:00 AM - 11:00 PM</p>
            <p style={{ color: '#777', marginBottom: '5px' }}><strong>Saturday - Sunday:</strong> 10:00 AM - 12:00 AM</p>
          </div>
        </div>

        <div className="contact-form" style={{ flex: 2, minWidth: '300px', background: '#fff', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
          <form>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '10px', fontWeight: '500' }}>Name</label>
              <input type="text" style={{ width: '100%', padding: '15px', borderRadius: '10px', border: '1px solid #ddd', outline: 'none' }} placeholder="Your Name" />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '10px', fontWeight: '500' }}>Email</label>
              <input type="email" style={{ width: '100%', padding: '15px', borderRadius: '10px', border: '1px solid #ddd', outline: 'none' }} placeholder="Your Email" />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '10px', fontWeight: '500' }}>Message</label>
              <textarea style={{ width: '100%', padding: '15px', borderRadius: '10px', border: '1px solid #ddd', outline: 'none', minHeight: '150px' }} placeholder="How can we help you?"></textarea>
            </div>
            <button type="button" style={{ background: '#d32f2f', color: '#fff', padding: '15px 30px', border: 'none', borderRadius: '30px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' }}>Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
