"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

const navigation = [
  {
    label: "Overview",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Products",
    href: "/admin/products",
    icon: Package,
  },
  {
    label: "Orders",
    href: "/admin/orders",
    icon: ShoppingBag,
  },
  {
    label: "Customers",
    href: "/admin/customers",
    icon: Users,
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (loggingOut) return;

    setLoggingOut(true);

    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      router.push("/auth/signin");
      router.refresh();
    } catch (error) {
      console.error("LOGOUT ERROR:", error);
      setLoggingOut(false);
    }
  };

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-neutral-200 bg-white lg:flex lg:flex-col">
      {/* Brand */}
      <div className="flex h-20 items-center border-b border-neutral-200 px-7">
        <Link
          href="/admin"
          className="group flex items-center gap-3"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-black text-sm font-bold text-white">
            L
          </div>

          <div>
            <p className="text-base font-bold tracking-tight">
              LuxeStore
            </p>

            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-neutral-400">
              Administration
            </p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-4 py-7">
        <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
          Workspace
        </p>

        <nav className="space-y-1.5">
          {navigation.map((item) => {
            const Icon = item.icon;

            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-center justify-between rounded-xl px-3.5 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-black text-white"
                    : "text-neutral-600 hover:bg-neutral-100 hover:text-black"
                }`}
              >
                <span className="flex items-center gap-3">
                  <Icon
                    size={18}
                    strokeWidth={1.8}
                    className={
                      isActive
                        ? "text-white"
                        : "text-neutral-400 group-hover:text-black"
                    }
                  />

                  {item.label}
                </span>

                {isActive && (
                  <ChevronRight
                    size={15}
                    className="text-white/60"
                  />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom */}
      <div className="border-t border-neutral-200 p-4">
        {/* Admin Profile */}
        <div className="mb-3 flex items-center gap-3 rounded-xl bg-neutral-50 px-3 py-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black text-xs font-semibold text-white">
            A
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-neutral-900">
              Administrator
            </p>

            <p className="text-xs text-neutral-400">
              Admin Account
            </p>
          </div>
        </div>

        {/* Logout */}
        <button
          type="button"
          onClick={handleLogout}
          disabled={loggingOut}
          className="flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium text-neutral-500 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <LogOut size={18} strokeWidth={1.8} />

          {loggingOut ? "Signing out..." : "Sign out"}
        </button>
      </div>
    </aside>
  );
}
