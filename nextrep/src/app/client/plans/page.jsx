import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";

export default async function ClientPlansPage() {
  const { userId } = auth();

  const client = await prisma.user.findUnique({
    where: { clerkId: userId },
    include: {
      client: {
        include: {
          plans: true,
        },
      },
    },
  });

  const plans = client?.client?.plans || [];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Plans</h1>
      {plans.length === 0 ? (
        <p>No plans assigned yet.</p>
      ) : (
        <ul className="space-y-4">
          {plans.map((plan) => (
            <li key={plan.id} className="border p-4 rounded bg-white shadow">
              <h2 className="font-semibold text-lg">{plan.title}</h2>
              <p className="text-sm text-gray-600">{plan.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
