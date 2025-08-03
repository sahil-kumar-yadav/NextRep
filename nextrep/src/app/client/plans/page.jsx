import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/db";

export default async function RedirectPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user) {
    redirect("/sign-up");
  }

  if (user.role === "TRAINER") {
    redirect("/dashboard");
  } else if (user.role === "CLIENT") {
    redirect("/client");
  }

  redirect("/");
}