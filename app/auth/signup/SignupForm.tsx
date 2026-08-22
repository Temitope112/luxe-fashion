"use client";

import { useActionState } from "react";

import { signup } from "../../../lib/auth/actions";

const initialState = {
  error: "",
};

export default function SignupForm() {
  const [state, formAction, pending] = useActionState(
    signup,
    initialState
  );

  return (
    <form action={formAction} className="space-y-5">
      {state?.error && (
        <div
          role="alert"
          className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
        >
          {state.error}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="firstName"
            className="text-sm font-medium"
          >
            First name
          </label>

          <input
            id="firstName"
            name="firstName"
            type="text"
            autoComplete="given-name"
            required
            className="mt-2 w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-neutral-400 focus:border-black"
            placeholder="John"
          />
        </div>

        <div>
          <label
            htmlFor="lastName"
            className="text-sm font-medium"
          >
            Last name
          </label>

          <input
            id="lastName"
            name="lastName"
            type="text"
            autoComplete="family-name"
            required
            className="mt-2 w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-neutral-400 focus:border-black"
            placeholder="Doe"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="email"
          className="text-sm font-medium"
        >
          Email address
        </label>

        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="mt-2 w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-neutral-400 focus:border-black"
          placeholder="john@example.com"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="text-sm font-medium"
        >
          Password
        </label>

        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          minLength={8}
          required
          className="mt-2 w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-neutral-400 focus:border-black"
          placeholder="At least 8 characters"
        />
      </div>

      <div>
        <label
          htmlFor="confirmPassword"
          className="text-sm font-medium"
        >
          Confirm password
        </label>

        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          minLength={8}
          required
          className="mt-2 w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-neutral-400 focus:border-black"
          placeholder="Repeat your password"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-black px-6 py-4 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Creating account..." : "Create account"}
      </button>
    </form>
  );
}