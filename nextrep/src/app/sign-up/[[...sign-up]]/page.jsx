import { SignUp } from "@clerk/nextjs";
import { useState } from "react";

export default function SignUpPage() {
  const [role, setRole] = useState("TRAINER");

  // After sign-up, call your API to create the user with the selected role

  return (
    <div>
      <SignUp
        path="/sign-up"
        routing="path"
        forceRedirectUrl="/select-role"
      />
      <div>
        <label>
          <input
            type="radio"
            value="TRAINER"
            checked={role === "TRAINER"}
            onChange={() => setRole("TRAINER")}
          />
          Trainer
        </label>
        <label>
          <input
            type="radio"
            value="CLIENT"
            checked={role === "CLIENT"}
            onChange={() => setRole("CLIENT")}
          />
          Client
        </label>
      </div>
    </div>
  );
}
