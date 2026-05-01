import { createContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    const existItem = cartItems.find((x) => x._id === item._id);
    if (existItem) {
      setCartItems(
        cartItems.map((x) =>
          x._id === existItem._id ? { ...x, qty: x.qty + 1 } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, qty: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((x) => x._id !== id));
  };

  const decreaseQty = (id) => {
    const existItem = cartItems.find((x) => x._id === id);
    if (existItem.qty === 1) {
      setCartItems(cartItems.filter((x) => x._id !== id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x._id === id ? { ...x, qty: x.qty - 1 } : x
        )
      );
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, decreaseQty, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
