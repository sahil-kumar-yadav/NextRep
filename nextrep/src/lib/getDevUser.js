// lib/getDevUser.js
import prisma from "./prisma";

/**
 * Returns the first user with the given role.
 * If none exists, creates one.
 * role: "TRAINER" | "CLIENT"
 */
export async function getDevUser(role = "TRAINER") {
  let user = await prisma.user.findFirst({ where: { role } });
  if (!user) {
    user = await prisma.user.create({
      data: { name: `Dev ${role}`, email: `dev+${role.toLowerCase()}@local`, role },
    });
  }
  return user;
}
