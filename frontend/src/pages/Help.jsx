import { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaQuestionCircle } from 'react-icons/fa';

const Help = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message sent! We will get back to you shortly.');
    setFormData({ name: '', email: '', message: '' });
  };

  const faqs = [
    { q: 'How do I track my order?', a: 'You can track your order in real-time from the "My Orders" section in your profile or dashboard.' },
    { q: 'Can I cancel my order?', a: 'Yes, you can cancel your order within 5 minutes of placing it. After that, please contact support.' },
    { q: 'What payment methods do you accept?', a: 'We accept Credit/Debit cards, PayPal, Google Pay, and Cash on Delivery.' },
    { q: 'Do you offer refunds?', a: 'Refunds are processed for cancelled orders or incorrect items within 5-7 business days.' }
  ];

  return (
    <div className="help-page" style={{ padding: '40px 20px', maxWidth: '1000px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '10px', textAlign: 'center' }}>Help & Support</h2>
      <p style={{ color: '#636e72', marginBottom: '50px', textAlign: 'center' }}>We are here to help you with any questions or issues.</p>

      <div className="help-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '50px' }}>
        {/* Contact Form */}
        <div className="contact-form-section">
            <h3 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}><FaEnvelope color="#F29F05" /> Contact Us</h3>
            <form onSubmit={handleSubmit} style={{ background: '#fff', padding: '30px', borderRadius: '20px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '10px', color: '#636e72' }}>Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required style={{ width: '100%', padding: '15px', borderRadius: '10px', border: '1px solid #dfe6e9', outline: 'none' }} />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '10px', color: '#636e72' }}>Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required style={{ width: '100%', padding: '15px', borderRadius: '10px', border: '1px solid #dfe6e9', outline: 'none' }} />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '10px', color: '#636e72' }}>Message</label>
                    <textarea name="message" value={formData.message} onChange={handleChange} required rows="5" style={{ width: '100%', padding: '15px', borderRadius: '10px', border: '1px solid #dfe6e9', outline: 'none', resize: 'none' }}></textarea>
                </div>
                <button type="submit" style={{ width: '100%', background: '#F29F05', color: '#fff', padding: '15px', borderRadius: '10px', border: 'none', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }}>Send Message</button>
            </form>
        </div>

        {/* FAQ & Info */}
        <div className="faq-section">
            <h3 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}><FaQuestionCircle color="#F29F05" /> Frequently Asked Questions</h3>
            <div className="faqs" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {faqs.map((item, index) => (
                    <div key={index} style={{ background: '#fff', padding: '20px', borderRadius: '15px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
                        <h4 style={{ marginBottom: '10px', color: '#2d3436' }}>{item.q}</h4>
                        <p style={{ color: '#636e72', fontSize: '0.9rem' }}>{item.a}</p>
                    </div>
                ))}
            </div>

            <div className="contact-info" style={{ marginTop: '40px', display: 'flex', gap: '30px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#636e72' }}>
                    <FaPhone color="#F29F05" /> +1 (555) 123-4567
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#636e72' }}>
                    <FaMapMarkerAlt color="#F29F05" /> 123 Food Street, NY
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
