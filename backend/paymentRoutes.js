const express = require('express');
const crypto = require('crypto');
const Razorpay = require('razorpay');

const router = express.Router();
const pendingPayments = new Map();

const getAppState = () => global.__foodOrderingState || { users: [], orders: [] };

const getUserIdFromAuthHeader = (req) => {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';

    if (!token.startsWith('mock-token-')) {
        return null;
    }

    return token.replace('mock-token-', '');
};

const resolveUserFromRequest = (req, fallbackUserId) => {
    const state = getAppState();
    const requestUserId = req.user?._id || req.user?.id || null;
    const authUserId = getUserIdFromAuthHeader(req);
    const userId = requestUserId || authUserId || fallbackUserId || null;

    if (!userId) {
        return null;
    }

    return state.users.find((entry) => entry._id === userId) || null;
};

const getRazorpayClient = () => {
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
        return null;
    }

    return new Razorpay({
        key_id: keyId,
        key_secret: keySecret
    });
};

router.get('/config', (req, res) => {
    const key = process.env.RAZORPAY_KEY_ID;

    if (!key) {
        return res.status(500).json({
            success: false,
            message: 'Payment service is not configured. Add RAZORPAY_KEY_ID in backend .env'
        });
    }

    return res.json({ success: true, key });
});

// Create Razorpay Order
router.post('/create-order', async (req, res) => {
    try {
        const razorpay = getRazorpayClient();
        if (!razorpay) {
            return res.status(500).json({
                success: false,
                message: 'Payment service is not configured. Add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in backend .env'
            });
        }

        const { amount, currency = 'INR', receipt } = req.body;
        const userId = getUserIdFromAuthHeader(req);

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: 'Not authorized to create payment order'
            });
        }

        if (!amount) {
            return res.status(400).json({ error: 'Amount is required' });
        }

        // Razorpay expects amount in smallest currency unit (paise for INR)
        const options = {
            amount: Math.round(amount * 100), // Convert to paise
            currency: currency,
            receipt: receipt || `order_${Date.now()}`,
            payment_capture: 1 // Capture payment automatically after customer completes payment
        };

        const order = await razorpay.orders.create(options);

        pendingPayments.set(order.id, {
            userId,
            amount: Number(amount),
            currency,
            receipt: options.receipt,
            createdAt: new Date().toISOString()
        });

        res.json({
            success: true,
            orderId: order.id,
            amount: order.amount,
            currency: order.currency
        });
    } catch (error) {
        console.error('Error creating Razorpay order:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create payment order',
            error: error.message
        });
    }
});

// Verify Payment
router.post('/verify', async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: 'Missing required payment parameters'
            });
        }

        // Create signature hash to verify authenticity
        const body = razorpay_order_id + '|' + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest('hex');

        const isValidSignature = expectedSignature === razorpay_signature;

        if (isValidSignature) {
            const paymentRecord = pendingPayments.get(razorpay_order_id);
            if (!paymentRecord) {
                return res.status(400).json({
                    success: false,
                    message: 'Payment order is not recognized or already processed'
                });
            }

            const user = resolveUserFromRequest(req, paymentRecord.userId);
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'Unable to resolve user for wallet update'
                });
            }

            const creditAmount = Number(paymentRecord.amount || 0);
            if (!creditAmount || creditAmount <= 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid payment amount for wallet update'
                });
            }

            user.walletBalance = Number(user.walletBalance || 0) + creditAmount;
            const updatedWalletBalance = Number(user.walletBalance || 0);

            pendingPayments.delete(razorpay_order_id);

            res.json({
                success: true,
                message: 'Payment verified successfully',
                paymentId: razorpay_payment_id,
                orderId: razorpay_order_id,
                walletBalance: updatedWalletBalance
            });
        } else {
            res.status(400).json({
                success: false,
                message: 'Payment verification failed - signature mismatch'
            });
        }
    } catch (error) {
        console.error('Error verifying payment:', error);
        res.status(500).json({
            success: false,
            message: 'Payment verification error',
            error: error.message
        });
    }
});

// Get Payment Details (optional - for fetching payment info from Razorpay)
router.get('/payment/:paymentId', async (req, res) => {
    try {
        const razorpay = getRazorpayClient();
        if (!razorpay) {
            return res.status(500).json({
                success: false,
                message: 'Payment service is not configured. Add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in backend .env'
            });
        }

        const { paymentId } = req.params;

        const payment = await razorpay.payments.fetch(paymentId);

        res.json({
            success: true,
            payment: {
                id: payment.id,
                amount: payment.amount / 100, // Convert from paise to rupees
                currency: payment.currency,
                status: payment.status,
                method: payment.method,
                created_at: payment.created_at
            }
        });
    } catch (error) {
        console.error('Error fetching payment details:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch payment details',
            error: error.message
        });
    }
});

module.exports = router;
