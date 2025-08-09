"use client";
import { useState, useEffect } from "react";

export default function TrainerDashboard() {
  const [clients, setClients] = useState([]);
  const [plans, setPlans] = useState([]);

  const [clientForm, setClientForm] = useState({ name: "", email: "" });
  const [planForm, setPlanForm] = useState({ title: "", exercises: "" });
  const [assignment, setAssignment] = useState({ clientId: "", planId: "" });

  const [loading, setLoading] = useState({ client: false, plan: false, assign: false });

  useEffect(() => {
    fetchClients();
    fetchPlans();
  }, []);

  const fetchClients = async () => {
    try {
      const res = await fetch("/api/clients");
      setClients(await res.json());
    } catch (err) {
      console.error("Error fetching clients:", err);
    }
  };

  const fetchPlans = async () => {
    try {
      const res = await fetch("/api/plans");
      setPlans(await res.json());
    } catch (err) {
      console.error("Error fetching plans:", err);
    }
  };

  const addClient = async (e) => {
    e.preventDefault();
    if (!clientForm.name || !clientForm.email) return;

    setLoading((prev) => ({ ...prev, client: true }));
    try {
      await fetch("/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(clientForm),
      });
      setClientForm({ name: "", email: "" });
      fetchClients();
    } finally {
      setLoading((prev) => ({ ...prev, client: false }));
    }
  };

  const addPlan = async (e) => {
    e.preventDefault();
    if (!planForm.title || !planForm.exercises) return;

    setLoading((prev) => ({ ...prev, plan: true }));
    try {
      const exercisesArray = planForm.exercises.split("\n").map((line) => {
        const [name, sets, reps] = line.split(",");
        return { name: name.trim(), sets: Number(sets), reps: Number(reps) };
      });

      await fetch("/api/plans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: planForm.title, exercises: exercisesArray }),
      });
      setPlanForm({ title: "", exercises: "" });
      fetchPlans();
    } finally {
      setLoading((prev) => ({ ...prev, plan: false }));
    }
  };

  const assignPlan = async (e) => {
    e.preventDefault();
    if (!assignment.clientId || !assignment.planId) return;

    setLoading((prev) => ({ ...prev, assign: true }));
    try {
      await fetch("/api/assignments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(assignment),
      });
      setAssignment({ clientId: "", planId: "" });
    } finally {
      setLoading((prev) => ({ ...prev, assign: false }));
    }
  };

  return (
    <div className="p-6 space-y-10 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold">Trainer Dashboard</h1>

      {/* Add Client */}
      <section className="bg-white shadow rounded p-6">
        <h2 className="text-xl font-semibold mb-4">Add Client</h2>
        <form onSubmit={addClient} className="space-y-3">
          <input
            className="border p-2 w-full rounded"
            placeholder="Name"
            value={clientForm.name}
            onChange={(e) => setClientForm({ ...clientForm, name: e.target.value })}
          />
          <input
            className="border p-2 w-full rounded"
            placeholder="Email"
            type="email"
            value={clientForm.email}
            onChange={(e) => setClientForm({ ...clientForm, email: e.target.value })}
          />
          <button
            disabled={loading.client}
            className={`px-4 py-2 rounded text-white ${
              loading.client ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {loading.client ? "Adding..." : "Add Client"}
          </button>
        </form>
        <ul className="mt-4 space-y-2">
          {clients.length === 0 && <li className="text-gray-500">No clients yet</li>}
          {clients.map((c) => (
            <li key={c.clientId} className="border p-2 rounded bg-gray-50">
              {c.client.name} — {c.client.email}
            </li>
          ))}
        </ul>
      </section>

      {/* Add Plan */}
      <section className="bg-white shadow rounded p-6">
        <h2 className="text-xl font-semibold mb-4">Add Workout Plan</h2>
        <form onSubmit={addPlan} className="space-y-3">
          <input
            className="border p-2 w-full rounded"
            placeholder="Plan Title"
            value={planForm.title}
            onChange={(e) => setPlanForm({ ...planForm, title: e.target.value })}
          />
          <textarea
            className="border p-2 w-full rounded"
            placeholder="Exercise Name,Sets,Reps (one per line)"
            value={planForm.exercises}
            rows={4}
            onChange={(e) => setPlanForm({ ...planForm, exercises: e.target.value })}
          />
          <button
            disabled={loading.plan}
            className={`px-4 py-2 rounded text-white ${
              loading.plan ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {loading.plan ? "Adding..." : "Add Plan"}
          </button>
        </form>
        <ul className="mt-4 space-y-3">
          {plans.length === 0 && <li className="text-gray-500">No plans yet</li>}
          {plans.map((p) => (
            <li key={p.id} className="border p-3 rounded bg-gray-50">
              <strong>{p.title}</strong>
              <ul className="ml-4 text-sm list-disc">
                {p.exercises.map((ex) => (
                  <li key={ex.id}>
                    {ex.name} — {ex.sets}x{ex.reps}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>

      {/* Assign Plan */}
      <section className="bg-white shadow rounded p-6">
        <h2 className="text-xl font-semibold mb-4">Assign Plan to Client</h2>
        <form onSubmit={assignPlan} className="space-y-3">
          <select
            className="border p-2 w-full rounded"
            value={assignment.clientId}
            onChange={(e) => setAssignment({ ...assignment, clientId: e.target.value })}
          >
            <option value="">Select Client</option>
            {clients.map((c) => (
              <option key={c.clientId} value={c.clientId}>
                {c.client.name}
              </option>
            ))}
          </select>

          <select
            className="border p-2 w-full rounded"
            value={assignment.planId}
            onChange={(e) => setAssignment({ ...assignment, planId: e.target.value })}
          >
            <option value="">Select Plan</option>
            {plans.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title}
              </option>
            ))}
          </select>

          <button
            disabled={loading.assign}
            className={`px-4 py-2 rounded text-white ${
              loading.assign ? "bg-gray-400" : "bg-purple-500 hover:bg-purple-600"
            }`}
          >
            {loading.assign ? "Assigning..." : "Assign Plan"}
          </button>
        </form>
      </section>
    </div>
  );
}
