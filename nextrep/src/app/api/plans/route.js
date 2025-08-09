import prisma from "@/lib/prisma";
import { getDevUser } from "@/lib/getDevUser";

export async function GET() {
  const user = await getDevUser("TRAINER");

  const plans = await prisma.workoutPlan.findMany({
    where: { trainerId: user.id },
    include: { exercises: true }
  });

  return Response.json(plans);
}

export async function POST(req) {
  const user = await getDevUser("TRAINER");
  const data = await req.json();

  const newPlan = await prisma.workoutPlan.create({
    data: {
      title: data.title,
      trainerId: user.id,
      exercises: {
        create: data.exercises.map(ex => ({
          name: ex.name,
          sets: ex.sets,
          reps: ex.reps
        }))
      }
    },
    include: { exercises: true }
  });

  return Response.json(newPlan);
}
