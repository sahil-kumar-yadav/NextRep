import { auth } from "@clerk/nextjs";
import { prisma } from "@/lib/db";

export async function GET(req, { params }) {
  const { userId } = auth();
  const user = await prisma.user.findUnique({ where: { clerkId: userId } });

  const client = await prisma.client.findUnique({
    where: { id: params.id, userId: user?.id },
  });

  if (!client) return new Response("Not found", { status: 404 });
  return Response.json(client);
}

export async function PUT(req, { params }) {
  const body = await req.json();
  const updated = await prisma.client.update({
    where: { id: params.id },
    data: body,
  });
  return Response.json(updated);
}

export async function DELETE(req, { params }) {
  await prisma.client.delete({ where: { id: params.id } });
  return new Response("Deleted", { status: 200 });
}
