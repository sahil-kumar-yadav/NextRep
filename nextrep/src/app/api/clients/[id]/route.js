import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  const { userId } = auth();
  const { id } = params;

  const trainer = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  if (!trainer || trainer.role !== "TRAINER") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const client = await prisma.client.findUnique({
    where: { id },
  });

  if (!client || client.trainerId !== trainer.id) {
    return NextResponse.json({ error: "Access denied" }, { status: 403 });
  }

  const body = await req.json();

  const updated = await prisma.client.update({
    where: { id },
    data: body,
  });

  return NextResponse.json(updated);
}

export async function DELETE(req, { params }) {
  const { userId } = auth();
  const { id } = params;

  const trainer = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  if (!trainer || trainer.role !== "TRAINER") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const client = await prisma.client.findUnique({
    where: { id },
  });

  if (!client || client.trainerId !== trainer.id) {
    return NextResponse.json({ error: "Access denied" }, { status: 403 });
  }

  await prisma.client.delete({
    where: { id },
  });

  return NextResponse.json({ message: "Client deleted" });
}
