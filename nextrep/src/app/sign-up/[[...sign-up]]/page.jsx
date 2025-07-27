"use client";

import { SignUp } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export default function CustomSignUpPage() {
  const [role, setRole] = useState("TRAINER");
  const router = useRouter();
  const { user, isSignedIn } = useUser();

  useEffect(() => {
    const createUser = async () => {
      try {
        if (!user?.id) return;

        // Check if user already exists to avoid duplicate calls
        const res = await fetch("/api/check-user");
        const data = await res.json();
        if (data.exists) {
          router.push("/redirect");
          return;
        }

        await fetch("/api/create-user", {
          method: "POST",
          body: JSON.stringify({ role }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        router.push("/redirect");
      } catch (error) {
        console.error("Error creating user:", error);
      }
    };

    if (isSignedIn) {
      createUser();
    }
  }, [isSignedIn, user, role, router]);

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
        appearance={{ elements: { card: "shadow-xl" } }}
        signUpFields={[{ type: "emailAddress" }]}
        routing="path"
        path="/sign-up"
      />
    </div>
  );
}
