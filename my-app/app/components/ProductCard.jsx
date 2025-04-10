"use client";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../cart/CartContext";
import { useState } from "react";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault(); // Prevent navigation on button click
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <Link href={`/products/${product.id}`}>
      <div className="border rounded-lg shadow p-4 bg-white flex flex-col hover:shadow-md transition relative cursor-pointer h-full">
        <div className="h-60 w-full flex items-center justify-center overflow-hidden rounded mb-4 bg-gray-50">
          <Image
            src={product.thumbnail || product.images?.[0]}
            alt={product.title}
            width={220}
            height={220}
            className="object-contain"
          />
        </div>

        <h2 className="text-lg text-gray-700 font-semibold">{product.title}</h2>

        <p className="text-gray-600 text-sm line-clamp-2 h-[42px]">
          {product.description}
        </p>

        <p className="text-green-600 font-bold mb-2">${product.price}</p>

        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 mt-auto z-10"
        >
          Add to Cart
        </button>

        {added && (
          <span className="absolute top-3 right-3 bg-green-500 text-white text-xs px-2 py-1 rounded">
            Added!
          </span>
        )}
      </div>
    </Link>
  );
}
