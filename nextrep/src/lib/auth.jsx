import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function getCurrentUserWithRole() {
  const { userId } = auth();
  if (!userId) return null;

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  return user;
}
