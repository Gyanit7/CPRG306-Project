"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const { data: session } = useSession();
  const [cartItems, setCartItems] = useState([]);

  // ✅ Fetch cart from DB when user logs in
  useEffect(() => {
    const loadCart = async () => {
      if (session?.user?.id) {
        try {
          const res = await fetch(`/api/cart/load?userId=${session.user.id}`);
          const data = await res.json();
          if (res.ok) {
            setCartItems(data.cart || []);
          } else {
            console.error("Failed to load cart:", data.error);
          }
        } catch (err) {
          console.error("Error loading cart:", err);
        }
      }
    };

    loadCart();
  }, [session]);

  // ✅ Save cart to DB
  const syncCartToDB = async (items) => {
    if (!session?.user?.id) return;
    try {
      await fetch("/api/cart/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: session.user.id,
          items,
        }),
      });
    } catch (err) {
      console.error("Failed to sync cart:", err);
    }
  };

  // ✅ Add or update cart item
  const addToCart = (product) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      const updated = exists
        ? prev.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...prev, { ...product, quantity: 1 }];
      syncCartToDB(updated);
      return updated;
    });
  };

  // ✅ Remove item
  const removeFromCart = (id) => {
    setCartItems((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      syncCartToDB(updated);
      return updated;
    });
  };

  // ✅ Clear cart
  const clearCart = () => {
    setCartItems([]);
    syncCartToDB([]);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
