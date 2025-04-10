/**
 * ProductCard.jsx
 *
 * This component displays individual product cards for the product list.
 * Each card shows the image, title, price, and a truncated description,
 * along with an "Add to Cart" button. Clicking the card navigates to the
 * product detail page.
 */

"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "../cart/CartContext";
import { useState } from "react";

export default function ProductCard({ product }) {
  const { addToCart } = useCart(); // Access cart context
  const [added, setAdded] = useState(false); // Local state to show feedback

  // Handle Add to Cart and temporary feedback
  const handleAdd = (e) => {
    e.preventDefault(); // Prevent navigation when clicking the button
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000); // Reset added message
  };

  return (
    <Link href={`/products/${product.id}`}>
      <div className="border rounded-lg shadow p-4 bg-white flex flex-col hover:shadow-md transition relative cursor-pointer h-full">
        {/* Product Image */}
        <div className="h-60 w-full flex items-center justify-center overflow-hidden rounded mb-4 bg-gray-50">
          <Image
            src={product.thumbnail || product.images?.[0]}
            alt={product.title}
            width={220}
            height={220}
            className="object-contain"
          />
        </div>

        {/* Title */}
        <h2 className="text-lg text-gray-700 font-semibold">{product.title}</h2>

        {/* Truncated Description */}
        <p className="text-gray-600 text-sm line-clamp-2 h-[42px]">
          {product.description}
        </p>

        {/* Price */}
        <p className="text-green-600 font-bold mb-2">${product.price}</p>

        {/* Add to Cart Button */}
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 mt-auto z-10"
        >
          Add to Cart
        </button>

        {/* Feedback Message */}
        {added && (
          <span className="absolute top-3 right-3 bg-green-500 text-white text-xs px-2 py-1 rounded">
            Added!
          </span>
        )}
      </div>
    </Link>
  );
}
