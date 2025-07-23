"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EditClient({ params }) {
  const [form, setForm] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetch(`/api/clients/${params.id}`)
      .then((res) => res.json())
      .then(setForm);
  }, [params.id]);

  if (!form) return <div>Loading...</div>;

  async function handleSubmit(e) {
    e.preventDefault();
    await fetch(`/api/clients/${params.id}`, {
      method: "PUT",
      body: JSON.stringify(form),
    });
    router.push("/dashboard/clients");
  }

  async function handleDelete() {
    await fetch(`/api/clients/${params.id}`, {
      method: "DELETE",
    });
    router.push("/dashboard/clients");
  }

  const plans = await prisma.plan.findMany({
    where: { clientId: params.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        <h2 className="text-xl font-semibold">Edit Client</h2>
        <input
          type="text"
          className="w-full border p-2 rounded"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <textarea
          className="w-full border p-2 rounded"
          value={form.goals}
          onChange={(e) => setForm({ ...form, goals: e.target.value })}
        />
        <textarea
          className="w-full border p-2 rounded"
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
        />
        <div className="flex gap-2">
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
            Save
          </button>
          <button type="button" onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded">
            Delete
          </button>
        </div>
      </form>

      <hr className="my-6" />
      <h3 className="text-lg font-bold mb-2">Assigned Plans</h3>
      <Link
        href={`/dashboard/clients/${params.id}/plans/new`}
        className="inline-block mb-4 px-4 py-2 bg-green-600 text-white rounded"
      >
        + Assign New Plan
      </Link>
      {plans.length === 0 ? (
        <p className="text-gray-500">No plans yet.</p>
      ) : (
        <ul className="space-y-2">
          {plans.map((plan) => (
            <li key={plan.id} className="p-3 border rounded bg-white">
              <div className="font-semibold">{plan.title}</div>
              <div className="text-sm text-gray-600">{plan.type}</div>
              <div className="text-gray-700 text-sm mt-1">{plan.content}</div>
            </li>
          ))}
        </ul>
      )}

    </>

  );
}
