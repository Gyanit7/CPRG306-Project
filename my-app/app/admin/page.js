/**
 * AdminPage.js
 *
 * This is the main admin dashboard page. It allows admins to view all registered users
 * and recent orders in the system. Access is restricted to users with the "admin" role.
 * It uses NextAuth for session-based access control and fetches data from the backend
 * via protected API routes.
 */

"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);

  // Fetch orders and users if the logged-in user is an admin
  useEffect(() => {
    if (session?.user?.role === "admin") {
      fetch("/api/admin/orders")
        .then((res) => res.json())
        .then((data) => setOrders(data.orders || []));

      fetch("/api/admin/users")
        .then((res) => res.json())
        .then((data) => setUsers(data.users || []));
    }
  }, [session]);

  // Show loading state while checking session
  if (status === "loading") {
    return <p className="p-6">Loading...</p>;
  }

  // Block access if user is not an admin
  if (!session || session.user.role !== "admin") {
    return <p className="p-6 text-red-600">Access Denied. Admins only.</p>;
  }

  return (
    <section className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Admin Dashboard</h1>

      {/* Registered Users Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Registered Users</h2>
        <ul className="space-y-2 bg-white rounded p-4 shadow">
          {users.length > 0 ? (
            users.map((user) => (
              <li key={user.id} className="border-b py-2 text-gray-700">
                {user.firstName} {user.lastName} - {user.email}
              </li>
            ))
          ) : (
            <p className="text-gray-500">No users found.</p>
          )}
        </ul>
      </div>

      {/* Recent Orders Section */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Recent Orders</h2>
        <ul className="space-y-2 bg-white rounded p-4 shadow">
          {orders.length > 0 ? (
            orders.map((order) => (
              <li key={order.id} className="border-b py-2 text-gray-700">
                Order #{order.id} - ${order.total.toFixed(2)} -{" "}
                {new Date(order.createdAt).toLocaleString()}
              </li>
            ))
          ) : (
            <p className="text-gray-500">No orders found.</p>
          )}
        </ul>
      </div>
    </section>
  );
}
