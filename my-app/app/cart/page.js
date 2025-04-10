/**
 * cart/page.js
 *
 * This component displays the current user's cart items.
 * It allows removing individual items, clearing the cart,
 * and proceeding to checkout. It also calculates the total price dynamically.
 * If the user is not logged in, a prompt to log in is shown instead.
 */

"use client";

import { useCart } from "../cart/CartContext";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function CartPage() {
  const { cartItems, removeFromCart, clearCart } = useCart(); // Access cart state and functions from context
  const { data: session, status } = useSession(); // Auth session
  const router = useRouter();

  // Wait until session loads
  if (status === "loading") {
    return <p className="p-6 text-center text-gray-500">Loading cart...</p>;
  }

  // If user is not logged in
  if (!session) {
    return (
      <div className="p-6 text-center text-red-600">
        <p>Please log in to view your cart.</p>
        <Link
          href="/login"
          className="mt-4 inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  // Calculate total price of all items in the cart
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <section className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Your Cart</h1>

      {/* If cart is empty, show message */}
      {cartItems.length === 0 ? (
        <p className="text-gray-600 text-center">Your cart is empty.</p>
      ) : (
        <>
          {/* List cart items */}
          <ul className="mb-4 space-y-2">
            {cartItems.map((item, index) => (
              <li
                key={`${item.id}-${index}`} // Composite key to avoid duplicate key warnings
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  {item.title} × {item.quantity}
                </div>
                <button
                  className="text-red-500 hover:underline text-sm"
                  onClick={() => removeFromCart(item.id)} // Remove item from cart
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          {/* Total cost display */}
          <p className="font-semibold text-gray-700 text-right mb-4">
            Total: ${total.toFixed(2)}
          </p>

          {/* Cart control buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full sm:w-auto"
              onClick={clearCart} // Clear all items
            >
              Clear Cart
            </button>

            <button
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full sm:w-auto"
              onClick={() => router.push("/checkout")} // Navigate to checkout
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </section>
  );
}
