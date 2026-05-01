import { FaUtensils, FaLeaf, FaAward, FaShippingFast, FaHeart, FaStar } from 'react-icons/fa';

const About = () => {
  return (
    <div className="about-page" style={{ padding: '50px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header Section */}
      <div className="about-header" style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 style={{ fontFamily: 'Playfair Display', fontSize: '3.5rem', marginBottom: '20px', color: '#333' }}>About Foody</h1>
        <p style={{ color: '#666', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto', lineHeight: '1.8' }}>
          Welcome to Foody - India's fastest-growing multi-restaurant food delivery platform. We connect you with the finest restaurants in Chennai and beyond, bringing delicious meals right to your doorstep.
        </p>
      </div>

      {/* Story Section */}
      <div className="our-story" style={{ background: '#f8f9fa', padding: '50px 30px', borderRadius: '20px', marginBottom: '60px' }}>
        <h2 style={{ fontFamily: 'Playfair Display', fontSize: '2.5rem', textAlign: 'center', marginBottom: '30px', color: '#333' }}>Our Story</h2>
        <p style={{ color: '#666', fontSize: '1.1rem', lineHeight: '1.8', maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          Founded in 2020 in Chennai, Foody was born from a simple idea: to make quality food accessible to everyone. What started as a small team with a passion for food has grown into a platform serving thousands of happy customers across Tamil Nadu. We partner with the best local restaurants and cloud kitchens to offer you an incredible variety of cuisines - from traditional South Indian delicacies to global flavors.
        </p>
      </div>

      {/* Values Grid */}
      <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', marginBottom: '60px' }}>
        <div className="about-card" style={{ textAlign: 'center', padding: '35px 25px', background: '#fff', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)', transition: 'transform 0.3s' }}>
          <div style={{ fontSize: '3.5rem', color: '#d32f2f', marginBottom: '20px' }}><FaUtensils /></div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '15px', color: '#333' }}>Expert Chefs</h3>
          <p style={{ color: '#777', lineHeight: '1.6' }}>Partner restaurants with expert chefs trained in culinary excellence, bringing authentic flavors and innovative dishes to your table.</p>
        </div>
        
        <div className="about-card" style={{ textAlign: 'center', padding: '35px 25px', background: '#fff', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
          <div style={{ fontSize: '3.5rem', color: '#4caf50', marginBottom: '20px' }}><FaLeaf /></div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '15px', color: '#333' }}>Fresh Ingredients</h3>
          <p style={{ color: '#777', lineHeight: '1.6' }}>We ensure all our partner restaurants use farm-fresh, locally sourced ingredients for the highest quality and taste.</p>
        </div>
        
        <div className="about-card" style={{ textAlign: 'center', padding: '35px 25px', background: '#fff', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
          <div style={{ fontSize: '3.5rem', color: '#ff9800', marginBottom: '20px' }}><FaShippingFast /></div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '15px', color: '#333' }}>Fast Delivery</h3>
          <p style={{ color: '#777', lineHeight: '1.6' }}>Average delivery time of 30 minutes. Your food arrives hot, fresh, and ready to enjoy with our efficient delivery network.</p>
        </div>
        
        <div className="about-card" style={{ textAlign: 'center', padding: '35px 25px', background: '#fff', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
          <div style={{ fontSize: '3.5rem', color: '#e91e63', marginBottom: '20px' }}><FaHeart /></div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '15px', color: '#333' }}>Customer Love</h3>
          <p style={{ color: '#777', lineHeight: '1.6' }}>Over 50,000+ satisfied customers and a 4.8-star rating. Your satisfaction is our top priority.</p>
        </div>
        
        <div className="about-card" style={{ textAlign: 'center', padding: '35px 25px', background: '#fff', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
          <div style={{ fontSize: '3.5rem', color: '#f1c40f', marginBottom: '20px' }}><FaAward /></div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '15px', color: '#333' }}>Award Winning</h3>
          <p style={{ color: '#777', lineHeight: '1.6' }}>Recognized as Chennai's Best Food Delivery Platform 2023-2025 by Food & Hospitality Awards.</p>
        </div>
        
        <div className="about-card" style={{ textAlign: 'center', padding: '35px 25px', background: '#fff', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
          <div style={{ fontSize: '3.5rem', color: '#2196f3', marginBottom: '20px' }}><FaStar /></div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '15px', color: '#333' }}>Quality Assured</h3>
          <p style={{ color: '#777', lineHeight: '1.6' }}>Every restaurant is verified and hygiene-certified. We maintain strict quality standards for your safety.</p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="stats-section" style={{ background: 'linear-gradient(135deg, #d32f2f 0%, #c62828 100%)', padding: '50px 30px', borderRadius: '20px', color: '#fff', marginBottom: '60px' }}>
        <h2 style={{ fontFamily: 'Playfair Display', fontSize: '2.5rem', textAlign: 'center', marginBottom: '40px' }}>Foody By Numbers</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px', textAlign: 'center' }}>
          <div>
            <h3 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '10px' }}>500+</h3>
            <p style={{ fontSize: '1.1rem', opacity: '0.9' }}>Partner Restaurants</p>
          </div>
          <div>
            <h3 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '10px' }}>50K+</h3>
            <p style={{ fontSize: '1.1rem', opacity: '0.9' }}>Happy Customers</p>
          </div>
          <div>
            <h3 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '10px' }}>1M+</h3>
            <p style={{ fontSize: '1.1rem', opacity: '0.9' }}>Orders Delivered</p>
          </div>
          <div>
            <h3 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '10px' }}>4.8★</h3>
            <p style={{ fontSize: '1.1rem', opacity: '0.9' }}>Average Rating</p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="mission-section" style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 style={{ fontFamily: 'Playfair Display', fontSize: '2.5rem', marginBottom: '25px', color: '#333' }}>Our Mission</h2>
        <p style={{ color: '#666', fontSize: '1.15rem', lineHeight: '1.8', maxWidth: '800px', margin: '0 auto' }}>
          To revolutionize food delivery in India by making delicious, quality meals accessible to everyone. We're committed to supporting local restaurants, creating jobs, and bringing joy to every meal delivered. Whether it's a quick lunch, family dinner, or late-night craving, Foody is here for you 24/7.
        </p>
      </div>
    </div>
  );
};

export default About;
