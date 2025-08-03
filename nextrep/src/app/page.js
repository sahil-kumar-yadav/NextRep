import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { SignedIn, SignedOut } from "@clerk/nextjs";

// Redirect logic (only server-side allowed)
async function handleRedirect() {
  const { userId } = auth();

  if (!userId) return;

  let user;
  try {
    user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });
    console.log("📦 Fetched user from DB:", user);
  } catch (error) {
    console.error("❌ Error fetching user from database:", error);
    redirect("/error");
  }

  if (!user || !user.role) {
    console.warn("⚠️ Missing user or role. Redirecting to onboarding.");
    redirect("/select-role");
  }

  if (user.role === "TRAINER") {
    console.log("🎯 Redirecting TRAINER to dashboard.");
    redirect("/dashboard");
  } else if (user.role === "CLIENT") {
    console.log("👤 Redirecting CLIENT to client dashboard.");
    redirect("/client");
  } else {
    console.warn("⚠️ Unknown role. Redirecting to onboarding.");
    redirect("/select-role");
  }
}

export default async function Home() {
  // Only trigger redirect logic if signed in
  return (
    <>
      <SignedIn>
        {await handleRedirect()}
      </SignedIn>

      <SignedOut>
        <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-8 text-center">
          <h1 className="text-5xl font-bold text-indigo-800 mb-4">Fitness CRM</h1>
          <p className="text-lg text-gray-600 mb-8">
            A powerful CRM for personal trainers and fitness studios.
          </p>
          <a
            href="/sign-in"
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
          >
            Sign In
          </a>
        </main>
      </SignedOut>
    </>
  );
}
