import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import Link from "next/link";

export default async function DashboardPage() {
  const { userId } = auth();
  if (!userId) return redirect("/sign-in");

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    include: { clients: true },
  });

  if (!user || user.role !== "TRAINER") return <div>Unauthorized</div>;

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Trainer Dashboard</h1>
      <div className="mb-4">
        <Link
          href="/dashboard/clients/new"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add New Client
        </Link>
      </div>
      <div className="grid gap-4">
        {user.clients.map((client) => (
          <div key={client.id} className="border rounded p-4">
            <h2 className="font-semibold text-lg">{client.name}</h2>
            <p className="text-sm text-gray-600">{client.email}</p>
            <Link
              href={`/dashboard/clients/${client.id}`}
              className="text-blue-600 text-sm mt-2 inline-block"
            >
              View / Edit
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}