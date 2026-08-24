import Link from "next/link";

import SignupForm from "./SignupForm";

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-950">
      <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-16">
        <div className="mb-10 text-center">
          <Link
            href="/"
            className="mt-8 text-2xl font-bold tracking-[-0.04em]"
          >
            LUXESTORE
          </Link>

          <p className="mt-8 text-sm font-medium uppercase tracking-[0.3em] text-neutral-400">
            Create your account
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Join LuxeStore
          </h1>

          <p className="mt-4 text-sm leading-6 text-neutral-500">
            Create an account to manage your orders,
            wishlist, and preferences.
          </p>
        </div>

        <SignupForm />

        <p className="mt-8 text-center text-sm text-neutral-500">
          Already have an account?{" "}
          <Link
            href="/auth/signin"
            className="font-semibold text-black underline underline-offset-4 transition hover:text-neutral-500"
          >
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}