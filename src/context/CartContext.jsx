import { createContext, useState, useEffect } from "react";
export const CartContext = createContext();
export const CartProvider = ({ children }) => {
  // Load the cart from localStorage so items don't vanish on refresh
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("storify_cart");
    return saved ? JSON.parse(saved) : [];
  });

  // Sync state changes with storage
  useEffect(() => {
    localStorage.setItem("storify_cart", JSON.stringify(cart));
  }, [cart]);

  // 2. Add an item or increment its quantity if it already exists
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      
      if (existingItem) {
        // Increment the item count safely
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      
      // New item configuration: append it with a base quantity of 1
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // 3. Update specific counts (like increment/decrement clicks inside the cart view)
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
    );
  };

  // 4. Wipe an item entirely out of the list
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // 5. Clear the cart completely (runs right after an order completes successfully)
  const clearCart = () => setCart([]);

  // Derived Values: No extra states needed, updates instantly automatically
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider 
      value={{ 
        cart, 
        addToCart, 
        updateQuantity, 
        removeFromCart, 
        clearCart,
        cartCount,
        cartSubtotal 
      }}
    >
      {children}
    </CartContext.Provider>
  );
};