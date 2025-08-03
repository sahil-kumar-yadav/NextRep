import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

export default function Home() {
  const { userId } = auth();

  if (userId) {
    redirect("/redirect");
  }

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