import { getDevUser } from "@/lib/getDevUser";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const user = await getDevUser("TRAINER"); // change to CLIENT for testing

  if (user.role === "TRAINER") {
    redirect("/dashboard/trainer");
  } else {
    redirect("/dashboard/client");
  }
}
