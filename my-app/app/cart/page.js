"use client";

import { useCart } from "../cart/CartContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const router = useRouter();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <section className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-600 text-center">Your cart is empty.</p>
      ) : (
        <>
          <ul className="mb-4 space-y-2">
            {cartItems.map((item, index) => (
              <li
                key={`${item.id}-${index}`} // ✅ Fixed: Composite key
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  {item.title} × {item.quantity}
                </div>
                <button
                  className="text-red-500 hover:underline text-sm"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <p className="font-semibold text-gray-700 text-right mb-4">
            Total: ${total.toFixed(2)}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full sm:w-auto"
              onClick={clearCart}
            >
              Clear Cart
            </button>

            <button
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full sm:w-auto"
              onClick={() => router.push("/checkout")}
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </section>
  );
}
