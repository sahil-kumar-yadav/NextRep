import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function DashboardLayout({ children }) {
  const { userId } = auth();
  if (!userId) redirect("/");

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Trainer Dashboard</h1>
      {children}
    </main>
  );
}
