"use client";
import Image from "next/image";
import { useState } from "react";
import { useCart } from "../cart/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [showAdded, setShowAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setShowAdded(true);
    setTimeout(() => setShowAdded(false), 2000); // hide after 2 seconds
  };

  return (
    <div className="border rounded-lg shadow p-4 bg-white flex flex-col hover:shadow-md transition relative">
      <div className="bg-white h-60 w-full flex items-center justify-center overflow-hidden rounded mb-4">
        <Image
          src={product.images[0]}
          alt={product.title}
          width={220}
          height={220}
          className="object-contain"
        />
      </div>

      <div className="flex-grow">
        <h2 className="text-lg font-semibold">{product.title}</h2>
        <p className="text-gray-600 text-sm mb-2">{product.description}</p>
        <p className="text-green-600 font-bold mb-1">${product.price}</p>
      </div>

      <button
        onClick={handleAddToCart}
        className="mt-3 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
      >
        Add to Cart
      </button>

      {/* ✅ Confirmation message */}
      {showAdded && (
        <span className="absolute top-3 right-3 bg-green-500 text-white text-sm px-3 py-1 rounded shadow">
          Added!
        </span>
      )}
    </div>
  );
}
