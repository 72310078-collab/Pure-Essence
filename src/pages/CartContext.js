import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.name === product.name);
      if (existing) {
        return prev.map((item) =>
          item.name === product.name
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (name) => {
    setCart((prev) => prev.filter((item) => item.name !== name));
  };

  const changeQty = (name, qty) => {
    if (qty < 1) return;
    setCart((prev) =>
      prev.map((item) => (item.name === name ? { ...item, qty } : item))
    );
  };

  const clearCart = () => setCart([]);

  const total = cart.reduce((sum, item) => {
    const priceNum = Number(item.price.replace("$", ""));
    return sum + priceNum * item.qty;
  }, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, changeQty, clearCart, total }}
    >
      {children}
    </CartContext.Provider>
  );
}
