
import { Users, UserRound } from "lucide-react";

import { requireAdmin } from "../../../lib/auth/admin";
import { prisma } from "../../../lib/prisma";

export default async function AdminCustomersPage() {
  await requireAdmin();

  const customers = await prisma.user.findMany({
    where: {
      role: "USER",
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      _count: {
        select: {
          orders: true,
        },
      },
    },
  });

  return (
    <main className="min-h-screen bg-neutral-100 text-neutral-950">
      <div className="mx-auto max-w-7xl px-6 py-10 sm:px-8 lg:px-10 lg:py-14">

        {/* Header */}
        <div className="border-b border-neutral-200 pb-8">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-neutral-400">
            LuxeStore Admin
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Customers
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-neutral-500">
            View and manage the customers using your LuxeStore
            marketplace.
          </p>
        </div>

        {/* Stats */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-neutral-100">
                <Users className="h-5 w-5" />
              </div>

              <span className="text-xs font-medium uppercase tracking-wider text-neutral-400">
                Total
              </span>
            </div>

            <p className="mt-6 text-3xl font-bold tracking-tight">
              {customers.length}
            </p>

            <p className="mt-1 text-sm text-neutral-500">
              Registered customers
            </p>
          </div>

          <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-neutral-100">
                <UserRound className="h-5 w-5" />
              </div>

              <span className="text-xs font-medium uppercase tracking-wider text-neutral-400">
                Platform
              </span>
            </div>

            <p className="mt-6 text-3xl font-bold tracking-tight">
              {customers.filter((customer) => customer._count.orders > 0).length}
            </p>

            <p className="mt-1 text-sm text-neutral-500">
              Customers with orders
            </p>
          </div>
        </div>

        {/* Customer List */}
        <section className="mt-8 overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">

          {customers.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-neutral-100">
                <Users className="h-6 w-6 text-neutral-400" />
              </div>

              <h2 className="mt-6 text-xl font-bold">
                No customers yet
              </h2>

              <p className="mt-2 max-w-md text-sm leading-6 text-neutral-500">
                Customers will appear here when users create
                accounts on your marketplace.
              </p>
            </div>
          ) : (
            <>
              {/* Desktop Header */}
              <div className="hidden border-b border-neutral-200 px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400 md:grid md:grid-cols-[2fr_2fr_1fr_1fr] md:gap-6">
                <span>Customer</span>
                <span>Email</span>
                <span>Orders</span>
                <span>Joined</span>
              </div>

              <div className="divide-y divide-neutral-200">
                {customers.map((customer) => {
                  const initials =
                    `${customer.firstName.charAt(0)}${customer.lastName.charAt(0)}`.toUpperCase();

                  return (
                    <div
                      key={customer.id}
                      className="grid gap-5 px-6 py-6 md:grid-cols-[2fr_2fr_1fr_1fr] md:items-center md:gap-6"
                    >
                      {/* Customer */}
                      <div className="flex items-center gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-black text-xs font-bold text-white">
                          {initials}
                        </div>

                        <div className="min-w-0">
                          <p className="truncate font-semibold">
                            {customer.firstName}{" "}
                            {customer.lastName}
                          </p>

                          <p className="mt-1 text-xs text-neutral-400">
                            Customer
                          </p>
                        </div>
                      </div>

                      {/* Email */}
                      <div>
                        <p className="text-xs uppercase tracking-wider text-neutral-400 md:hidden">
                          Email
                        </p>

                        <p className="mt-1 truncate text-sm text-neutral-600 md:mt-0">
                          {customer.email}
                        </p>
                      </div>

                      {/* Orders */}
                      <div>
                        <p className="text-xs uppercase tracking-wider text-neutral-400 md:hidden">
                          Orders
                        </p>

                        <span className="mt-1 inline-flex rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold md:mt-0">
                          {customer._count.orders}{" "}
                          {customer._count.orders === 1
                            ? "order"
                            : "orders"}
                        </span>
                      </div>

                      {/* Joined */}
                      <div>
                        <p className="text-xs uppercase tracking-wider text-neutral-400 md:hidden">
                          Joined
                        </p>

                        <p className="mt-1 text-sm text-neutral-500 md:mt-0">
                          {new Intl.DateTimeFormat("en", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          }).format(customer.createdAt)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </section>
      </div>
    </main>
  );
}
