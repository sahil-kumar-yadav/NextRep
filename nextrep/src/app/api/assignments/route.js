import prisma from "@/lib/prisma";

export async function POST(req) {
  const { clientId, planId } = await req.json();

  const assignment = await prisma.assignedPlan.create({
    data: {
      clientId,
      planId,
    },
  });

  return new Response(JSON.stringify(assignment), { status: 201 });
}

export async function GET() {
  const assignments = await prisma.assignedPlan.findMany({
    include: {
      plan: { include: { exercises: true } },
      client: true,
    },
  });

  return new Response(JSON.stringify(assignments), { status: 200 });
}
