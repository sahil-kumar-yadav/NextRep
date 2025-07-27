"use client";
import { SignUp } from "@clerk/nextjs";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CustomSignUpPage() {
  const [role, setRole] = useState("TRAINER");
  const router = useRouter();

  const handleComplete = async () => {
    await fetch("/api/create-user", {
      method: "POST",
      body: JSON.stringify({ role }),
      headers: { "Content-Type": "application/json" },
    });
    router.push("/redirect");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-6">
      <h1 className="text-3xl font-bold">Sign Up</h1>
      <label className="text-lg">
        Select your role:
        <select
          className="ml-2 border rounded px-2 py-1"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="TRAINER">Trainer</option>
          <option value="CLIENT">Client</option>
        </select>
      </label>
      <SignUp
        signUpFields={[{ type: "emailAddress" }]}
        appearance={{ elements: { card: "shadow-xl" } }}
        signUpContinueButtonMode="manual"
        afterSignUp={handleComplete}
      />
    </div>
  );
}