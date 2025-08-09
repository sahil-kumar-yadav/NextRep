"use client";
import { useState, useEffect } from "react";

export default function ClientDashboard() {
  const [logs, setLogs] = useState([]);
  const [plans, setPlans] = useState([]);
  const [logForm, setLogForm] = useState({ date: "", notes: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchLogs(), fetchPlans()]).finally(() => setLoading(false));
  }, []);

  const fetchLogs = async () => {
    const res = await fetch("/api/progress");
    setLogs(await res.json());
  };

  const fetchPlans = async () => {
    const res = await fetch("/api/assignments");
    const data = await res.json();
    setPlans(data.map((a) => a.plan));
  };

  const addLog = async (e) => {
    e.preventDefault();
    await fetch("/api/progress", {
      method: "POST",
      body: JSON.stringify(logForm),
    });
    setLogForm({ date: "", notes: "" });
    fetchLogs();
  };

  if (loading) {
    return <div className="p-6 text-gray-500">Loading dashboard...</div>;
  }

  return (
    <div className="p-6 space-y-12">
      <h1 className="text-3xl font-bold">Client Dashboard</h1>

      {/* My Plans */}
      <section className="bg-white shadow rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">📋 My Assigned Plans</h2>
        {plans.length === 0 ? (
          <p className="text-gray-500">No plans assigned yet. Please check back later.</p>
        ) : (
          <div className="space-y-4">
            {plans.map((p) => (
              <div
                key={p.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
              >
                <strong className="block text-lg">{p.title}</strong>
                <ul className="mt-2 text-sm text-gray-600 space-y-1">
                  {p.exercises.map((ex) => (
                    <li key={ex.id}>
                      {ex.name} — <span className="font-medium">{ex.sets}x{ex.reps}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Progress Logs */}
      <section className="bg-white shadow rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">📅 Log Your Progress</h2>
        <form onSubmit={addLog} className="space-y-3">
          <input
            className="border border-gray-300 rounded p-2 w-full"
            type="date"
            value={logForm.date}
            onChange={(e) => setLogForm({ ...logForm, date: e.target.value })}
            required
          />
          <textarea
            className="border border-gray-300 rounded p-2 w-full"
            placeholder="Workout notes..."
            value={logForm.notes}
            onChange={(e) => setLogForm({ ...logForm, notes: e.target.value })}
            required
          />
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
          >
            Add Log
          </button>
        </form>

        <div className="mt-6">
          {logs.length === 0 ? (
            <p className="text-gray-500">No progress logged yet.</p>
          ) : (
            <ul className="space-y-2">
              {logs.map((l) => (
                <li
                  key={l.id}
                  className="border border-gray-200 rounded-lg p-3"
                >
                  <strong>{new Date(l.date).toLocaleDateString()}</strong>
                  <p className="text-gray-700">{l.notes}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}
