"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewClientPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", goals: "", notes: "" });

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch("/api/clients", {
      method: "POST",
      body: JSON.stringify(form),
    });
    if (res.ok) {
      router.push("/dashboard/clients");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
      <h2 className="text-xl font-semibold">Add New Client</h2>
      <input
        type="text"
        placeholder="Client Name"
        className="w-full border p-2 rounded"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />
      <textarea
        placeholder="Goals"
        className="w-full border p-2 rounded"
        value={form.goals}
        onChange={(e) => setForm({ ...form, goals: e.target.value })}
      />
      <textarea
        placeholder="Notes"
        className="w-full border p-2 rounded"
        value={form.notes}
        onChange={(e) => setForm({ ...form, notes: e.target.value })}
      />
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
        Save Client
      </button>
    </form>
  );
}
