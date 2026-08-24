import {
  Bell,
  Globe2,
  Lock,
  Settings,
  ShieldCheck,
  Store,
  UserRound,
} from "lucide-react";

import { requireAdmin } from "../../../lib/auth/admin";
import { prisma } from "../../../lib/prisma";

export default async function AdminSettingsPage() {
  const admin = await requireAdmin();

  const user = await prisma.user.findUnique({
    where: {
      id: admin.id,
    },
  });

  return (
    <main className="min-h-screen bg-neutral-100 text-neutral-950">
      <div className="mx-auto max-w-6xl px-6 py-10 sm:px-8 lg:px-10 lg:py-14">

        {/* Header */}
        <div className="border-b border-neutral-200 pb-8">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-neutral-400">
            LuxeStore Admin
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Settings
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-neutral-500">
            Manage your administrator profile and marketplace
            preferences.
          </p>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[240px_1fr]">

          {/* Settings Navigation */}
          <aside className="h-fit rounded-3xl border border-neutral-200 bg-white p-3 shadow-sm">
            <div className="space-y-1">

              <div className="flex items-center gap-3 rounded-2xl bg-black px-4 py-3 text-sm font-semibold text-white">
                <Settings className="h-4 w-4" />
                General
              </div>

              <div className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm text-neutral-500">
                <UserRound className="h-4 w-4" />
                Profile
              </div>

              <div className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm text-neutral-500">
                <Bell className="h-4 w-4" />
                Notifications
              </div>

              <div className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm text-neutral-500">
                <ShieldCheck className="h-4 w-4" />
                Security
              </div>
            </div>
          </aside>

          {/* Settings Content */}
          <div className="space-y-6">

            {/* Store */}
            <section className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-neutral-100">
                  <Store className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="text-lg font-semibold">
                    Store Information
                  </h2>

                  <p className="mt-1 text-sm leading-6 text-neutral-500">
                    Basic information about your marketplace.
                  </p>
                </div>
              </div>

              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-medium">
                    Store Name
                  </label>

                  <div className="mt-2 rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-700">
                    LuxeStore
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">
                    Store Type
                  </label>

                  <div className="mt-2 rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-700">
                    Premium Fashion Marketplace
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="text-sm font-medium">
                    Store Description
                  </label>

                  <div className="mt-2 rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm leading-6 text-neutral-600">
                    A premium fashion marketplace for discovering
                    carefully selected products.
                  </div>
                </div>
              </div>
            </section>

            {/* Admin Profile */}
            <section className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-neutral-100">
                  <UserRound className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="text-lg font-semibold">
                    Administrator Profile
                  </h2>

                  <p className="mt-1 text-sm leading-6 text-neutral-500">
                    Information about the current administrator.
                  </p>
                </div>
              </div>

              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-medium">
                    First Name
                  </label>

                  <div className="mt-2 rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-700">
                    {user?.firstName || "Admin"}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">
                    Last Name
                  </label>

                  <div className="mt-2 rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-700">
                    {user?.lastName || "User"}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="text-sm font-medium">
                    Email Address
                  </label>

                  <div className="mt-2 rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-700">
                    {user?.email || "No email available"}
                  </div>
                </div>
              </div>
            </section>

            {/* Security */}
            <section className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-neutral-100">
                  <Lock className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="text-lg font-semibold">
                    Security
                  </h2>

                  <p className="mt-1 text-sm leading-6 text-neutral-500">
                    Your administrator account and access controls.
                  </p>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <div className="flex items-center justify-between rounded-2xl border border-neutral-200 p-4">
                  <div>
                    <p className="text-sm font-semibold">
                      Administrator Access
                    </p>

                    <p className="mt-1 text-xs text-neutral-500">
                      Your account has administrator privileges.
                    </p>
                  </div>

                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                    Active
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-2xl border border-neutral-200 p-4">
                  <div>
                    <p className="text-sm font-semibold">
                      Account Role
                    </p>

                    <p className="mt-1 text-xs text-neutral-500">
                      Current permission level.
                    </p>
                  </div>

                  <span className="rounded-full bg-black px-3 py-1 text-xs font-semibold text-white">
                    ADMIN
                  </span>
                </div>
              </div>
            </section>

            {/* Marketplace */}
            <section className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-neutral-100">
                  <Globe2 className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="text-lg font-semibold">
                    Marketplace
                  </h2>

                  <p className="mt-1 text-sm leading-6 text-neutral-500">
                    Current storefront configuration.
                  </p>
                </div>
              </div>

              <div className="mt-8 divide-y divide-neutral-200 rounded-2xl border border-neutral-200">
                <div className="flex items-center justify-between p-4">
                  <div>
                    <p className="text-sm font-medium">
                      Currency
                    </p>

                    <p className="mt-1 text-xs text-neutral-500">
                      Default storefront currency.
                    </p>
                  </div>

                  <span className="text-sm font-semibold">
                    USD ($)
                  </span>
                </div>

                <div className="flex items-center justify-between p-4">
                  <div>
                    <p className="text-sm font-medium">
                      Free Shipping Threshold
                    </p>

                    <p className="mt-1 text-xs text-neutral-500">
                      Orders above this amount receive free shipping.
                    </p>
                  </div>

                  <span className="text-sm font-semibold">
                    $150
                  </span>
                </div>

                <div className="flex items-center justify-between p-4">
                  <div>
                    <p className="text-sm font-medium">
                      Standard Shipping
                    </p>

                    <p className="mt-1 text-xs text-neutral-500">
                      Default shipping charge.
                    </p>
                  </div>

                  <span className="text-sm font-semibold">
                    $10
                  </span>
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>
    </main>
  );
}
