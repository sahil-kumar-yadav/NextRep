import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";

export async function POST() {
  const { userId } = auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  const existingUser = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  if (!existingUser) {
    // You can hardcode the role for now or assign based on email
    await prisma.user.create({
      data: {
        clerkId: userId,
        role: "TRAINER", // or "CLIENT"
      },
    });
  }

  return new Response("OK");
}
