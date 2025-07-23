import { auth } from "@clerk/nextjs";
import { prisma } from "@/lib/db";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const clientId = searchParams.get("clientId");

  const photos = await prisma.photo.findMany({
    where: { clientId },
    orderBy: { createdAt: "desc" },
  });

  return Response.json(photos);
}

export async function POST(req) {
  const { userId } = auth();
  const body = await req.json();

  const client = await prisma.client.findFirst({
    where: {
      id: body.clientId,
      user: { clerkId: userId },
    },
  });

  if (!client) return new Response("Unauthorized", { status: 401 });

  const photo = await prisma.photo.create({
    data: {
      clientId: body.clientId,
      url: body.url,
    },
  });

  return Response.json(photo);
}
