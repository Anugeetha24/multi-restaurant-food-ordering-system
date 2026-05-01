import { useState } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';

const Upgrade = () => {
  const [selectedPlan, setSelectedPlan] = useState('Free');

  const plans = [
    {
      name: 'Free',
      price: '₹0',
      period: '/month',
      features: ['Access to basic menu', 'Standard delivery', 'Email support'],
      notIncluded: ['Premium dishes', 'Priority delivery', '24/7 support'],
      color: '#a4b0be'
    },
    {
      name: 'Pro',
      price: '₹499',
      period: '/month',
      features: ['Access to full menu', 'Free delivery on orders > ₹500', 'Priority email support', 'No ads'],
      notIncluded: ['24/7 support', 'Exclusive chef events'],
      color: '#F29F05',
      popular: true
    },
    {
      name: 'Premium',
      price: '₹999',
      period: '/month',
      features: ['Access to full menu', 'Free delivery on all orders', '24/7 Priority support', 'Exclusive chef events', 'No ads'],
      notIncluded: [],
      color: '#2d3436'
    }
  ];

  return (
    <div className="upgrade-page" style={{ padding: '40px 20px', textAlign: 'center' }}>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Upgrade Your Plan</h2>
      <p style={{ color: '#636e72', marginBottom: '50px' }}>Choose the best plan that fits your needs.</p>

      <div className="plans-container" style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' }}>
        {plans.map((plan) => (
            <div 
                key={plan.name} 
                className="plan-card" 
                onClick={() => setSelectedPlan(plan.name)}
                style={{ 
                    background: '#fff', 
                    borderRadius: '20px', 
                    padding: '40px', 
                    width: '300px', 
                    boxShadow: plan.popular ? '0 10px 30px rgba(242, 159, 5, 0.3)' : '0 5px 15px rgba(0,0,0,0.05)',
                    border: selectedPlan === plan.name ? `3px solid ${plan.color}` : '3px solid transparent',
                    position: 'relative',
                    cursor: 'pointer',
                    transform: plan.popular ? 'scale(1.05)' : 'scale(1)',
                    transition: 'all 0.3s ease'
                }}
            >
                {plan.popular && (
                    <span style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)', background: '#F29F05', color: '#fff', padding: '5px 15px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>MOST POPULAR</span>
                )}
                <h3 style={{ fontSize: '1.5rem', marginBottom: '10px', color: plan.color }}>{plan.name}</h3>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline', marginBottom: '30px' }}>
                    <span style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{plan.price}</span>
                    <span style={{ color: '#636e72' }}>{plan.period}</span>
                </div>

                <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left', marginBottom: '30px' }}>
                    {plan.features.map((feature, i) => (
                        <li key={i} style={{ marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <FaCheck color="#2ecc71" /> {feature}
                        </li>
                    ))}
                    {plan.notIncluded.map((feature, i) => (
                        <li key={i} style={{ marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px', color: '#b2bec3' }}>
                            <FaTimes color="#b2bec3" /> {feature}
                        </li>
                    ))}
                </ul>

                <button style={{ 
                    width: '100%', 
                    padding: '15px', 
                    borderRadius: '10px', 
                    border: 'none', 
                    background: plan.name === 'Free' ? '#dfe6e9' : plan.color, 
                    color: plan.name === 'Free' ? '#2d3436' : '#fff', 
                    fontWeight: 'bold', 
                    fontSize: '1rem', 
                    cursor: 'pointer' 
                }}>
                    {plan.name === 'Free' ? 'Current Plan' : 'Upgrade Now'}
                </button>
            </div>
        ))}
      </div>
    </div>
  );
};

export default Upgrade;
