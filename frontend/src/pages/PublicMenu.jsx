import { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';

const PublicMenu = () => {
  const menuItems = [
    { id: 1, name: 'Pappardelle', desc: 'With Vegetables', price: 350, img: 'https://images.unsplash.com/photo-1626844131082-256783844137?q=80&w=1935&auto=format&fit=crop' },
    { id: 2, name: 'Ravioli Stuffed', desc: 'With Pesto Sauce', price: 350, img: 'https://images.unsplash.com/photo-1587393855524-087f83d95bc9?q=80&w=1960&auto=format&fit=crop' },
    { id: 3, name: 'Margherita Pizza', desc: 'Classic Cheese', price: 250, img: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=1960&auto=format&fit=crop' },
    { id: 4, name: 'Grilled Salmon', desc: 'With Asparagus', price: 450, img: 'https://images.unsplash.com/photo-1467003909585-2f8a7270028d?q=80&w=1960&auto=format&fit=crop' },
    { id: 5, name: 'Caesar Salad', desc: 'Fresh & Crunchy', price: 150, img: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?q=80&w=1960&auto=format&fit=crop' },
    { id: 6, name: 'Beef Burger', desc: 'Juicy Patty', price: 180, img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1960&auto=format&fit=crop' },
  ];

  return (
    <div className="public-menu-page" style={{ padding: '50px', maxWidth: '1400px', margin: '0 auto' }}>
      <h1 style={{ fontFamily: 'Playfair Display', fontSize: '3rem', textAlign: 'center', marginBottom: '50px' }}>Our Menu</h1>
      
      <div className="menu-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '40px' }}>
        {menuItems.map(item => (
            <div key={item.id} className="menu-card" style={{ background: '#fff', borderRadius: '20px', padding: '20px', textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', marginTop: '50px' }}>
                <div className="card-image-wrapper" style={{ width: '140px', height: '140px', borderRadius: '50%', overflow: 'hidden', margin: '-70px auto 20px', boxShadow: '0 5px 15px rgba(0,0,0,0.2)' }}>
                    <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div className="card-content">
                    <div style={{ position: 'relative' }}>
                        <h3 style={{ fontFamily: 'Playfair Display', fontSize: '1.2rem', marginBottom: '5px' }}>{item.name}</h3>
                        <button style={{ position: 'absolute', top: '-40px', right: '-10px', background: '#1a1a1a', color: '#fff', width: '35px', height: '35px', borderRadius: '50%', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                            <FaShoppingCart />
                        </button>
                    </div>
                    <p style={{ fontSize: '0.9rem', color: '#777', marginBottom: '15px' }}>{item.desc}</p>
                    <div style={{ fontWeight: '700', fontSize: '1.1rem', color: '#333' }}>₹{item.price}</div>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default PublicMenu;
