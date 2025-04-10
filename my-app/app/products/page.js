/**
 * Products Page
 *
 * This page fetches and displays all products from selected categories:
 * laptops, tablets, and mobile-accessories.
 * Products are shown using the <ProductCard /> component in a responsive grid.
 */

import ProductCard from "../components/ProductCard";

// Helper function to fetch products from a specific category
async function fetchCategory(cat) {
  const res = await fetch(`https://dummyjson.com/products/category/${cat}?limit=100`);
  const data = await res.json();
  return data.products || [];
}

export default async function ProductsPage() {
  // Fetch all product categories in parallel
  const [laptops, tablets, accessories] = await Promise.all([
    fetchCategory("laptops"),
    fetchCategory("tablets"),
    fetchCategory("mobile-accessories"),
  ]);

  // Combine all fetched products into a single array
  const electronics = [...laptops, ...tablets, ...accessories];

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {/* Render a card for each product */}
      {electronics.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
}
