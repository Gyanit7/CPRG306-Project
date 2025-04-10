import ProductCard from "../components/ProductCard";

// Helper to fetch each category
async function fetchCategory(cat) {
  const res = await fetch(`https://dummyjson.com/products/category/${cat}?limit=100`);
  const data = await res.json();
  return data.products || [];
}


export default async function ProductsPage() {
  // ✅ Fetch only non-phone electronics
  const [laptops, tablets, accessories] = await Promise.all([
    fetchCategory("laptops"),
    fetchCategory("tablets"),
    fetchCategory("mobile-accessories"),
  ]);

  const electronics = [...laptops, ...tablets, ...accessories];

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {electronics.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
}
