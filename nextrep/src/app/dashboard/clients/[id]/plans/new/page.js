"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewPlanPage({ params }) {
  const clientId = params.id;
  const [form, setForm] = useState({
    type: "workout",
    title: "",
    content: "",
  });

  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    await fetch("/api/plans", {
      method: "POST",
      body: JSON.stringify({ ...form, clientId }),
    });
    router.push(`/dashboard/clients/${clientId}`);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
      <h2 className="text-xl font-semibold">Assign New Plan</h2>

      <select
        value={form.type}
        onChange={(e) => setForm({ ...form, type: e.target.value })}
        className="w-full border p-2 rounded"
      >
        <option value="workout">Workout</option>
        <option value="meal">Meal</option>
      </select>

      <input
        type="text"
        placeholder="Plan Title"
        className="w-full border p-2 rounded"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        required
      />

      <textarea
        placeholder="Instructions / Content"
        className="w-full border p-2 rounded"
        rows={6}
        value={form.content}
        onChange={(e) => setForm({ ...form, content: e.target.value })}
        required
      />

      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
        Save Plan
      </button>
    </form>
  );
}
