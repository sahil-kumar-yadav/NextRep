import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";

export default async function ClientProgressPage() {
  const { userId } = auth();

  const client = await prisma.user.findUnique({
    where: { clerkId: userId },
    include: {
      client: {
        include: {
          progress: true,
        },
      },
    },
  });

  const progress = client?.client?.progress || [];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Progress</h1>
      {progress.length === 0 ? (
        <p>No progress updates yet.</p>
      ) : (
        <ul className="space-y-4">
          {progress.map((entry) => (
            <li key={entry.id} className="border p-4 rounded bg-white shadow">
              <p className="text-sm">Weight: {entry.weight} kg</p>
              <p className="text-sm text-gray-600">
                Date: {new Date(entry.date).toLocaleDateString()}
              </p>
              {entry.photoUrl && (
                <img
                  src={entry.photoUrl}
                  alt="Progress"
                  className="w-32 h-32 object-cover mt-2 rounded"
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
