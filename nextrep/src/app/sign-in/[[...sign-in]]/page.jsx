"use client";

import { SignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignInPage() {
  const router = useRouter();

  // Optional: Redirect to /redirect after successful sign-in (for role-based redirect)
  useEffect(() => {
    const handleRedirect = () => {
      // Clerk automatically handles auth session
      // You can optionally redirect manually if needed
      router.push("/redirect");
    };

    // Clerk auto-redirect can be set via `afterSignIn`
    // Or you can use event listener from Clerk events if needed
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <SignIn
        path="/sign-in"
        routing="path"
        appearance={{ elements: { card: "shadow-xl" } }}
        afterSignInUrl="/redirect" // ✅ Let this handle post-login redirection based on role
      />
    </div>
  );
}
