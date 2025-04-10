/*
 * CheckoutPage.js
 *
 * This component manages the checkout process. It lists the user's cart items,
 * calculates the total price, and allows the user to place an order. On successful
 * checkout, it clears the cart and redirects to the order history page.
 */


"use client";

import { useCart } from "../cart/CartContext";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCart(); // Get cart data and clear function from context
  const { data: session } = useSession();
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [orderSuccess, setOrderSuccess] = useState(false);

  // Calculate total price from cart items
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Handle checkout process
  const handleCheckout = async () => {
    if (!session) {
      setErrorMessage("You must be logged in to checkout.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: session.user.id,
          items: cartItems,
          total: totalPrice,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || "Something went wrong.");
      } else {
        setOrderSuccess(true);
        clearCart(); // Clear cart after successful order
        setMessage("Order placed successfully.");

        // Redirect to order history after a short delay
        setTimeout(() => router.push("/orders"), 3000);
      }
    } catch (err) {
      setErrorMessage("Server error.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-700">Checkout</h1>

      {orderSuccess && (
        <div className="text-center bg-green-100 border border-green-300 text-green-700 p-6 rounded mb-6">
          <h2 className="text-xl font-semibold mb-2">Order Confirmed</h2>
          <p>Your order has been placed. Redirecting to your orders...</p>
        </div>
      )}

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {/* Display all cart items */}
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b pb-2"
            >
              <div>
                <h2 className="font-semibold">{item.title}</h2>
                <p className="text-sm text-gray-500">
                  Quantity: {item.quantity}
                </p>
              </div>
              <p className="font-medium">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}

          {/* Show total price */}
          <div className="flex justify-between text-lg font-semibold mt-4 border-t pt-4">
            <span>Total:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>

          {/* Checkout button */}
          <button
            onClick={handleCheckout}
            disabled={isSubmitting}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            {isSubmitting ? "Placing Order..." : "Place Order"}
          </button>

          {/* Display error message if any */}
          {errorMessage && (
            <p className="text-red-600 text-sm text-center mt-3">{errorMessage}</p>
          )}

          {/* Display success message if any */}
          {message && (
            <p className="text-blue-600 text-sm text-center mt-3">{message}</p>
          )}
        </div>
      )}
    </section>
  );
}
