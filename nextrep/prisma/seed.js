// prisma/seed.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // wipe (safe in dev)
  await prisma.progressPhoto.deleteMany();
  await prisma.progressLog.deleteMany();
  await prisma.planExercise.deleteMany();
  await prisma.planAssignment.deleteMany();
  await prisma.workoutPlan.deleteMany();
  await prisma.trainerClient.deleteMany();
  await prisma.user.deleteMany();

  const trainer = await prisma.user.create({
    data: {
      name: "Dev Trainer",
      email: "trainer@dev.local",
      role: "TRAINER",
    },
  });

  const client = await prisma.user.create({
    data: {
      name: "Dev Client",
      email: "client@dev.local",
      role: "CLIENT",
    },
  });

  await prisma.trainerClient.create({
    data: {
      trainerId: trainer.id,
      clientId: client.id,
    },
  });

  const plan = await prisma.workoutPlan.create({
    data: {
      title: "Starter Full-Body",
      description: "Simple 3-day starter plan.",
      trainerId: trainer.id,
      exercises: {
        create: [
          { name: "Squat", sets: 3, reps: "8-10", order: 1 },
          { name: "Bench Press", sets: 3, reps: "8-10", order: 2 },
          { name: "Bent-over Row", sets: 3, reps: "8-10", order: 3 },
        ],
      },
      assignments: {
        create: {
          clientId: client.id,
          assignedById: trainer.id,
          startDate: new Date(),
          isActive: true,
        },
      },
    },
    include: { exercises: true, assignments: true },
  });

  await prisma.progressLog.create({
    data: {
      clientId: client.id,
      planAssignmentId: plan.assignments[0].id,
      date: new Date(),
      notes: "First session — good technique.",
      metrics: { weightKg: 78 },
      photos: {
        create: [{ url: "https://placehold.co/600x400", uploadedAt: new Date() }],
      },
    },
  });

  console.log("Seed complete. Trainer:", trainer.id, "Client:", client.id, "Plan:", plan.id);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
