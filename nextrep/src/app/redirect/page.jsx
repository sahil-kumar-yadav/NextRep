import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";

export default async function RedirectPage() {
  const { userId } = auth();
  console.log("[/redirect] userId:", userId);

  if (!userId) {
    console.log("[/redirect] No userId found, redirecting to /");
    redirect("/"); // Not logged in
  }

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
  });
  console.log("[/redirect] DB user:", user);

  if (!user) {
    console.log("[/redirect] No user found in DB, redirecting to /sign-up");
    redirect("/sign-up");
  }

  if (user.role === "TRAINER") {
    console.log("[/redirect] User is TRAINER, redirecting to /dashboard");
    redirect("/dashboard");
  } else if (user.role === "CLIENT") {
    console.log("[/redirect] User is CLIENT, redirecting to /client");
    redirect("/client");
  }

  console.log("[/redirect] Unknown role, redirecting to /");
  redirect("/");
}