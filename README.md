# Full Stack Multi-Restaurant Food Ordering System

This is a complete full-stack application for a multi-restaurant food ordering system with unified cart, table booking, and role-based dashboards.

## Technologies Used

- **Frontend:** React.js, Vite, Context API, CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Payment:** Razorpay (Mock Integration)

## Folder Structure

- `backend/`: Node.js/Express API
- `frontend/`: React Vite App

## Features

1.  **User Authentication:** Login, Register, Role-based access (Customer, Chef, Waiter, Admin).
2.  **Restaurants & Menu:** View restaurants, browse menus.
3.  **Unified Cart:** Add items from restaurants to a single cart.
4.  **Table Booking:** Book tables with date and time slots.
5.  **Checkout:** Place orders and pay (Mock Razorpay).
6.  **Dashboards:**
    - **Chef:** View orders, update status (Pending -> Preparing -> Ready).
    - **Waiter:** View ready orders, mark as Delivered.
    - **Admin:** Manage restaurants/menus (API endpoints ready).

## Setup & Run Instructions

### Prerequisites
- Node.js installed
- MongoDB installed and running locally (or update MONGO_URI in `backend/.env`)

### 1. Backend Setup

1.  Navigate to `backend` folder:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create `.env` file (already created):
    ```
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/food_ordering_app
    JWT_SECRET=secret123
    RAZORPAY_KEY_ID=your_key_id
    RAZORPAY_KEY_SECRET=your_key_secret
    ```
4.  Seed Database (Optional but recommended for test data):
    ```bash
    node seeder.js
    ```
    *This will create sample users (admin@example.com, chef@example.com, etc. with password 'password123') and restaurants.*

5.  Run Server:
    ```bash
    npm run dev
    ```
    Server runs on `http://localhost:5000`.

### 2. Frontend Setup

1.  Open a new terminal and navigate to `frontend` folder:
    ```bash
    cd frontend
    ```
2.  The checkout uses the local mock payment flow by default and displays a successful payment after creating the paid order. Set `VITE_PAYMENT_MODE=live` before building or starting the frontend to use Razorpay instead.
3.  Install dependencies:
    ```bash
    npm install
    ```
4.  Run React App:
    ```bash
    npm run dev
    ```
    App runs on `http://localhost:5173`.

## API Endpoints

- **Auth:** `/api/auth/login`, `/api/auth/register`, `/api/auth/profile`, `/api/auth/request-password-reset`, `/api/auth/reset-password`
- **Restaurants:** `/api/restaurants`, `/api/restaurants/:id`
- **Menu:** `/api/menu/:restaurantId`
- **Orders:** `/api/orders`, `/api/orders/myorders`, `/api/orders/:id/status`
- **Bookings:** `/api/bookings`, `/api/bookings/tables/:restaurantId`

### SMTP Password Reset Setup

Add these values to `backend/.env` to send reset links directly through Gmail SMTP:

```env
FRONTEND_URL=http://localhost:5173
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=yourgmail@gmail.com
SMTP_PASSWORD=your-gmail-app-password
SMTP_FROM=yourgmail@gmail.com
```

Use a Google App Password instead of your regular Gmail password. Port `465` is also supported for SSL SMTP.

Copy `backend/.env.example` to `backend/.env`, replace the placeholder values with real Gmail details, then restart the backend. Check `http://localhost:5000/api/health`; email is ready only when `smtpConfigured` is `true`. The reset request must use an email address that already exists in the application.

## Sample Users (Password: password123)

- **Customer:** john@example.com
- **Chef:** chef@example.com
- **Waiter:** waiter@example.com
- **Admin:** admin@example.com

## Testing Flow

1.  **Register/Login** as a customer.
2.  **Browse Restaurants** on home page.
3.  **View Menu** of a restaurant.
4.  **Add Items** to cart.
5.  **Book a Table** from the same page.
6.  **Go to Cart** and proceed to **Checkout**.
7.  **Pay** (Mock success).
8.  **View My Orders**.
9.  **Logout** and Login as **Chef** (chef@example.com).
10. **Go to Dashboard**, see order, click "Start Preparing", then "Ready to Serve".
11. **Logout** and Login as **Waiter** (waiter@example.com).
12. **Go to Dashboard**, see "Ready to Serve" order, click "Mark Delivered".

