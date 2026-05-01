import { FaCheckCircle, FaCreditCard, FaPaypal } from 'react-icons/fa';

const paymentOptions = [
    {
        id: 'card',
        label: 'Credit Card',
        primary: '#1F2937',
        accent: '#4B5563'
    },
    {
        id: 'paypal',
        label: 'PayPal',
        primary: '#003087',
        accent: '#009CDE'
    },
    {
        id: 'google',
        label: 'Google Pay',
        primary: '#4285F4',
        accent: '#0F9D58'
    }
];

const getMethodLogo = (id) => {
    if (id === 'paypal') {
        return (
            <div className="relative h-10 w-10 rounded-xl overflow-hidden" aria-hidden="true">
                <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(135deg, #003087 0%, #009CDE 100%)' }}
                />
                <span className="absolute inset-0 flex items-center justify-center text-white text-sm font-bold">
                    <FaPaypal />
                </span>
            </div>
        );
    }

    if (id === 'google') {
        return (
            <div className="h-10 w-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center gap-1" aria-hidden="true">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: '#4285F4' }} />
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: '#DB4437' }} />
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: '#F4B400' }} />
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: '#0F9D58' }} />
            </div>
        );
    }

    return (
        <div
            className="h-10 w-10 rounded-xl border border-white/25 flex items-center justify-center text-slate-100"
            style={{ background: 'linear-gradient(145deg, #111827 0%, #374151 100%)' }}
            aria-hidden="true"
        >
            <FaCreditCard />
        </div>
    );
};

const PaymentMethodSelector = ({ paymentMethod, onSelectMethod }) => {
    return (
        <section style={{ marginBottom: '32px', borderRadius: '16px', background: '#F5F7FB', padding: '20px' }} aria-label="Payment method selection">
            <h3 style={{ margin: '0 0 16px', fontSize: '1.2rem', fontWeight: 700, color: '#0f172a' }}>Payment Method</h3>

            <div
                role="radiogroup"
                aria-label="Payment methods"
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '16px'
                }}
            >
                {paymentOptions.map((option) => {
                    const isActive = paymentMethod === option.id;
                    const cardBackground = '#FFFFFF';
                    const borderColor = isActive ? option.accent : '#E2E8F0';
                    const textColor = isActive ? option.primary : '#334155';
                    const glowColor = isActive ? `${option.accent}55` : 'rgba(0,0,0,0.08)';

                    return (
                        <button
                            key={option.id}
                            type="button"
                            role="radio"
                            aria-checked={isActive}
                            onClick={() => onSelectMethod(option.id)}
                            style={{
                                position: 'relative',
                                background: cardBackground,
                                border: `2px solid ${borderColor}`,
                                borderRadius: '16px',
                                padding: '24px 20px',
                                textAlign: 'center',
                                cursor: 'pointer',
                                transform: isActive ? 'scale(1.05)' : 'scale(1)',
                                transition: 'all 0.25s ease',
                                boxShadow: isActive ? `0 10px 22px ${glowColor}` : '0 4px 12px rgba(0,0,0,0.08)',
                                minHeight: '140px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center'
                            }}
                            onMouseEnter={(e) => {
                                if (!isActive) {
                                    e.currentTarget.style.transform = 'scale(1.03)';
                                    e.currentTarget.style.boxShadow = '0 6px 18px rgba(0,0,0,0.12)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!isActive) {
                                    e.currentTarget.style.transform = 'scale(1)';
                                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                                }
                            }}
                        >
                            {isActive && (
                                <span style={{ position: 'absolute', right: '10px', top: '8px', fontSize: '18px', color: option.accent }} aria-hidden="true">
                                    <FaCheckCircle />
                                </span>
                            )}
                            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>{getMethodLogo(option.id)}</div>
                            <p style={{ margin: 0, color: textColor, fontWeight: 600, fontSize: '0.96rem' }}>{option.label}</p>
                        </button>
                    );
                })}
            </div>

        </section>
    );
};

export default PaymentMethodSelector;
