/**
 * search/page.js
 *
 * This page displays product results based on the search query.
 * It only includes products from allowed categories: laptops, tablets, and mobile-accessories.
 */

"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard"; // Card component to display each product

// Define the categories allowed in search results
const allowedCategories = ["laptops", "tablets", "mobile-accessories"];

export default function SearchResults() {
  const searchParams = useSearchParams(); // Access query string
  const query = searchParams.get("query"); // Get `query` value from URL
  const [results, setResults] = useState([]); // Store filtered products

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;

      try {
        // Fetch search results from external API
        const res = await fetch(`https://dummyjson.com/products/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();

        // Filter results to include only allowed categories
        const filtered = data.products.filter((product) =>
          allowedCategories.includes(product.category)
        );

        setResults(filtered);
      } catch (err) {
        console.error("Search error:", err);
      }
    };

    fetchResults(); // Run on query change
  }, [query]);

  return (
    <section className="p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">
        Search Results for &quot;{query}&quot;
      </h1>

      {/* Show message if no results are found */}
      {results.length === 0 ? (
        <p className="text-gray-600">No matching products found.</p>
      ) : (
        // Display product cards for all filtered results
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
