import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Package,
} from "lucide-react";

interface SuccessPageProps {
  searchParams: Promise<{
    orderId?: string;
  }>;
}

export default async function OrderSuccessPage({
  searchParams,
}: SuccessPageProps) {
  const { orderId } = await searchParams;

  if (!orderId) {
    return (
      <main className="min-h-screen bg-white px-6 py-24 text-neutral-950">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <h1 className="text-3xl font-bold">
            Order not found
          </h1>

          <p className="mt-4 text-neutral-500">
            We couldn&apos;t find the order you&apos;re looking
            for.
          </p>

          <Link
            href="/products"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-black px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-neutral-800"
          >
            Continue Shopping
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white px-6 py-16 text-neutral-950 sm:px-8 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-4xl">
        {/* Success Header */}
        <div className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-neutral-100">
            <CheckCircle2 className="h-10 w-10" />
          </div>

          <p className="mt-8 text-sm font-medium uppercase tracking-[0.3em] text-neutral-400">
            Order Confirmed
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Thank you for your order.
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-neutral-500">
            Your order has been successfully received and
            is now being processed.
          </p>
        </div>

        {/* Order Number */}
        <div className="mt-10 rounded-3xl border border-neutral-200 bg-neutral-50 p-6 text-center sm:p-8">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-neutral-400">
            Order Number
          </p>

          <p className="mt-3 break-all font-mono text-sm font-semibold">
            {orderId}
          </p>

          <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-medium text-neutral-600 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            Payment Pending
          </div>
        </div>

        {/* Demo Payment Notice */}
        <div className="mt-6 rounded-3xl border border-neutral-200 p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-neutral-100">
              <Package className="h-5 w-5" />
            </div>

            <div>
              <h2 className="font-semibold">
                Order received
              </h2>

              <p className="mt-2 text-sm leading-6 text-neutral-500">
                Your order has been saved successfully. Online
                payment is currently unavailable in this demo,
                so the payment status remains pending.
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-neutral-800"
          >
            Continue Shopping
            <ArrowRight className="h-4 w-4" />
          </Link>

          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-neutral-200 px-7 py-3.5 text-sm font-semibold transition hover:border-black"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}