"use client";

import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;
    if (isSignedIn) {
      // Always redirect signed-in users to /redirect for role-based routing
      router.replace("/redirect");
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  // Show landing page for guests
  return (
    <main className="p-8">
      <h1 className="text-4xl font-bold mb-4">Fitness CRM</h1>
      <p className="text-lg text-gray-600 mb-8">
        A powerful CRM for personal trainers and fitness studios.
      </p>
      <a
        href="/sign-in"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Sign In
      </a>
    </main>
  );
}