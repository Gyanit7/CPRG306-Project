"use client";
import Link from "next/link";
import { useCart } from "../cart/CartContext";
import { signOut, useSession } from "next-auth/react";
import { ShoppingCart } from "lucide-react";

export default function Navbar() {
  const { cartItems } = useCart();
  const { data: session } = useSession();
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="bg-white shadow-md p-4 px-6 flex items-center justify-between">
      <Link href="/" className="text-2xl font-bold text-blue-600">E-Zone</Link>

      <div className="flex gap-6 items-center">
        <Link href="/" className="text-gray-700 font-medium hover:text-blue-600">Home</Link>
        <Link href="/products" className="text-gray-700 font-medium hover:text-blue-600">Products</Link>
        <Link href="/cart" className="relative">
          <ShoppingCart className="w-6 h-6 text-blue-600 hover:text-blue-800" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
              {cartCount}
            </span>
          )}
        </Link>

        {/* User Info */}
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
