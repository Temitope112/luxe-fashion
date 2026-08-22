import { redirect } from "next/navigation";

import { getCurrentUser } from "./user";

export async function requireAdmin() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/signin");
  }

  if (user.role !== "ADMIN") {
    redirect("/account");
  }

  return user;
}