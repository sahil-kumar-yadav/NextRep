import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import ClientNav from "@/components/layout/ClientNav";

export default async function ClientLayout({ children }) {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const user = await prisma.user.findUnique({ where: { clerkId: userId } });
  if (user?.role !== "CLIENT") redirect("/");

  return (
    <div>
      <ClientNav />
      <main className="p-6">{children}</main>
    </div>
  );
}
