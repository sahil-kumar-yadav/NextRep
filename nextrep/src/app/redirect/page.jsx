import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";

export default async function RedirectPage() {
  const { userId } = auth();

  if (!userId) {
    redirect("/"); // Not logged in
  }

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  if (!user) {
    redirect("/sign-up"); // Should not happen if API works correctly
  }

  if (user.role === "TRAINER") {
    redirect("/dashboard");
  } else if (user.role === "CLIENT") {
    redirect("/client");
  }

  redirect("/"); // Fallback
}
