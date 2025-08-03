"use client";

import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <SignIn
        path="/sign-in"
        routing="path"
        appearance={{ elements: { card: "shadow-xl" } }}
        redirectUrl="/redirect"
      />
    </div>
  );
}