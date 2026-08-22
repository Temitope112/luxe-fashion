import {
  BarChart3,
  Package,
  ShoppingCart,
  Users,
} from "lucide-react";

import { requireAdmin } from "../../lib/auth/admin";
import { getAdminDashboardStats } from "../../lib/admin/dashboard";

export default async function AdminPage() {
  const user = await requireAdmin();
const stats = await getAdminDashboardStats();
  return (
    <main className="min-h-screen bg-neutral-100 text-neutral-950">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10 lg:py-24">
        {/* Header */}
        <div className="border-b border-neutral-200 pb-10">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-neutral-400">
            LuxeStore Admin
          </p>

          <div className="mt-4 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Admin Dashboard
              </h1>

              <p className="mt-4 text-neutral-500">
                Welcome back, {user.firstName}.
              </p>
            </div>

            <span className="w-fit rounded-full bg-black px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white">
              Admin
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl bg-white p-7 shadow-sm">
            <div className="flex items-center justify-between">
              <Package className="h-5 w-5" />

              <span className="text-3xl font-bold">
                {stats.products}
              </span>
            </div>

            <p className="mt-6 text-sm font-medium text-neutral-500">
              Products
            </p>
          </div>

          <div className="rounded-3xl bg-white p-7 shadow-sm">
            <div className="flex items-center justify-between">
              <ShoppingCart className="h-5 w-5" />

              <span className="text-3xl font-bold">
                0
              </span>
            </div>

            <p className="mt-6 text-sm font-medium text-neutral-500">
              Orders
            </p>
          </div>

          <div className="rounded-3xl bg-white p-7 shadow-sm">
            <div className="flex items-center justify-between">
              <Users className="h-5 w-5" />

              <span className="text-3xl font-bold">
                {stats.users}
              </span>
            </div>

            <p className="mt-6 text-sm font-medium text-neutral-500">
               Registered Users
            </p>
          </div>

          <div className="rounded-3xl bg-white p-7 shadow-sm">
            <div className="flex items-center justify-between">
              <BarChart3 className="h-5 w-5" />

              <span className="text-3xl font-bold">
                $0
              </span>
            </div>

            <p className="mt-6 text-sm font-medium text-neutral-500">
              Revenue
            </p>
          </div>
        </div>

        {/* Welcome */}
        <section className="mt-10 rounded-3xl bg-neutral-950 p-8 text-white sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-500">
            Admin Access
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight">
            You have full administrative access.
          </h2>

          <p className="mt-4 max-w-2xl leading-7 text-neutral-400">
            This dashboard is currently protected by your
            authenticated session and ADMIN role. The actual
            management features will be added next.
          </p>
        </section>
      </div>
    </main>
  );
}