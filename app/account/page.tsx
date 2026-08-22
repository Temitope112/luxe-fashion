import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowRight,
  Heart,
  Package,
  Settings,
  ShoppingBag,
  User,
} from "lucide-react";

import { getCurrentUser } from "../../lib/auth/user";

const stats = [
     {
    label: "Orders",
    value: "12",
    icon: Package,
  },
  {
    label: "Wishlist",
    value: "4",
    icon: Heart,
  },
  {
    label: "Saved Items",
    value: "8",
    icon: ShoppingBag,
  },
];

const recentOrders = [
     {
    id: "#LX-1048",
    date: "Aug 04, 2026",
    items: "2 items",
    total: "$184.00",
    status: "Delivered",
  },
  {
    id: "#LX-1037",
    date: "Jul 28, 2026",
    items: "1 item",
    total: "$89.00",
    status: "Shipped",
  },
  {
    id: "#LX-1021",
    date: "Jul 15, 2026",
    items: "3 items",
    total: "$246.00",
    status: "Delivered",
  },
];

export default async function AccountPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/signin");
  }

  return (
    <main className="min-h-screen bg-white text-neutral-950">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10 lg:py-24">

        {/* Header */}
        <div className="flex flex-col justify-between gap-8 border-b border-neutral-200 pb-10 lg:flex-row lg:items-end">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-neutral-400">
              My Account
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-[-0.03em] sm:text-5xl lg:text-6xl">
              Welcome back, {user.firstName}.
            </h1>

            <p className="mt-5 max-w-xl leading-7 text-neutral-500">
              Manage your orders, wishlist, and personal details
              from one place.
            </p>
          </div>

          <Link
            href="/products"
            className="inline-flex w-fit items-center gap-2 rounded-full bg-black px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-neutral-800"
          >
            Continue Shopping
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-10 grid gap-px overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-200 sm:grid-cols-3">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="bg-white p-7 sm:p-8"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-neutral-100">
                    <Icon className="h-5 w-5" />
                  </div>

                  <span className="text-3xl font-bold tracking-tight">
                    {stat.value}
                  </span>
                </div>

                <p className="mt-6 text-sm font-medium text-neutral-500">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>

        {/* Main Content */}
        <div className="mt-16 grid gap-16 lg:grid-cols-[1.4fr_0.6fr]">

          {/* Orders */}
          <section>
            <div className="flex items-end justify-between border-b border-neutral-200 pb-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-400">
                  Activity
                </p>

                <h2 className="mt-2 text-2xl font-bold tracking-tight">
                  Recent Orders
                </h2>
              </div>

              <button className="hidden text-sm font-medium transition hover:text-neutral-500 sm:block">
                View all
              </button>
            </div>

            <div className="divide-y divide-neutral-200">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex flex-col gap-5 py-7 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-semibold">
                        {order.id}
                      </span>

                      <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-500">
                        {order.status}
                      </span>
                    </div>

                    <p className="mt-2 text-sm text-neutral-500">
                      {order.date} · {order.items}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-6 sm:justify-end">
                    <span className="font-semibold">
                      {order.total}
                    </span>

                    <button
                      type="button"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 transition hover:border-black hover:bg-black hover:text-white"
                      aria-label={`View order ${order.id}`}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Account Sidebar */}
          <aside>
            <div className="rounded-3xl bg-neutral-950 p-7 text-white sm:p-8">

              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-black">
                <User className="h-6 w-6" />
              </div>

              <h2 className="mt-7 text-2xl font-bold">
                Your Details
              </h2>

              <p className="mt-3 text-sm leading-6 text-neutral-400">
                Keep your personal information and preferences
                up to date.
              </p>

              <div className="mt-8 space-y-5 border-t border-white/10 pt-7">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
                    Name
                  </p>

                  <p className="mt-2 font-medium">
                    {user.firstName} {user.lastName}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
                    Email
                  </p>

                  <p className="mt-2 break-all font-medium">
                    {user.email}
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3.5 text-sm font-semibold text-black transition hover:bg-neutral-200"
              >
                <Settings className="h-4 w-4" />
                Account Settings
              </button>
            </div>
          </aside>
        </div>

        {/* Quick Links */}
        <section className="mt-16 border-t border-neutral-200 pt-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-400">
              Quick Access
            </p>

            <h2 className="mt-2 text-2xl font-bold tracking-tight">
              Manage your LuxeStore
            </h2>
          </div>

          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <Link
              href="/wishlist"
              className="group rounded-2xl border border-neutral-200 p-6 transition hover:border-black"
            >
              <Heart className="h-5 w-5" />

              <div className="mt-10 flex items-center justify-between">
                <span className="font-semibold">
                  Wishlist
                </span>

                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </div>
            </Link>

            <Link
              href="/products"
              className="group rounded-2xl border border-neutral-200 p-6 transition hover:border-black"
            >
              <ShoppingBag className="h-5 w-5" />

              <div className="mt-10 flex items-center justify-between">
                <span className="font-semibold">
                  Shop
                </span>

                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </div>
            </Link>

            <button
              type="button"
              className="group rounded-2xl border border-neutral-200 p-6 text-left transition hover:border-black"
            >
              <Package className="h-5 w-5" />

              <div className="mt-10 flex items-center justify-between">
                <span className="font-semibold">
                  Orders
                </span>

                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </div>
            </button>

            <button
              type="button"
              className="group rounded-2xl border border-neutral-200 p-6 text-left transition hover:border-black"
            >
              <Settings className="h-5 w-5" />

              <div className="mt-10 flex items-center justify-between">
                <span className="font-semibold">
                  Settings
                </span>

                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </div>
            </button>

          </div>
        </section>

      </div>
    </main>
  );
}