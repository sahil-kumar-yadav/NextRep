import { prisma } from "@/lib/db";

export async function POST(req) {
  const { userId } = auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  const body = await req.json();

  // Verify that client belongs to user (trainer)
  const client = await prisma.client.findFirst({
    where: {
      id: body.clientId,
      user: { clerkId: userId },
    },
  });

  if (!client) return new Response("Client not found", { status: 404 });

  const plan = await prisma.plan.create({
    data: {
      type: body.type,
      title: body.title,
      content: body.content,
      clientId: client.id,
    },
  });

  return Response.json(plan);
}
