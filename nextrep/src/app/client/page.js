import { getCurrentUserWithRole } from "@/lib/auth";
import { prisma } from "@/lib/db";

export default async function ClientPortal() {
  const user = await getCurrentUserWithRole();
  if (!user || user.role !== "CLIENT") return <div>Unauthorized</div>;

  const client = await prisma.client.findFirst({
    where: { userId: user.id },
    include: { plans: true, photos: true },
  });

  if (!client) return <div>No client profile found.</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Welcome, {client.name}</h1>
      <div className="mb-6">
        <h2 className="text-lg font-bold">Your Plans</h2>
        {client.plans.length === 0 ? (
          <p>No plans yet.</p>
        ) : (
          <ul className="space-y-2 mt-2">
            {client.plans.map((plan) => (
              <li key={plan.id} className="border p-4 rounded">
                <h3 className="font-semibold">{plan.title}</h3>
                <p className="text-sm text-gray-600">{plan.type}</p>
                <p className="mt-2">{plan.content}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="mb-6">
        <h2 className="text-lg font-bold">Progress Photos</h2>
        {client.photos.length === 0 ? (
          <p>No progress photos yet.</p>
        ) : (
          <div className="grid grid-cols-3 gap-4 mt-2">
            {client.photos.map((p) => (
              <img
                key={p.id}
                src={p.url}
                alt={`Progress photo ${p.id}`}
                className="rounded border object-cover w-full h-40"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}