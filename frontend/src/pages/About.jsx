import { FaUtensils, FaListAlt, FaShoppingCart, FaLock, FaCreditCard, FaBoxOpen } from 'react-icons/fa';

const About = () => {
  return (
    <div className="about-page" style={{ padding: '50px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header Section */}
      <div className="about-header" style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 style={{ fontFamily: 'Playfair Display', fontSize: '3.5rem', marginBottom: '20px', color: '#333' }}>About Foody</h1>
        <p style={{ color: '#666', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto', lineHeight: '1.8' }}>
          Welcome to Foody, a multi-restaurant food ordering platform designed to make online food ordering simple, convenient, and efficient. Users can explore multiple restaurants, browse menus, add items to a single cart, and complete their orders through a secure payment gateway.
        </p>
      </div>

      {/* Story Section */}
      <div className="our-story" style={{ background: '#f8f9fa', padding: '50px 30px', borderRadius: '20px', marginBottom: '60px' }}>
        <h2 style={{ fontFamily: 'Playfair Display', fontSize: '2.5rem', textAlign: 'center', marginBottom: '30px', color: '#333' }}>Our Story</h2>
        <p style={{ color: '#666', fontSize: '1.1rem', lineHeight: '1.8', maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          Foody was developed as a full-stack web application to provide a seamless food ordering experience through a single platform. The system brings multiple restaurants together, allowing customers to explore different menus, manage their cart, place orders, and make secure online payments.
        </p>
      </div>

      {/* Values Grid */}
      <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', marginBottom: '60px' }}>
        <div className="about-card" style={{ textAlign: 'center', padding: '35px 25px', background: '#fff', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)', transition: 'transform 0.3s' }}>
          <div style={{ fontSize: '3.5rem', color: '#d32f2f', marginBottom: '20px' }}><FaUtensils /></div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '15px', color: '#333' }}>Multiple Restaurants</h3>
          <p style={{ color: '#777', lineHeight: '1.6' }}>Explore food from multiple restaurants in one platform.</p>
        </div>
        
        <div className="about-card" style={{ textAlign: 'center', padding: '35px 25px', background: '#fff', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
          <div style={{ fontSize: '3.5rem', color: '#4caf50', marginBottom: '20px' }}><FaListAlt /></div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '15px', color: '#333' }}>Easy Menu Browsing</h3>
          <p style={{ color: '#777', lineHeight: '1.6' }}>Browse restaurant menus and choose your favorite dishes easily.</p>
        </div>
        
        <div className="about-card" style={{ textAlign: 'center', padding: '35px 25px', background: '#fff', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
          <div style={{ fontSize: '3.5rem', color: '#ff9800', marginBottom: '20px' }}><FaShoppingCart /></div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '15px', color: '#333' }}>Unified Cart</h3>
          <p style={{ color: '#777', lineHeight: '1.6' }}>Manage selected food items conveniently in a single cart.</p>
        </div>
        
        <div className="about-card" style={{ textAlign: 'center', padding: '35px 25px', background: '#fff', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
          <div style={{ fontSize: '3.5rem', color: '#e91e63', marginBottom: '20px' }}><FaLock /></div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '15px', color: '#333' }}>Secure Authentication</h3>
          <p style={{ color: '#777', lineHeight: '1.6' }}>Secure login and registration for users and restaurant partners.</p>
        </div>
        
        <div className="about-card" style={{ textAlign: 'center', padding: '35px 25px', background: '#fff', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
          <div style={{ fontSize: '3.5rem', color: '#f1c40f', marginBottom: '20px' }}><FaCreditCard /></div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '15px', color: '#333' }}>Razorpay Payment</h3>
          <p style={{ color: '#777', lineHeight: '1.6' }}>Make secure online payments using Razorpay integration.</p>
        </div>
        
        <div className="about-card" style={{ textAlign: 'center', padding: '35px 25px', background: '#fff', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
          <div style={{ fontSize: '3.5rem', color: '#2196f3', marginBottom: '20px' }}><FaBoxOpen /></div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '15px', color: '#333' }}>Order Tracking</h3>
          <p style={{ color: '#777', lineHeight: '1.6' }}>Track your order status from placement to completion.</p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="stats-section" style={{ background: 'linear-gradient(135deg, #d32f2f 0%, #c62828 100%)', padding: '50px 30px', borderRadius: '20px', color: '#fff', marginBottom: '60px' }}>
        <h2 style={{ fontFamily: 'Playfair Display', fontSize: '2.5rem', textAlign: 'center', marginBottom: '40px' }}>Platform Highlights</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px', textAlign: 'center' }}>
          <div>
            <h3 style={{ fontSize: '1.4rem', lineHeight: 1.2, fontWeight: 'bold', marginBottom: '10px' }}>Multiple Restaurants</h3>
            <p style={{ fontSize: '1.1rem', opacity: '0.9' }}>Explore multiple restaurants through a single platform.</p>
          </div>
          <div>
            <h3 style={{ fontSize: '1.4rem', lineHeight: 1.2, fontWeight: 'bold', marginBottom: '10px' }}>Single Cart</h3>
            <p style={{ fontSize: '1.1rem', opacity: '0.9' }}>Manage selected food items conveniently in one cart.</p>
          </div>
          <div>
            <h3 style={{ fontSize: '1.4rem', lineHeight: 1.2, fontWeight: 'bold', marginBottom: '10px' }}>Secure Payment</h3>
            <p style={{ fontSize: '1.1rem', opacity: '0.9' }}>Complete online payments using Razorpay integration.</p>
          </div>
          <div>
            <h3 style={{ fontSize: '1.4rem', lineHeight: 1.2, fontWeight: 'bold', marginBottom: '10px' }}>Order Tracking</h3>
            <p style={{ fontSize: '1.1rem', opacity: '0.9' }}>Track the order status from placement to completion.</p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="mission-section" style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 style={{ fontFamily: 'Playfair Display', fontSize: '2.5rem', marginBottom: '25px', color: '#333' }}>Our Mission</h2>
        <p style={{ color: '#666', fontSize: '1.15rem', lineHeight: '1.8', maxWidth: '800px', margin: '0 auto' }}>
          Our mission is to provide a simple and convenient multi-restaurant food ordering experience through a single platform. The system allows users to explore restaurants, browse menus, manage their cart, place orders, make secure online payments, and track order status.
        </p>
      </div>
    </div>
  );
};

export default About;
