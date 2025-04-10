"use client";

import { useSession } from "next-auth/react";
import LoginPrompt from "./components/LoginPrompt";
import Link from "next/link";

export default function HomePage() {
  const { data: session } = useSession();

  return (
    <section className="p-8 text-center max-w-2xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-4 text-blue-700">
        {session ? `Welcome back, ${session.user.name}!` : "Welcome to E-Zone"}
      </h1>

      <p className="text-lg text-gray-600 mb-8">
        Your one-stop shop for the latest and greatest electronic devices.
      </p>

      {session ? (
        <Link
          href="/products"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700 transition"
        >
          Shop Now
        </Link>
      ) : (
        <LoginPrompt />
      )}
    </section>
  );
}
