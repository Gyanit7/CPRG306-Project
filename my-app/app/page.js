"use client";

import { useSession } from "next-auth/react";
import LoginPrompt from "./components/LoginPrompt";

export default function HomePage() {
  const { data: session } = useSession();

  return (
    <section className="p-8 text-center max-w-2xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-4 text-blue-700">
        {session ? `Welcome back, ${session.user.name}!` : "Welcome to E-Zone"}
      </h1>

      <p className="text-lg text-white-600 mb-8">
        Your one-stop shop for the latest and greatest electronic devices.
      </p>

      {!session && <LoginPrompt />}
    </section>
  );
}
