import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import Link from "next/link";

export default async function ClientsPage() {
  const { userId } = auth();

  if (!userId) {
    return <div>Please sign in to view your clients.</div>;
  }

  const trainer = await prisma.user.upsert({
    where: { clerkId: userId },
    update: {},
    create: { clerkId: userId },
  });

  const clients = await prisma.client.findMany({
    where: { userId: trainer.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Your Clients</h2>
        <Link
          href="/dashboard/clients/new"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          + New Client
        </Link>
      </div>

      <ul className="space-y-2">
        {clients.map((client) => (
          <li key={client.id} className="p-4 border rounded bg-white">
            <div className="font-medium">{client.name}</div>
            <div className="text-sm text-gray-600">{client.goals}</div>
            <Link
              href={`/dashboard/clients/${client.id}`}
              className="text-blue-500 text-sm mt-2 inline-block"
            >
              Edit
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
