"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export default function SelectRolePage() {
  const { user } = useUser();
  const router = useRouter();
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(false);

  const submitRole = async () => {
    if (!role) return;
    setLoading(true);

    const res = await fetch("/api/create-user", {
      method: "POST",
      body: JSON.stringify({
        clerkId: user.id,
        email: user.primaryEmailAddress.emailAddress,
        role,
      }),
    });

    if (res.ok) {
      router.push(role === "TRAINER" ? "/dashboard" : "/client");
    } else {
      alert("Something went wrong. Try again.");
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Select your role</h1>
      <div className="space-y-4">
        <button
          onClick={() => setRole("TRAINER")}
          className={`w-full py-2 px-4 border rounded ${
            role === "TRAINER" ? "bg-blue-600 text-white" : ""
          }`}
        >
          I am a Trainer
        </button>
        <button
          onClick={() => setRole("CLIENT")}
          className={`w-full py-2 px-4 border rounded ${
            role === "CLIENT" ? "bg-blue-600 text-white" : ""
          }`}
        >
          I am a Client
        </button>
        <button
          onClick={submitRole}
          disabled={!role || loading}
          className="w-full mt-4 bg-green-600 text-white py-2 rounded disabled:opacity-50"
        >
          {loading ? "Saving..." : "Continue"}
        </button>
      </div>
    </div>
  );
}
