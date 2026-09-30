import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="contact-page" style={{ padding: '50px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontFamily: 'Playfair Display', fontSize: '3rem', textAlign: 'center', marginBottom: '50px' }}>Contact Us</h1>
      
      <div className="contact-container" style={{ display: 'flex', gap: '50px', flexWrap: 'wrap' }}>
        <div className="contact-info" style={{ flex: 1, minWidth: '300px' }}>
          <div style={{ marginBottom: '30px' }}>
            <h3 style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}><FaMapMarkerAlt color="#d32f2f" /> Address</h3>
            <p style={{ color: '#777' }}>V.S. Engineering College<br/>Karur, Tamil Nadu, India</p>
          </div>
          <div style={{ marginBottom: '30px' }}>
            <h3 style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}><FaPhone color="#d32f2f" /> Phone</h3>
            <p style={{ color: '#777' }}>+91 9791806569</p>
          </div>
          <div style={{ marginBottom: '30px' }}>
            <h3 style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}><FaEnvelope color="#d32f2f" /> Email</h3>
            <p style={{ color: '#777' }}>foody.project@gmail.com</p>
          </div>
          <div style={{ marginBottom: '30px' }}>
            <h3 style={{ marginBottom: '15px', color: '#333' }}>Project Support</h3>
            <p style={{ color: '#777', marginBottom: '5px' }}>Available for project-related queries and feedback.</p>
            <p style={{ color: '#777', marginBottom: '5px' }}><strong>Contact Purpose:</strong> For project-related queries, feedback, restaurant information, and support.</p>
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
              <textarea style={{ width: '100%', padding: '15px', borderRadius: '10px', border: '1px solid #ddd', outline: 'none', minHeight: '150px' }} placeholder="Enter your feedback or project-related query..."></textarea>
            </div>
            <button type="button" style={{ background: '#d32f2f', color: '#fff', padding: '15px 30px', border: 'none', borderRadius: '30px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' }}>Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
