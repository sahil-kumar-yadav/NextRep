import { auth } from "@clerk/nextjs";
import { prisma } from "@/lib/db";

export async function POST(req) {
  const { userId } = auth();
  const body = await req.json();

  const client = await prisma.client.findFirst({
    where: {
      id: body.clientId,
      user: { clerkId: userId },
    },
  });

  if (!client) return new Response("Client not found", { status: 404 });

  const entry = await prisma.progressEntry.create({
    data: {
      clientId: client.id,
      weight: parseFloat(body.weight),
      bodyFat: parseFloat(body.bodyFat),
      notes: body.notes,
      date: new Date(body.date),
    },
  });

  return Response.json(entry);
}
