import prisma from "@/lib/prisma";
import { getDevUser } from "@/lib/getDevUser";

export async function GET() {
  const user = await getDevUser("TRAINER");
  
  const clients = await prisma.trainerClient.findMany({
    where: { trainerId: user.id },
    include: { client: true }
  });

  return Response.json(clients);
}

export async function POST(req) {
  const user = await getDevUser("TRAINER");
  const data = await req.json();

  const newClient = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      role: "CLIENT",
      trainerClients: {
        create: { trainerId: user.id }
      }
    }
  });

  return Response.json(newClient);
}
