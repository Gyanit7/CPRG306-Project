/**
 * CartContext.jsx
 *
 * This file defines a context provider for the shopping cart.
 * It manages cart state, supports persistent cart syncing to MongoDB,
 * and ensures user-specific cart data is correctly loaded when the user logs in,
 * and cleared when the user logs out.
 */

"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const { data: session } = useSession();
  const [cartItems, setCartItems] = useState([]);
  const [cartLoaded, setCartLoaded] = useState(false);
  const lastUserId = useRef(null); // Used to track user changes across sessions

  // Load or reset cart depending on user session state
  useEffect(() => {
    const currentUserId = session?.user?.id || null;

    // 🧹 Clear cart on logout
    if (!currentUserId && lastUserId.current !== null) {
      setCartItems([]);
      lastUserId.current = null;
      setCartLoaded(false);
      return;
    }

    // 🔄 Load cart when a new user logs in
    if (currentUserId && currentUserId !== lastUserId.current) {
      const loadCart = async () => {
        try {
          const res = await fetch(`/api/cart/load?userId=${currentUserId}`);
          const data = await res.json();
          if (res.ok) {
            setCartItems(data.cart || []);
            lastUserId.current = currentUserId;
          }
        } catch (err) {
          console.error("Cart load error:", err);
        } finally {
          setCartLoaded(true); // Mark cart as loaded even if fetch fails
        }
      };

      loadCart();
    }
  }, [session]);

  // 🔁 Sync updated cart to MongoDB
  const syncCartToDB = async (items) => {
    const userId = session?.user?.id;
    if (!userId) return;
    try {
      await fetch("/api/cart/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, items }),
      });
    } catch (err) {
      console.error("Cart save error:", err);
    }
  };

  // ➕ Add item to cart (or increase quantity)
  const addToCart = (product) => {
    if (!cartLoaded) {
      console.warn("Cart not loaded yet. Skipping add.");
      return;
    }

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

  // ➖ Remove item from cart by ID
  const removeFromCart = (id) => {
    setCartItems((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      syncCartToDB(updated);
      return updated;
    });
  };

  // 🗑 Clear all items from the cart
  const clearCart = () => {
    setCartItems([]);
    syncCartToDB([]);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, cartLoaded }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Hook to access cart context
export const useCart = () => useContext(CartContext);
