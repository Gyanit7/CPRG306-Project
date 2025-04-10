/**
 * Navbar.jsx
 *
 * This component renders the top navigation bar for the E-Zone app.
 * It includes navigation links, a search bar, cart icon with item count,
 * and login/logout functionality based on session state.
 */

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "../cart/CartContext";
import { signOut, useSession } from "next-auth/react";
import { ShoppingCart, Search } from "lucide-react";

export default function Navbar() {
  const { cartItems } = useCart(); // Get cart items from context
  const { data: session } = useSession(); // Get current session data
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  // Handle product search redirect
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      router.push(`/search?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <nav className="bg-white shadow-md p-4 px-6 flex flex-wrap items-center justify-between gap-4">
      
      <Link href="/" className="text-2xl font-bold text-blue-600">E-Zone</Link>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex items-center gap-2 flex-grow max-w-sm mx-auto">
        <input
          type="text"
          placeholder="Search laptops, tablets, accessories..."
          className="w-full px-4 py-2 border rounded text-sm text-black"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" className="p-2 bg-blue-600 rounded text-white hover:bg-blue-700">
          <Search className="w-5 h-5" />
        </button>
      </form>

      {/* Navigation Links */}
      <div className="flex gap-6 items-center">
        <Link href="/" className="text-gray-700 font-medium hover:text-blue-600">Home</Link>
        <Link href="/products" className="text-gray-700 font-medium hover:text-blue-600">Products</Link>

        {/* Orders only shown if user is logged in */}
        {session?.user && (
          <Link href="/orders" className="text-gray-700 font-medium hover:text-blue-600">
            Orders
          </Link>
        )}

        {/* Cart Icon with item count */}
        <Link href="/cart" className="relative">
          <ShoppingCart className="w-6 h-6 text-blue-600 hover:text-blue-800" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
              {cartCount}
            </span>
          )}
        </Link>

        {/* Login/Logout Display */}
        {session?.user ? (
          <div className="flex items-center gap-2">
            <span className="text-gray-600 text-sm">{session.user.name}</span>
            <button
              onClick={() => signOut()}
              className="bg-red-500 text-white text-sm px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link href="/login" className="text-blue-600 font-medium hover:underline">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
