"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewProgressPage({ params }) {
  const clientId = params.id;
  const [form, setForm] = useState({
    weight: "",
    bodyFat: "",
    notes: "",
    date: new Date().toISOString().split("T")[0], // YYYY-MM-DD
  });

  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    await fetch("/api/progress", {
      method: "POST",
      body: JSON.stringify({ ...form, clientId }),
    });
    router.push(`/dashboard/clients/${clientId}`);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
      <h2 className="text-xl font-semibold">Log Progress</h2>

      <input
        type="date"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
        className="w-full border p-2 rounded"
      />

      <input
        type="number"
        placeholder="Weight (kg)"
        value={form.weight}
        onChange={(e) => setForm({ ...form, weight: e.target.value })}
        className="w-full border p-2 rounded"
      />

      <input
        type="number"
        placeholder="Body Fat %"
        value={form.bodyFat}
        onChange={(e) => setForm({ ...form, bodyFat: e.target.value })}
        className="w-full border p-2 rounded"
      />

      <textarea
        placeholder="Notes"
        value={form.notes}
        onChange={(e) => setForm({ ...form, notes: e.target.value })}
        className="w-full border p-2 rounded"
      />

      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
        Save Entry
      </button>
    </form>
  );
}
