import { useState, useContext, useEffect } from 'react';
import CartContext from '../context/CartContext';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import axios from 'axios';
import PaymentMethodSelector from '../components/PaymentMethodSelector';

const Checkout = () => {
    const { cartItems, clearCart } = useContext(CartContext);
    const { user: authUser, logout, updateUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState('card');
    
    // Delivery Address State
    const [homeAddress, setHomeAddress] = useState('');
    const [doorNumber, setDoorNumber] = useState('');
    const [landmark, setLandmark] = useState('');
    const [district, setDistrict] = useState('');
    const [pincode, setPincode] = useState('');

    // Card Payment State
    const [cardNumber, setCardNumber] = useState('');
    const [cardHolderName, setCardHolderName] = useState('');
    const [cardExpiry, setCardExpiry] = useState('');
    const [cardCvv, setCardCvv] = useState('');

    // Payment Processing States
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentResult, setPaymentResult] = useState({
        visible: false,
        success: false,
        paymentId: '',
        orderId: '',
        amount: 0,
        message: ''
    });
    const [countdown, setCountdown] = useState(4);
    const [isRazorpayReady, setIsRazorpayReady] = useState(false);

    const processingVisible = isProcessing && !paymentResult.visible;

    // Razorpay script effect
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        script.onload = () => setIsRazorpayReady(true);
        script.onerror = () => setIsRazorpayReady(false);
        document.body.appendChild(script);

        return () => {
            setIsRazorpayReady(false);
            document.body.removeChild(script);
        };
    }, []);

    // Countdown and redirect effect for payment success
    useEffect(() => {
        if (!paymentResult.visible) return;

        setCountdown(4);
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        const redirectTimer = setTimeout(() => {
            setPaymentResult((prev) => ({ ...prev, visible: false }));
            if (paymentResult.success) {
                navigate('/orders');
            }
        }, 4000);

        return () => {
            clearInterval(timer);
            clearTimeout(redirectTimer);
        };
    }, [paymentResult.visible, navigate, paymentResult.success]);

    const total = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);
    const deliveryFee = 40;
    const finalTotal = total + deliveryFee;
    const cardNumberDigits = cardNumber.replace(/\D/g, '');
    const cvvDigits = cardCvv.replace(/\D/g, '');

    const formatCardNumber = (value) => {
        const digits = value.replace(/\D/g, '').slice(0, 16);
        return digits.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
    };

    const formatCardExpiry = (value) => {
        const digits = value.replace(/\D/g, '').slice(0, 4);
        if (digits.length <= 2) return digits;
        return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    };

    const createOrdersAfterPayment = async (paymentId, config) => {
        const ordersByRestaurant = {};
        cartItems.forEach(item => {
            if (!ordersByRestaurant[item.restaurant]) {
                ordersByRestaurant[item.restaurant] = [];
            }
            ordersByRestaurant[item.restaurant].push({
                menuItem: item._id,
                quantity: item.qty,
                price: item.price
            });
        });

        for (const restaurantId in ordersByRestaurant) {
            const items = ordersByRestaurant[restaurantId];
            const orderTotal = items.reduce((acc, item) => acc + item.quantity * item.price, 0);

            await axios.post('/api/orders', {
                restaurantId,
                items,
                totalAmount: orderTotal,
                paymentStatus: 'Paid',
                transactionId: paymentId
            }, config);
        }
    };

    const completeSuccessfulPayment = async (paymentId, orderId = '', method = paymentMethod) => {
        const config = { headers: { Authorization: `Bearer ${authUser.token}` } };
        await createOrdersAfterPayment(paymentId, config);
        clearCart();

        setPaymentResult({
            visible: true,
            success: true,
            paymentId,
            orderId,
            amount: finalTotal,
            message: `${method.toUpperCase()} payment successful! Redirecting to your orders...`
        });
    };

    const validateDeliveryAddress = () => {
        if (!doorNumber || !homeAddress || !district || !pincode) {
            alert('Please fill in all required delivery address fields (House No, Home Address, District, Pincode)');
            return false;
        }

        if (pincode.length !== 6) {
            alert('Please enter a valid 6-digit pincode');
            return false;
        }

        return true;
    };

    const validateCardDetails = () => {
        if (cardNumberDigits.length !== 16) {
            alert('Please enter a valid 16-digit card number');
            return false;
        }
        if (!cardHolderName.trim()) {
            alert('Please enter card holder name');
            return false;
        }
        if (!/^\d{2}\/\d{2}$/.test(cardExpiry)) {
            alert('Please enter card expiry in MM/YY format');
            return false;
        }
        if (cvvDigits.length !== 3) {
            alert('Please enter a valid 3-digit CVV');
            return false;
        }

        return true;
    };

    const handlePayClick = async () => {
        setIsProcessing(true);

        try {
            if (!authUser) {
                navigate('/login', { state: { from: '/checkout' } });
                return;
            }

            if (cartItems.length === 0) {
                alert('Please add at least one item to cart before payment');
                setIsProcessing(false);
                return;
            }

            if (!validateDeliveryAddress()) {
                setIsProcessing(false);
                return;
            }

            if (paymentMethod === 'card' && !validateCardDetails()) {
                setIsProcessing(false);
                return;
            }

            if (!isRazorpayReady || !window.Razorpay) {
                throw new Error('Razorpay is still loading. Please try again in a second.');
            }

            const config = { headers: { Authorization: `Bearer ${authUser.token}` } };

            // Create Razorpay Order
            const { data: orderData } = await axios.post('/api/payment/create-order', {
                amount: finalTotal
            }, config);

            const { data: paymentConfig } = await axios.get('/api/payment/config');

            // Razorpay payment options
            const options = {
                key: paymentConfig?.key || 'rzp_test_1DP5mmOlF5G0m3',
                amount: orderData.amount, // Amount in paise
                currency: orderData.currency,
                order_id: orderData.orderId,
                name: 'Foody App',
                description: `Order for ₹${finalTotal}`,
                handler: async (response) => {
                    try {
                        // Verify payment with backend
                        const verifyResponse = await axios.post('/api/payment/verify', {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature
                        }, config);
                        console.log('Razorpay verify response:', verifyResponse.data);

                        if (verifyResponse.data.success) {
                            if (Number.isFinite(Number(verifyResponse.data.walletBalance))) {
                                await updateUser({ walletBalance: verifyResponse.data.walletBalance });
                            }

                            await completeSuccessfulPayment(
                                response.razorpay_payment_id,
                                response.razorpay_order_id,
                                'card'
                            );
                            setIsProcessing(false);
                        } else {
                            throw new Error(verifyResponse.data.message || 'Failed to verify payment');
                        }
                    } catch (error) {
                        console.error('Payment verification error:', error);
                        const verificationErrorMessage = error.response?.data?.message
                            || error.response?.data?.error
                            || error.message
                            || 'Payment verification failed. Please contact support.';
                        setPaymentResult({
                            visible: true,
                            success: false,
                            paymentId: response.razorpay_payment_id || '',
                            orderId: response.razorpay_order_id || '',
                            amount: finalTotal,
                            message: verificationErrorMessage
                        });
                        setIsProcessing(false);
                    }
                },
                prefill: {
                    name: authUser.name || '',
                    email: authUser.email || '',
                    contact: '9999999999'
                },
                modal: {
                    ondismiss: () => {
                        setIsProcessing(false);
                        setPaymentResult({
                            visible: true,
                            success: false,
                            paymentId: '',
                            orderId: '',
                            amount: finalTotal,
                            message: 'Payment cancelled by user.'
                        });
                    }
                },
                theme: {
                    color: '#F29F05'
                }
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();
        } catch (error) {
            console.error('Payment error:', error);
            setIsProcessing(false);

            if (error.response?.status === 401) {
                alert('Session expired. Please login again.');
                logout();
                navigate('/login', { state: { from: '/checkout' } });
            } else {
                setPaymentResult({
                    visible: true,
                    success: false,
                    paymentId: '',
                    orderId: '',
                    amount: finalTotal,
                    message: error.response?.data?.message || error.response?.data?.error || error.message || 'Payment initiation failed. Please try again.'
                });
            }
        }
    };

  return (
    <div className="checkout-page" style={{ padding: '20px', background: '#F5F7FB', minHeight: '100vh' }}>
      <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer', marginBottom: '20px', fontSize: '1rem', color: '#636e72' }}>
        <FaArrowLeft /> Back
      </button>
      
      <h2 style={{ marginBottom: '30px' }}>Checkout</h2>

      <div className="checkout-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
        {/* Left Column: Delivery Address & Payment Details */}
        <div className="payment-details">
            {/* Delivery Address Section */}
            <h3 style={{ marginBottom: '20px' }}>Delivery Address</h3>
            <div className="address-form" style={{ background: '#fff', padding: '30px', borderRadius: '20px', marginBottom: '30px' }}>
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '10px', color: '#000', fontWeight: 'bold' }}>House No/ Building Name</label>
                    <input 
                        type="text" 
                        value={doorNumber}
                        onChange={(e) => setDoorNumber(e.target.value)}
                        style={{ width: '100%', padding: '15px', borderRadius: '10px', border: '1px solid #dfe6e9', outline: 'none' }} 
                    />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '10px', color: '#000', fontWeight: 'bold' }}>Home Address</label>
                    <input 
                        type="text" 
                        value={homeAddress}
                        onChange={(e) => setHomeAddress(e.target.value)}
                        style={{ width: '100%', padding: '15px', borderRadius: '10px', border: '1px solid #dfe6e9', outline: 'none' }} 
                    />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '10px', color: '#000', fontWeight: 'bold' }}>Landmark</label>
                    <input 
                        type="text" 
                        placeholder="e.g., Near Bus Stop, Opposite Mall" 
                        value={landmark}
                        onChange={(e) => setLandmark(e.target.value)}
                        style={{ width: '100%', padding: '15px', borderRadius: '10px', border: '1px solid #dfe6e9', outline: 'none' }} 
                    />
                </div>
                <div style={{ display: 'flex', gap: '20px' }}>
                    <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', marginBottom: '10px', color: '#000', fontWeight: 'bold' }}>District</label>
                        <input 
                            type="text" 
                            value={district}
                            onChange={(e) => setDistrict(e.target.value)}
                            style={{ width: '100%', padding: '15px', borderRadius: '10px', border: '1px solid #dfe6e9', outline: 'none' }} 
                        />
                    </div>
                    <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', marginBottom: '10px', color: '#000', fontWeight: 'bold' }}>Pincode</label>
                        <input 
                            type="text" 
                            placeholder="6 digit pincode" 
                            value={pincode}
                            onChange={(e) => setPincode(e.target.value)}
                            maxLength="6"
                            pattern="[0-9]{6}"
                            style={{ width: '100%', padding: '15px', borderRadius: '10px', border: '1px solid #dfe6e9', outline: 'none' }} 
                        />
                    </div>
                </div>
            </div>

            {/* Payment Method Section */}
            <PaymentMethodSelector
                paymentMethod={paymentMethod}
                onSelectMethod={setPaymentMethod}
            />

            {paymentMethod === 'card' && (
                <div style={{ background: '#fff', padding: '20px', borderRadius: '15px', marginBottom: '20px' }}>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#2d3436' }}>Card Number</label>
                        <input
                            type="text"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                            placeholder="1234 5678 9012 3456"
                            style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #dfe6e9', outline: 'none' }}
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#2d3436' }}>Card Holder Name</label>
                        <input
                            type="text"
                            value={cardHolderName}
                            onChange={(e) => setCardHolderName(e.target.value)}
                            placeholder="Name on card"
                            style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #dfe6e9', outline: 'none' }}
                        />
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#2d3436' }}>Expiry (MM/YY)</label>
                            <input
                                type="text"
                                value={cardExpiry}
                                onChange={(e) => setCardExpiry(formatCardExpiry(e.target.value))}
                                placeholder="MM/YY"
                                style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #dfe6e9', outline: 'none' }}
                            />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#2d3436' }}>CVV</label>
                            <input
                                type="password"
                                value={cardCvv}
                                onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                                placeholder="123"
                                style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #dfe6e9', outline: 'none' }}
                            />
                        </div>
                    </div>
                </div>
            )}

        </div>

        {/* Right Column: Order Summary */}
        <div className="order-summary" style={{ background: '#fff', padding: '30px', borderRadius: '20px', height: 'fit-content' }}>
            <h3 style={{ marginBottom: '20px' }}>Order Summary</h3>
            <div className="summary-items" style={{ marginBottom: '20px', maxHeight: '300px', overflowY: 'auto' }}>
                {cartItems.map(item => (
                    <div key={item._id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', fontSize: '0.9rem' }}>
                        <span>{item.qty}x {item.name}</span>
                        <span style={{ fontWeight: 'bold' }}>₹{(item.price * item.qty).toFixed(2)}</span>
                    </div>
                ))}
            </div>
            <div style={{ borderTop: '1px dashed #dfe6e9', paddingTop: '15px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', color: '#636e72' }}>
                    <span>Subtotal</span>
                    <span>₹{total.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', color: '#636e72' }}>
                    <span>Delivery</span>
                    <span>₹{deliveryFee.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 'bold', marginTop: '15px' }}>
                    <span>Total</span>
                    <span>₹{finalTotal.toFixed(2)}</span>
                </div>
            </div>
            <button
                onClick={handlePayClick}
                disabled={isProcessing}
                style={{
                    width: '100%',
                    background: '#F29F05',
                    color: '#fff',
                    padding: '15px',
                    borderRadius: '15px',
                    border: 'none',
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    cursor: isProcessing ? 'not-allowed' : 'pointer',
                    opacity: isProcessing ? 0.7 : 1,
                    transition: 'background 0.2s ease-in-out'
                }}
            >
                {isProcessing ? 'Processing...' : 'Pay Now'}
            </button>
        </div>
      </div>

            {processingVisible && (
                <div
                    role="status"
                    aria-live="polite"
                    aria-busy="true"
                    style={{
                        position: 'fixed',
                        inset: 0,
                        zIndex: 9998,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'rgba(15, 23, 42, 0.72)',
                        backdropFilter: 'blur(8px)',
                        padding: '24px'
                    }}
                >
                    <div
                        style={{
                            width: '100%',
                            maxWidth: '420px',
                            borderRadius: '28px',
                            padding: '40px 28px',
                            textAlign: 'center',
                            background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
                            boxShadow: '0 28px 80px rgba(0, 0, 0, 0.35)',
                            border: '1px solid rgba(255, 255, 255, 0.45)'
                        }}
                    >
                        <div
                            style={{
                                width: '96px',
                                height: '96px',
                                margin: '0 auto 20px',
                                borderRadius: '50%',
                                border: '8px solid rgba(242, 159, 5, 0.18)',
                                borderTopColor: '#F29F05',
                                borderRightColor: '#F8C66D',
                                display: 'grid',
                                placeItems: 'center',
                                animation: 'checkout-spin 1s linear infinite',
                                background: 'radial-gradient(circle at 35% 35%, #fff7db 0%, #f8c66d 52%, #d97706 100%)'
                            }}
                        >
                            <span style={{ fontSize: '2rem' }}>₹</span>
                        </div>

                        <h3 style={{ margin: '0 0 10px', fontSize: '1.5rem', color: '#0f172a' }}>Confirming Payment...</h3>
                        <p style={{ margin: 0, color: '#475569', lineHeight: 1.6 }}>
                            Please keep this page open while we verify your Razorpay payment.
                        </p>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes checkout-spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>

            {paymentResult.visible && (
        <div
            role="dialog"
            aria-modal="true"
            style={{
                position: 'fixed',
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                background: 'rgba(0, 0, 0, 0.45)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 9999,
                padding: '20px'
            }}
        >
            <div
                style={{
                    width: '100%',
                    maxWidth: '860px',
                    borderRadius: '14px',
                    overflow: 'hidden',
                    boxShadow: '0 24px 64px rgba(0,0,0,0.35)',
                    border: '3px solid #8A5E00',
                    display: 'grid',
                    gridTemplateColumns: '0.95fr 1.45fr',
                    minHeight: '430px'
                }}
            >
                <div
                    style={{
                        background: 'linear-gradient(160deg, #A96B00 0%, #8B5600 45%, #6F4300 100%)',
                        color: '#fff',
                        padding: '28px 20px 20px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        position: 'relative'
                    }}
                >
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
                            <span style={{ fontWeight: 700, fontSize: '1.05rem' }}>Foody App</span>
                        </div>

                        <div style={{ background: '#f3e8d2', borderRadius: '8px', padding: '10px 12px', color: '#1f2937' }}>
                            <p style={{ margin: 0, fontSize: '0.74rem', color: '#6b7280' }}>Price Summary</p>
                            <p style={{ margin: '2px 0 0', fontSize: '1.9rem', fontWeight: 800, color: '#111827' }}>₹{paymentResult.amount.toFixed(0)}</p>
                        </div>

                        <div style={{ marginTop: '10px', background: 'rgba(255,255,255,0.2)', borderRadius: '8px', padding: '8px 10px', fontSize: '0.8rem' }}>
                            Using as +91 99999 99999
                        </div>
                    </div>

                    <div style={{ fontSize: '0.75rem', opacity: 0.9, textAlign: 'left' }}>Secured by Foody Pay</div>
                </div>

                <div
                    style={{
                        background: paymentResult.success ? '#07A65D' : '#DC2626',
                        color: '#fff',
                        padding: '36px 30px 24px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}
                >
                    <div style={{ textAlign: 'center' }}>
                        {paymentResult.success ? (
                            <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.92 }}>You will be redirected in {countdown} second{countdown !== 1 ? 's' : ''}</p>
                        ) : (
                            <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.92 }}>Please review the message below and try again.</p>
                        )}
                        <h3 style={{ margin: '4px 0 0', fontSize: '2rem', fontWeight: 700 }}>
                            {paymentResult.success ? 'Payment Successful' : 'Payment Failed'}
                        </h3>
                    </div>

                    <div style={{ margin: '18px 0', width: '78px', height: '78px', borderRadius: '999px', border: '6px solid #A7F3D0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {paymentResult.success ? (
                            <FaCheckCircle size={42} style={{ color: '#A7F3D0' }} />
                        ) : (
                            <FaTimesCircle size={42} style={{ color: '#FECACA' }} />
                        )}
                    </div>

                    <div style={{ width: '100%', maxWidth: '280px', background: '#F9F4E8', color: '#1f2937', borderRadius: '12px', padding: '14px 14px 12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontWeight: 700 }}>
                            <span>Foody App</span>
                            <span>₹{paymentResult.amount.toFixed(0)}</span>
                        </div>
                        <p style={{ margin: 0, color: '#6b7280', fontSize: '0.76rem' }}>{new Date().toLocaleString()}</p>
                        <p style={{ margin: '6px 0 0', color: '#6b7280', fontSize: '0.76rem' }}>
                            {paymentMethod.toUpperCase()} | {(paymentResult.paymentId || 'N/A').slice(-10)}
                        </p>
                        <p style={{ margin: '6px 0 0', color: '#6b7280', fontSize: '0.76rem' }}>{paymentResult.message}</p>
                    </div>

                    {paymentResult.success && (
                        <button
                            onClick={() => navigate('/orders')}
                            style={{
                                marginTop: '12px',
                                border: '1px solid rgba(255,255,255,0.28)',
                                background: 'rgba(255,255,255,0.1)',
                                color: '#fff',
                                padding: '10px 18px',
                                borderRadius: '999px',
                                fontWeight: 600,
                                cursor: 'pointer'
                            }}
                        >
                            View My Orders
                        </button>
                    )}

                    <div style={{ fontSize: '0.75rem', opacity: 0.95 }}>Secured by Foody Pay</div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
