import Link from "next/link";

import SigninForm from "./SigninForm";

export default function SigninPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-950">
      <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-16">
        <div className="mb-10 text-center">
          <Link
            href="/"
            className="text-2xl font-bold tracking-[-0.04em]"
          >
            LUXESTORE
          </Link>

          <p className="mt-8 text-sm font-medium uppercase tracking-[0.3em] text-neutral-400">
            Welcome back
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Sign in to LuxeStore
          </h1>

          <p className="mt-4 text-sm leading-6 text-neutral-500">
            Access your orders, wishlist, and account details.
          </p>
        </div>

        <SigninForm />

        <p className="mt-8 text-center text-sm text-neutral-500">
          Don't have an account?{" "}
          <Link
            href="/auth/signup"
            className="font-semibold text-black underline underline-offset-4 transition hover:text-neutral-500"
          >
            Create one
          </Link>
        </p>
      </div>
    </main>
  );
}