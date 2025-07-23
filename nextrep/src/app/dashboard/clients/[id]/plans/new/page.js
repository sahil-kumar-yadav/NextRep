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

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    await fetch("/api/plans", {
      method: "POST",
      body: JSON.stringify({ ...form, clientId }),
    });
    router.push(`/dashboard/clients/${clientId}`);
  }

  async function generateWithAI() {
    setLoading(true);
    const client = await fetch(`/api/clients/${clientId}`);
    const data = await client.json();
    const res = await fetch("/api/generate-plan", {
      method: "POST",
      body: JSON.stringify({
        type: form.type,
        goals: data.goals || "general fitness",
      }),
    });

    const ai = await res.json();
    setForm((prev) => ({ ...prev, content: ai.content }));
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
      <h2 className="text-xl font-semibold">Assign Plan (AI Enabled)</h2>

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

      <div className="flex justify-between items-center">
        <label className="text-sm text-gray-500">Plan Content</label>
        <button
          type="button"
          onClick={generateWithAI}
          disabled={loading}
          className="text-sm px-3 py-1 bg-purple-600 text-white rounded"
        >
          {loading ? "Generating..." : "Generate with AI"}
        </button>
      </div>

      <textarea
        placeholder="Instructions / Content"
        className="w-full border p-2 rounded"
        rows={8}
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
