import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";

export async function POST(req) {
  const { userId } = auth();
  const body = await req.json();
  const role = body?.role || "TRAINER"; // Default fallback

  if (!userId || !["TRAINER", "CLIENT"].includes(role)) {
    return new Response("Unauthorized or invalid role", { status: 400 });
  }

  // Avoid duplicate creation
  const existing = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  if (existing) {
    return new Response("User already exists", { status: 200 });
  }

  await prisma.user.create({
    data: {
      clerkId: userId,
      role,
    },
  });

  return new Response("User created", { status: 201 });
}
