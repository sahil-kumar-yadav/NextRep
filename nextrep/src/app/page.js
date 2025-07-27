import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";

// Home page: redirects signed-in users based on their role, shows landing for guests
export default async function Home() {
  const { userId } = auth();

  if (userId) {
    let user = null;
    try {
      user = await prisma.user.findUnique({
        where: { clerkId: userId },
      });
    } catch (error) {
      // Redirect to error page if DB fails
      redirect("/error");
    }

    // Redirect to onboarding if user or role missing
    if (!user || !user.role) {
      redirect("/select-role");
    } else if (user.role === "TRAINER") {
      redirect("/dashboard");
    } else if (user.role === "CLIENT") {
      redirect("/client");
    }
  }

  // Landing page for guests
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