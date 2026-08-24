import { NextResponse } from "next/server";

import { getCurrentUser } from "../../../../lib/auth/user";

export async function GET() {
  const user = await getCurrentUser();

  return NextResponse.json({
    authenticated: !!user,
    user: user
      ? {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
        }
      : null,
  });
}