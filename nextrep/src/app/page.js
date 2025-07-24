import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";

export default async function HomePage() {
  const { userId } = auth();

  if (userId) {
    // Ensure user exists in DB
    let user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      // Call API to create the user
      await fetch(`${process.env.NEXT_PUBLIC_URL}/api/create-user`, {
        method: "POST",
        cache: "no-store",
      });

      // Refetch user after creating
      user = await prisma.user.findUnique({
        where: { clerkId: userId },
      });
    }

    // Redirect based on role
    if (user?.role === "TRAINER") {
      redirect("/dashboard");
    } else if (user?.role === "CLIENT") {
      redirect("/client");
    }
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
