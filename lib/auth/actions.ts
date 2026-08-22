"use server";

import { redirect } from "next/navigation";

import { prisma } from "../prisma";
import {
  hashPassword,
  verifyPassword,
} from "./password";
import { createSession } from "./session";

export interface SignupState {
  error?: string;
}

/* =========================
   SIGN UP
========================= */

export async function signup(
  _previousState: SignupState,
  formData: FormData
): Promise<SignupState> {
  const firstName = String(
    formData.get("firstName") ?? ""
  ).trim();

  const lastName = String(
    formData.get("lastName") ?? ""
  ).trim();

  const email = String(
    formData.get("email") ?? ""
  )
    .trim()
    .toLowerCase();

  const password = String(
    formData.get("password") ?? ""
  );

  const confirmPassword = String(
    formData.get("confirmPassword") ?? ""
  );

  /* Validation */

  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !confirmPassword
  ) {
    return {
      error: "Please fill in all required fields.",
    };
  }

  if (!email.includes("@")) {
    return {
      error: "Please enter a valid email address.",
    };
  }

  if (password.length < 8) {
    return {
      error: "Password must be at least 8 characters.",
    };
  }

  if (password !== confirmPassword) {
    return {
      error: "Passwords do not match.",
    };
  }

  /* Check existing user */

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    return {
      error: "An account with this email already exists.",
    };
  }

  /* Hash password */

  const passwordHash = await hashPassword(password);

  /* Create user */

  const user = await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      passwordHash,
    },
  });

  /* Create session */

  await createSession({
    userId: user.id,
    role: user.role,
  });

  redirect("/account");
}

/* =========================
   SIGN IN
========================= */

export async function signin(
  _previousState: SignupState,
  formData: FormData
): Promise<SignupState> {
  const email = String(
    formData.get("email") ?? ""
  )
    .trim()
    .toLowerCase();

  const password = String(
    formData.get("password") ?? ""
  );

  /* Validation */

  if (!email || !password) {
    return {
      error: "Please enter your email and password.",
    };
  }

  /* Find user */

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return {
      error: "Invalid email or password.",
    };
  }

  /* Verify password */

  const passwordValid = await verifyPassword(
    password,
    user.passwordHash
  );

  if (!passwordValid) {
    return {
      error: "Invalid email or password.",
    };
  }

  /* Create session */

  await createSession({
    userId: user.id,
    role: user.role,
  });

  redirect("/account");
}