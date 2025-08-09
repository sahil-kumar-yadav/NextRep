import prisma from "@/lib/prisma";
import { getDevUser } from "@/lib/getDevUser";

export async function GET() {
  const user = await getDevUser("CLIENT");

  const logs = await prisma.progressLog.findMany({
    where: { clientId: user.id },
    include: { photos: true }
  });

  return Response.json(logs);
}

export async function POST(req) {
  const user = await getDevUser("CLIENT");
  const data = await req.json();

  const newLog = await prisma.progressLog.create({
    data: {
      clientId: user.id,
      date: new Date(data.date),
      notes: data.notes
    }
  });

  return Response.json(newLog);
}
