"use client";

import Link from "next/link";

export default function LoginPrompt() {
  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-white-700 text-md">
        Please sign in or create an account to start shopping!
      </p>

      <div className="flex gap-4">
        <Link
          href="/login"
          className="bg-blue-600 text-white font-medium px-5 py-2 rounded shadow hover:bg-blue-700 transition"
        >
          Sign In
        </Link>
        <Link
          href="/signUp"
          className="bg-gray-100 border border-gray-300 text-gray-700 font-medium px-5 py-2 rounded hover:bg-gray-200 transition"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}
