/**
 * Login/page.js
 *
 * This component provides the login form for users and administrators.
 * Users log in using credentials handled by NextAuth. Depending on the
 * role (admin/user), it redirects them to the appropriate page.
 */

"use client";

import { signIn, getSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState(""); // Stores email input
  const [password, setPassword] = useState(""); // Stores password input
  const [error, setError] = useState(""); // Holds any validation or auth errors
  const [loading, setLoading] = useState(false); // Tracks loading state during login
  const router = useRouter(); // Navigation hook

  // Handles login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false, // Prevents NextAuth from auto-redirecting
    });

    // If login was successful, route based on user role
    if (res.ok) {
      const session = await getSession();
      if (session?.user?.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } else {
      setError("Invalid email or password.");
    }

    setLoading(false);
  };

  return (
    <section className="p-8 max-w-md mx-auto bg-white rounded shadow mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-700">Login to E-Zone</h1>

      {/* Error Message */}
      {error && (
        <p className="text-red-500 text-sm text-center mb-4">{error}</p>
      )}

      {/* Login Form */}
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            required
            className="w-full border border-gray-300 p-2 rounded text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            required
            className="w-full border border-gray-300 p-2 rounded text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Log In"}
        </button>
      </form>

      {/* Sign-up redirect text */}
      <p className="text-center text-sm text-gray-600 mt-4">
        Don&apos;t have an account?{" "}
        <Link href="/signUp" className="text-blue-600 hover:underline">
          Sign Up
        </Link>
      </p>
    </section>
  );
}
