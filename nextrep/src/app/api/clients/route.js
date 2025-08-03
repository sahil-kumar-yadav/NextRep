import { prisma } from "@/lib/db";

export async function POST(req) {
  const { userId } = auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  const body = await req.json();
  const trainer = await prisma.user.upsert({
    where: { clerkId: userId },
    update: {},
    create: { clerkId: userId },
  });

  const newClient = await prisma.client.create({
    data: {
      ...body,
      userId: trainer.id,
    },
  });

  return Response.json(newClient);
}
