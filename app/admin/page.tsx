import Link from "next/link";
import {
  ArrowRight,
  CircleDollarSign,
  Clock3,
  Package,
  ShoppingBag,
  Users,
  CheckCircle2,
  XCircle,
  CreditCard,
} from "lucide-react";

import { requireAdmin } from "../../lib/auth/admin";
import { prisma } from "../../lib/prisma";

export default async function AdminDashboardPage() {
  await requireAdmin();

  /* =========================================================
     DATABASE
  ========================================================= */

  const [
    productCount,
    customerCount,
    orderCount,
    pendingCount,
    paidOrders,
    cancelledCount,
    recentOrders,
    recentCustomers,
  ] = await Promise.all([
    prisma.product.count(),

    prisma.user.count({
      where: {
        role: "USER",
      },
    }),

    prisma.order.count(),

    prisma.order.count({
      where: {
        status: "PENDING",
      },
    }),

    prisma.order.findMany({
      where: {
        paymentStatus: "PAID",
      },
      select: {
        total: true,
      },
    }),

    prisma.order.count({
      where: {
        status: "CANCELLED",
      },
    }),

    prisma.order.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 6,
      include: {
        items: true,
      },
    }),

    prisma.user.findMany({
      where: {
        role: "USER",
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    }),
  ]);

  /* =========================================================
     REVENUE
  ========================================================= */

  const totalRevenue = paidOrders.reduce(
    (total, order) => total + Number(order.total),
    0
  );

  /* =========================================================
     FORMATTERS
  ========================================================= */

  const formatCurrency = (value: number) => {
    return `$${value.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(date);
  };

  const getStatusClasses = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-amber-50 text-amber-700";

      case "PROCESSING":
        return "bg-blue-50 text-blue-700";

      case "SHIPPED":
        return "bg-violet-50 text-violet-700";

      case "DELIVERED":
        return "bg-emerald-50 text-emerald-700";

      case "CANCELLED":
        return "bg-red-50 text-red-700";

      default:
        return "bg-neutral-100 text-neutral-600";
    }
  };

  /* =========================================================
     DASHBOARD
  ========================================================= */

  return (
    <main className="min-h-screen bg-neutral-100 text-neutral-950">
      <div className="mx-auto max-w-[1500px] px-6 py-10 sm:px-8 lg:px-10 lg:py-12">

        {/* ===================================================
            HEADER
        =================================================== */}

        <div className="flex flex-col justify-between gap-6 border-b border-neutral-200 pb-8 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-400">
              LuxeStore Administration
            </p>

            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Dashboard
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-neutral-500">
              A complete overview of your marketplace activity,
              customers and orders.
            </p>
          </div>

          <Link
            href="/products"
            className="inline-flex w-fit items-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
          >
            View Store
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* ===================================================
            STAT CARDS
        =================================================== */}

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

          {/* Revenue */}
          <div className="rounded-3xl border border-neutral-200 bg-black p-6 text-white shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-neutral-400">
                  Total Revenue
                </p>

                <p className="mt-5 text-3xl font-bold tracking-tight">
                  {formatCurrency(totalRevenue)}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
                <CircleDollarSign className="h-5 w-5" />
              </div>
            </div>

            <p className="mt-5 text-xs text-neutral-500">
              From paid orders
            </p>
          </div>

          {/* Orders */}
          <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-neutral-500">
                  Total Orders
                </p>

                <p className="mt-5 text-3xl font-bold tracking-tight">
                  {orderCount}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-neutral-100">
                <ShoppingBag className="h-5 w-5" />
              </div>
            </div>

            <p className="mt-5 text-xs text-neutral-400">
              All orders
            </p>
          </div>

          {/* Customers */}
          <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-neutral-500">
                  Customers
                </p>

                <p className="mt-5 text-3xl font-bold tracking-tight">
                  {customerCount}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-neutral-100">
                <Users className="h-5 w-5" />
              </div>
            </div>

            <p className="mt-5 text-xs text-neutral-400">
              Registered customers
            </p>
          </div>

          {/* Products */}
          <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-neutral-500">
                  Products
                </p>

                <p className="mt-5 text-3xl font-bold tracking-tight">
                  {productCount}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-neutral-100">
                <Package className="h-5 w-5" />
              </div>
            </div>

            <p className="mt-5 text-xs text-neutral-400">
              Products in store
            </p>
          </div>
        </div>

        {/* ===================================================
            SECONDARY STATS
        =================================================== */}

        <div className="mt-4 grid gap-4 sm:grid-cols-3">

          <div className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-50">
                <Clock3 className="h-5 w-5 text-amber-600" />
              </div>

              <div>
                <p className="text-2xl font-bold">
                  {pendingCount}
                </p>

                <p className="text-xs text-neutral-500">
                  Pending orders
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              </div>

              <div>
                <p className="text-2xl font-bold">
                  {paidOrders.length}
                </p>

                <p className="text-xs text-neutral-500">
                  Paid orders
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-red-50">
                <XCircle className="h-5 w-5 text-red-600" />
              </div>

              <div>
                <p className="text-2xl font-bold">
                  {cancelledCount}
                </p>

                <p className="text-xs text-neutral-500">
                  Cancelled orders
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================
            CONTENT GRID
        =================================================== */}

        <div className="mt-8 grid gap-8 xl:grid-cols-[1.6fr_1fr]">

          {/* =================================================
              RECENT ORDERS
          ================================================= */}

          <section className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">

            <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-5">
              <div>
                <h2 className="font-semibold">
                  Recent Orders
                </h2>

                <p className="mt-1 text-xs text-neutral-400">
                  Latest marketplace activity
                </p>
              </div>

              <Link
                href="/admin/orders"
                className="text-xs font-semibold text-neutral-500 transition hover:text-black"
              >
                View all
              </Link>
            </div>

            {recentOrders.length === 0 ? (
              <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
                <ShoppingBag className="h-8 w-8 text-neutral-300" />

                <p className="mt-4 font-medium">
                  No orders yet
                </p>

                <p className="mt-1 text-sm text-neutral-400">
                  Orders will appear here once customers checkout.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-neutral-200">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex min-w-0 items-center gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-neutral-100">
                        <ShoppingBag className="h-4 w-4" />
                      </div>

                      <div className="min-w-0">
                        <p className="truncate font-semibold">
                          Order #
                          {order.id
                            .slice(-8)
                            .toUpperCase()}
                        </p>

                        <p className="mt-1 text-xs text-neutral-400">
                          {order.items.length}{" "}
                          {order.items.length === 1
                            ? "item"
                            : "items"}{" "}
                          · {formatDate(order.createdAt)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-5 sm:justify-end">
                      <div className="text-right">
                        <p className="font-semibold">
                          {formatCurrency(
                            Number(order.total)
                          )}
                        </p>

                        <span
                          className={`mt-1 inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold ${getStatusClasses(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* =================================================
              RIGHT COLUMN
          ================================================= */}

          <div className="space-y-8">

            {/* Quick Actions */}
            <section className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
              <h2 className="font-semibold">
                Quick Actions
              </h2>

              <p className="mt-1 text-xs text-neutral-400">
                Manage your marketplace
              </p>

              <div className="mt-5 grid gap-3">

                <Link
                  href="/admin/products"
                  className="group flex items-center justify-between rounded-2xl border border-neutral-200 p-4 transition hover:border-black"
                >
                  <div className="flex items-center gap-3">
                    <Package className="h-4 w-4" />

                    <span className="text-sm font-medium">
                      Manage Products
                    </span>
                  </div>

                  <ArrowRight className="h-4 w-4 text-neutral-400 transition group-hover:text-black" />
                </Link>

                <Link
                  href="/admin/orders"
                  className="group flex items-center justify-between rounded-2xl border border-neutral-200 p-4 transition hover:border-black"
                >
                  <div className="flex items-center gap-3">
                    <ShoppingBag className="h-4 w-4" />

                    <span className="text-sm font-medium">
                      Manage Orders
                    </span>
                  </div>

                  <ArrowRight className="h-4 w-4 text-neutral-400 transition group-hover:text-black" />
                </Link>

                <Link
                  href="/admin/customers"
                  className="group flex items-center justify-between rounded-2xl border border-neutral-200 p-4 transition hover:border-black"
                >
                  <div className="flex items-center gap-3">
                    <Users className="h-4 w-4" />

                    <span className="text-sm font-medium">
                      View Customers
                    </span>
                  </div>

                  <ArrowRight className="h-4 w-4 text-neutral-400 transition group-hover:text-black" />
                </Link>

                <Link
                  href="/admin/settings"
                  className="group flex items-center justify-between rounded-2xl border border-neutral-200 p-4 transition hover:border-black"
                >
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-4 w-4" />

                    <span className="text-sm font-medium">
                      Store Settings
                    </span>
                  </div>

                  <ArrowRight className="h-4 w-4 text-neutral-400 transition group-hover:text-black" />
                </Link>
              </div>
            </section>

            {/* Recent Customers */}
            <section className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-semibold">
                    New Customers
                  </h2>

                  <p className="mt-1 text-xs text-neutral-400">
                    Recently registered
                  </p>
                </div>

                <Link
                  href="/admin/customers"
                  className="text-xs font-semibold text-neutral-500 hover:text-black"
                >
                  View all
                </Link>
              </div>

              <div className="mt-5 space-y-4">
                {recentCustomers.length === 0 ? (
                  <p className="py-6 text-center text-sm text-neutral-400">
                    No customers yet.
                  </p>
                ) : (
                  recentCustomers.map((customer) => (
                    <div
                      key={customer.id}
                      className="flex items-center gap-3"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black text-sm font-semibold text-white">
                        {customer.firstName
                          .charAt(0)
                          .toUpperCase()}
                        {customer.lastName
                          .charAt(0)
                          .toUpperCase()}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold">
                          {customer.firstName}{" "}
                          {customer.lastName}
                        </p>

                        <p className="truncate text-xs text-neutral-400">
                          {customer.email}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>
          </div>
        </div>

        {/* ===================================================
            FOOTER NOTE
        =================================================== */}

        <div className="mt-8 flex flex-col gap-2 border-t border-neutral-200 pt-6 text-xs text-neutral-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            LuxeStore Administration
          </p>

          <p>
            Marketplace management dashboard
          </p>
        </div>
      </div>
    </main>
  );
}
