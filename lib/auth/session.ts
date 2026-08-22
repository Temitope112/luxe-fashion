import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const SESSION_COOKIE = "luxestore_session";

const secret = process.env.AUTH_SECRET;

if (!secret) {
  throw new Error("AUTH_SECRET is not defined");
}

const encodedSecret = new TextEncoder().encode(secret);

export interface SessionPayload {
  userId: string;
  role: "USER" | "ADMIN";
}

export async function createSession(
  payload: SessionPayload
) {
  const token = await new SignJWT({
    userId: payload.userId,
    role: payload.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedSecret);

  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();

  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (!token) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(
      token,
      encodedSecret
    );

    if (
      typeof payload.userId !== "string" ||
      (payload.role !== "USER" &&
        payload.role !== "ADMIN")
    ) {
      return null;
    }

    return {
      userId: payload.userId,
      role: payload.role,
    };
  } catch {
    return null;
  }
}

export async function destroySession() {
  const cookieStore = await cookies();

  cookieStore.delete(SESSION_COOKIE);
}