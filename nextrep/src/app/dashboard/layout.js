import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import TrainerNav from "@/components/TrainerNav";
// import TrainerNav from "@/components/layout/TrainerNav";

export default async function TrainerLayout({ children }) {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const user = await prisma.user.findUnique({ where: { clerkId: userId } });
  if (user?.role !== "TRAINER") redirect("/");

  return (
    <div>
      <TrainerNav />
      <main className="p-6">{children}</main>
    </div>
  );
}
