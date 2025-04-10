"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/app/cart/CartContext";
import Image from "next/image";
import { Star } from "lucide-react";

export default function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`https://dummyjson.com/products/${id}`);
      const data = await res.json();
      setProduct(data);
    };
    fetchProduct();
  }, [id]);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (!product) return <p className="p-6 text-center text-gray-500">Loading...</p>;

  const formattedDate = new Date(product.meta?.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <section className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Product Overview */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-4 rounded shadow flex justify-center items-center">
          <Image
            src={product.thumbnail || product.images?.[0]}
            alt={product.title}
            width={400}
            height={400}
            className="object-contain w-full h-auto"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-blue-700 mb-2">{product.title}</h1>
          <p className="text-gray-700 mb-4">{product.description}</p>

          <div className="flex items-center gap-2 text-yellow-500 mb-3">
            <Star className="w-5 h-5 fill-yellow-400" />
            <span className="text-gray-600">{product.rating} / 5</span>
          </div>

          <p className="text-green-600 text-2xl font-bold mb-3">${product.price}</p>

          <ul className="text-sm text-gray-600 space-y-1 mb-4">
            <li><strong>Brand:</strong> {product.brand}</li>
            <li><strong>Category:</strong> {product.category}</li>
            <li><strong>SKU:</strong> {product.sku}</li>
            <li><strong>Weight:</strong> {product.weight} lbs</li>
            <li><strong>Dimensions:</strong> {product.dimensions?.width}W x {product.dimensions?.height}H x {product.dimensions?.depth}D cm</li>
            <li><strong>Discount:</strong> {product.discountPercentage}% off</li>
            <li><strong>Minimum Order:</strong> {product.minimumOrderQuantity}</li>
            <li>
              <strong>Availability:</strong> {product.availabilityStatus} ({product.stock} available)
            </li>
            <li><strong>Warranty:</strong> {product.warrantyInformation}</li>
            <li><strong>Shipping:</strong> {product.shippingInformation}</li>
            <li><strong>Return Policy:</strong> {product.returnPolicy}</li>
            <li><strong>Released:</strong> {formattedDate}</li>
          </ul>

          <button
            onClick={handleAdd}
            className="bg-blue-600 text-white py-2 px-5 rounded hover:bg-blue-700 transition"
          >
            Add to Cart
          </button>
          {added && (
            <span className="ml-4 text-green-600 font-medium">✔ Added to cart!</span>
          )}
        </div>
      </div>

      {/* Image Gallery */}
      {product.images?.length > 1 && (
        <div>
          <h2 className="text-xl font-semibold mb-2">More Images</h2>
          <div className="flex flex-wrap gap-4">
            {product.images.map((img, index) => (
              <Image
                key={index}
                src={img}
                alt={`Product image ${index + 1}`}
                width={180}
                height={180}
                className="rounded border object-contain bg-white"
              />
            ))}
          </div>
        </div>
      )}

      {/* Customer Reviews */}
      {product.reviews?.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-3">Customer Reviews</h2>
          <ul className="space-y-4">
            {product.reviews.map((review, idx) => (
              <li key={idx} className="bg-white p-4 border rounded shadow-sm">
                <div className="flex items-center gap-2 mb-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-500" />
                  <span className="font-semibold text-gray-700">{review.rating} / 5</span>
                </div>
                <p className="text-sm text-gray-600">{review.comment}</p>
                <p className="text-xs text-gray-500 mt-1">
                  — {review.reviewerName}, {new Date(review.date).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
