import {
  CheckCircle2,
  Clock3,
  CreditCard,
  Package,
  ShoppingBag,
  XCircle,
} from "lucide-react";

import { requireAdmin } from "../../../lib/auth/admin";
import { prisma } from "../../../lib/prisma";

export default async function AdminOrdersPage() {
  await requireAdmin();

  const orders = await prisma.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: true,
      items: true,
    },
  });

  const totalOrders = orders.length;

  const pendingOrders = orders.filter(
    (order) => order.status === "PENDING"
  ).length;

  const paidOrders = orders.filter(
    (order) => order.paymentStatus === "PAID"
  ).length;

  const cancelledOrders = orders.filter(
    (order) => order.status === "CANCELLED"
  ).length;

  const formatCurrency = (value: unknown) => {
    return `$${Number(value).toFixed(2)}`;
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
        return "bg-amber-50 text-amber-700 border-amber-200";

      case "PROCESSING":
        return "bg-blue-50 text-blue-700 border-blue-200";

      case "SHIPPED":
        return "bg-violet-50 text-violet-700 border-violet-200";

      case "DELIVERED":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";

      case "CANCELLED":
        return "bg-red-50 text-red-700 border-red-200";

      default:
        return "bg-neutral-100 text-neutral-600 border-neutral-200";
    }
  };

  const getPaymentClasses = (status: string) => {
    switch (status) {
      case "PAID":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";

      case "PENDING":
        return "bg-amber-50 text-amber-700 border-amber-200";

      case "FAILED":
        return "bg-red-50 text-red-700 border-red-200";

      case "UNPAID":
        return "bg-neutral-100 text-neutral-600 border-neutral-200";

      default:
        return "bg-neutral-100 text-neutral-600 border-neutral-200";
    }
  };

  return (
    <main className="min-h-screen bg-neutral-100 text-neutral-950">
      <div className="mx-auto max-w-7xl px-6 py-10 sm:px-8 lg:px-10 lg:py-14">

        {/* Header */}
        <div className="border-b border-neutral-200 pb-8">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-neutral-400">
            LuxeStore Admin
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Orders
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-neutral-500">
            Monitor customer orders, payment status and fulfillment
            from one place.
          </p>
        </div>

        {/* Stats */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

          {/* Total */}
          <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-neutral-100">
                <ShoppingBag className="h-5 w-5" />
              </div>

              <span className="text-xs font-medium uppercase tracking-wider text-neutral-400">
                All Orders
              </span>
            </div>

            <p className="mt-6 text-3xl font-bold tracking-tight">
              {totalOrders}
            </p>

            <p className="mt-1 text-sm text-neutral-500">
              Total orders
            </p>
          </div>

          {/* Pending */}
          <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50">
                <Clock3 className="h-5 w-5 text-amber-600" />
              </div>

              <span className="text-xs font-medium uppercase tracking-wider text-neutral-400">
                Pending
              </span>
            </div>

            <p className="mt-6 text-3xl font-bold tracking-tight">
              {pendingOrders}
            </p>

            <p className="mt-1 text-sm text-neutral-500">
              Awaiting processing
            </p>
          </div>

          {/* Paid */}
          <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50">
                <CreditCard className="h-5 w-5 text-emerald-600" />
              </div>

              <span className="text-xs font-medium uppercase tracking-wider text-neutral-400">
                Paid
              </span>
            </div>

            <p className="mt-6 text-3xl font-bold tracking-tight">
              {paidOrders}
            </p>

            <p className="mt-1 text-sm text-neutral-500">
              Successfully paid
            </p>
          </div>

          {/* Cancelled */}
          <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-50">
                <XCircle className="h-5 w-5 text-red-600" />
              </div>

              <span className="text-xs font-medium uppercase tracking-wider text-neutral-400">
                Cancelled
              </span>
            </div>

            <p className="mt-6 text-3xl font-bold tracking-tight">
              {cancelledOrders}
            </p>

            <p className="mt-1 text-sm text-neutral-500">
              Cancelled orders
            </p>
          </div>
        </div>

        {/* Orders Table */}
        <section className="mt-8 overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">

          {orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-neutral-100">
                <Package className="h-6 w-6 text-neutral-400" />
              </div>

              <h2 className="mt-6 text-xl font-bold">
                No orders yet
              </h2>

              <p className="mt-2 max-w-md text-sm leading-6 text-neutral-500">
                Customer orders will appear here once customers
                begin checking out.
              </p>
            </div>
          ) : (
            <>
              {/* Desktop Header */}
              <div className="hidden border-b border-neutral-200 px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400 lg:grid lg:grid-cols-[1.1fr_1.7fr_1fr_1fr_1fr_1fr] lg:gap-6">
                <span>Order</span>
                <span>Customer</span>
                <span>Items</span>
                <span>Total</span>
                <span>Status</span>
                <span>Payment</span>
              </div>

              <div className="divide-y divide-neutral-200">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="grid gap-5 px-6 py-6 lg:grid-cols-[1.1fr_1.7fr_1fr_1fr_1fr_1fr] lg:items-center lg:gap-6"
                  >
                    {/* Order */}
                    <div>
                      <p className="text-xs uppercase tracking-wider text-neutral-400 lg:hidden">
                        Order
                      </p>

                      <p className="mt-1 font-mono text-sm font-semibold lg:mt-0">
                        #{order.id.slice(-8).toUpperCase()}
                      </p>

                      <p className="mt-1 text-xs text-neutral-400">
                        {formatDate(order.createdAt)}
                      </p>
                    </div>

                    {/* Customer */}
                    <div className="min-w-0">
                      <p className="text-xs uppercase tracking-wider text-neutral-400 lg:hidden">
                        Customer
                      </p>

                      <p className="mt-1 truncate font-semibold lg:mt-0">
                        {order.firstName} {order.lastName}
                      </p>

                      <p className="mt-1 truncate text-xs text-neutral-400">
                        {order.email}
                      </p>
                    </div>

                    {/* Items */}
                    <div>
                      <p className="text-xs uppercase tracking-wider text-neutral-400 lg:hidden">
                        Items
                      </p>

                      <p className="mt-1 text-sm text-neutral-600 lg:mt-0">
                        {order.items.length}{" "}
                        {order.items.length === 1
                          ? "item"
                          : "items"}
                      </p>
                    </div>

                    {/* Total */}
                    <div>
                      <p className="text-xs uppercase tracking-wider text-neutral-400 lg:hidden">
                        Total
                      </p>

                      <p className="mt-1 font-semibold lg:mt-0">
                        {formatCurrency(order.total)}
                      </p>
                    </div>

                    {/* Order Status */}
                    <div>
                      <p className="text-xs uppercase tracking-wider text-neutral-400 lg:hidden">
                        Status
                      </p>

                      <span
                        className={`mt-1 inline-flex rounded-full border px-3 py-1 text-xs font-semibold lg:mt-0 ${getStatusClasses(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </div>

                    {/* Payment */}
                    <div>
                      <p className="text-xs uppercase tracking-wider text-neutral-400 lg:hidden">
                        Payment
                      </p>

                      <span
                        className={`mt-1 inline-flex rounded-full border px-3 py-1 text-xs font-semibold lg:mt-0 ${getPaymentClasses(
                          order.paymentStatus
                        )}`}
                      >
                        {order.paymentStatus}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </section>
      </div>
    </main>
  );
}
