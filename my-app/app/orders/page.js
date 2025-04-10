"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function OrdersPage() {
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (session?.user) {
        try {
          const res = await fetch(`/api/orders?userId=${session.user.id}`);
          const data = await res.json();
          setOrders(data.orders || []);
        } catch (err) {
          console.error("Error fetching orders:", err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchOrders();
  }, [session]);

  if (status === "loading" || loading) {
    return <p className="p-6 text-center text-gray-500">Loading your orders...</p>;
  }

  if (!session) {
    return (
      <div className="p-6 text-center text-gray-700">
        <p>You must be logged in to view your orders.</p>
      </div>
    );
  }

  return (
    <section className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-blue-700">Your Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-700">No orders found.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li key={order.id} className="border p-4 rounded shadow bg-white">
              <p className="mb-2">
                <strong className="text-gray-700">Order ID:</strong>{" "}
                <span className="text-sm text-gray-500">{order.id}</span>
              </p>

              <p>
                <strong className="text-gray-700">Items:</strong>{" "}
                <span className="text-gray-700">{order.items.length}</span>
              </p>
              <p>
                <strong className="text-gray-700">Total:</strong>{" "}
                <span className="text-gray-700">${order.total.toFixed(2)}</span>
              </p>
              <p className="text-sm text-gray-500">
                <strong>Placed on:</strong>{" "}
                {new Date(order.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
