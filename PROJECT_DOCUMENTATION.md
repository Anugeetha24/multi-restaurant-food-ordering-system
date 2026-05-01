# Full Stack Multi-Restaurant Food Ordering System

## 1. Project Overview
This is a comprehensive full-stack web application for a multi-restaurant food ordering system. It features a unified cart, single payment gateway integration, and role-based dashboards for Customers, Chefs, and Waiters.

## 2. Technology Stack
- **Frontend**: React.js, Vite, CSS (Vanilla), Axios, React Router DOM
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Payment Gateway**: Razorpay (Test Mode)
- **Tools**: VS Code, Git

## 3. Core Modules & Features

### 3.1 User Authentication
- **Register/Login**: Users can sign up and log in securely.
- **JWT Authentication**: Secure token-based access for protected routes.
- **Role-Based Access**:
  - **User**: Can browse menus, book tables, place orders.
  - **Chef**: Can view pending orders and update status to "Preparing" or "Ready".
  - **Waiter**: Can view ready orders and mark them as "Delivered".
  - **Admin**: Full access (implied).

### 3.2 Table Booking & Ordering
- **Table Booking**: Users can select a restaurant, date, time, and table to book.
- **Food Ordering**: Interactive menu with categories and search. Users can add items from multiple restaurants to a single cart.
- **Unified Cart**: Checkout process handles items from different restaurants in one go.

### 3.3 Payment Integration
- **Razorpay**: Integrated for handling payments.
- **Flow**:
  1. Frontend initiates payment -> Backend creates Razorpay Order.
  2. Frontend opens Razorpay Modal -> User pays.
  3. Frontend sends payment details to Backend -> Backend verifies signature.
  4. Order is saved to Database upon successful verification.

### 3.4 Dashboards
- **Customer Dashboard**: "LetsMeal" themed dashboard with overview, food ordering, favorites, and order history.
- **Chef Dashboard**: Real-time view of incoming orders to manage kitchen workflow.
- **Waiter Dashboard**: Real-time view of orders ready to be served.

## 4. API Documentation

### Auth Routes
- `POST /api/auth/register`: Register a new user.
- `POST /api/auth/login`: Login user and get JWT.

### Restaurant Routes
- `GET /api/restaurants`: Get all restaurants.
- `POST /api/restaurants`: Create a restaurant (Admin).

### Menu Routes
- `GET /api/menu/:restaurantId`: Get menu for a restaurant.

### Order Routes
- `POST /api/orders`: Create a new order.
- `GET /api/orders`: Get all orders (Chef/Waiter/Admin).
- `GET /api/orders/myorders`: Get logged-in user's orders.
- `PUT /api/orders/:id/status`: Update order status.

### Booking Routes
- `POST /api/bookings`: Create a table booking.
- `GET /api/bookings`: Get bookings.
- `GET /api/bookings/tables/:restaurantId`: Get tables for a restaurant.

### Payment Routes
- `POST /api/payment/create-order`: Create Razorpay order.
- `POST /api/payment/verify`: Verify Razorpay payment signature.

## 5. Setup & Run Instructions

### Prerequisites
- Node.js installed
- MongoDB installed and running locally

### Backend Setup
1. Navigate to `backend` folder: `cd backend`
2. Install dependencies: `npm install`
3. Create `.env` file with:
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/foody
   JWT_SECRET=your_jwt_secret
   RAZORPAY_KEY_ID=rzp_test_1234567890
   RAZORPAY_KEY_SECRET=secret12345
   ```
4. Seed Database (Optional): `node seeder.js`
5. Run Server: `npm run dev`

### Frontend Setup
1. Navigate to `frontend` folder: `cd frontend`
2. Install dependencies: `npm install`
3. Run Dev Server: `npm run dev`
4. Open browser at `http://localhost:5173`

## 6. Folder Structure

### Backend
- `config/`: DB connection
- `controllers/`: Logic for routes
- `models/`: Mongoose schemas (User, Order, Restaurant, Menu, Table, Booking)
- `routes/`: API route definitions
- `middleware/`: Auth middleware
- `server.js`: Entry point

### Frontend
- `src/components/`: Reusable UI components (Sidebar, RightPanel, Navbar)
- `src/pages/`: Page components (Home, Dashboard, Checkout, Login, etc.)
- `src/context/`: React Context for Auth and Cart state
- `src/App.jsx`: Main routing logic
- `src/index.css`: Global styles

## 7. Future Improvements
- Real-time socket.io notifications for Chef/Waiter.
- Admin panel for managing restaurants and menus.
- Email notifications for order confirmation.

