import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/db";

export async function POST(req) {
  const session = await getServerSession(authOptions);
  const body = await req.json();
  const role = body?.role || "TRAINER";

  if (!session?.user?.id || !["TRAINER", "CLIENT"].includes(role)) {
    return new Response("Unauthorized or invalid role", { status: 400 });
  }

  // Avoid duplicate creation
  const existing = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (existing) {
    return new Response("User already exists", { status: 200 });
  }

  await prisma.user.create({
    data: {
      id: session.user.id,
      email: session.user.email,
      role,
    },
  });

  return new Response("User created", { status: 201 });
}