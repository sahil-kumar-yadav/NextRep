// app/dashboard/page.js
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signin");
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">
        Welcome, {session.user.name} ({session.user.role})
      </h1>
    </div>
  );
}

