"use client";
import Image from "next/image";
import { useCart } from "../cart/CartContext";
import { useState } from "react";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="border rounded-lg shadow p-4 bg-white flex flex-col hover:shadow-md transition relative">
      <div className="bg-white h-60 w-full flex items-center justify-center overflow-hidden rounded mb-4">
        <Image
          src={product.thumbnail}
          alt={product.title}
          width={220}
          height={220}
          className="object-contain"
        />
      </div>
      <h2 className="text-lg font-semibold">{product.title}</h2>
      <p className="text-gray-600 text-sm">{product.description}</p>
      <p className="text-green-600 font-bold mb-2">${product.price}</p>
      <button
        onClick={handleAdd}
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 mt-auto"
      >
        Add to Cart
      </button>
      {added && (
        <span className="absolute top-3 right-3 bg-green-500 text-white text-xs px-2 py-1 rounded">
          Added!
        </span>
      )}
    </div>
  );
}
