/**
 * providers.jsx
 *
 * This component wraps the entire application in context providers:
 * - SessionProvider: to manage user session state using NextAuth.
 * - CartProvider: to manage the shopping cart state across the app.
 */

"use client";

import { SessionProvider } from "next-auth/react";
import { CartProvider } from "./cart/CartContext";

export default function Providers({ children }) {
  return (
    // Provides access to NextAuth session throughout the app
    <SessionProvider>
      {/* Provides cart context to all components */}
      <CartProvider>
        {children}
      </CartProvider>
    </SessionProvider>
  );
}
