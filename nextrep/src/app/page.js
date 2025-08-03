import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    redirect("/redirect");
  }

  return (
    <main className="p-8">
      <h1 className="text-4xl font-bold mb-4">Fitness CRM</h1>
      <p className="text-lg text-gray-600 mb-8">
        A powerful CRM for personal trainers and fitness studios.
      </p>
      <a
        href="/api/auth/signin"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Sign In
      </a>
    </main>
  );
}