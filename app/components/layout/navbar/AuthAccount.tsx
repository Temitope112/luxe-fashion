import Link from "next/link";
import { User } from "lucide-react";

import { getCurrentUser } from "../../../../lib/auth/user";

export default async function AuthAccount() {
  const user = await getCurrentUser();

  return (
    <Link
      href={user ? "/account" : "/auth/signin"}
      aria-label={user ? "My account" : "Sign in"}
      className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-black/5"
    >
      <User className="h-5 w-5" />
    </Link>
  );
}