"use client";

import {
  Bell,
  Search,
  X,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
} from "react";

const searchItems = [
  {
    label: "Products",
    description: "Manage your store products",
    href: "/admin/products",
    keywords: ["product", "products", "inventory", "catalog"],
  },
  {
    label: "Orders",
    description: "View and manage customer orders",
    href: "/admin/orders",
    keywords: ["order", "orders", "purchase", "sales"],
  },
  {
    label: "Customers",
    description: "Manage registered customers",
    href: "/admin/customers",
    keywords: ["customer", "customers", "users", "buyers"],
  },
  {
    label: "Settings",
    description: "Manage store settings",
    href: "/admin/settings",
    keywords: ["setting", "settings", "configuration", "store"],
  },
];

export default function AdminHeader() {
  const [search, setSearch] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyboard = (event: KeyboardEvent) => {
      const isShortcut =
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "k";

      if (isShortcut) {
        event.preventDefault();
        searchRef.current?.focus();
      }

      if (
        event.key === "Escape" &&
        document.activeElement === searchRef.current
      ) {
        searchRef.current?.blur();
        setSearch("");
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyboard
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyboard
      );
    };
  }, []);

  const filteredResults =
    search.trim() === ""
      ? searchItems
      : searchItems.filter((item) =>
          item.keywords.some((keyword) =>
            keyword.includes(search.toLowerCase().trim())
          )
        );

  const clearSearch = () => {
    setSearch("");
    searchRef.current?.focus();
  };

  return (
    <header className="sticky top-0 z-30 border-b border-neutral-200/80 bg-white/90 backdrop-blur-xl">
      <div className="flex h-[76px] items-center justify-between gap-6 px-5 sm:px-7 lg:px-8">

        {/* =================================================
            LEFT
        ================================================= */}

        <div className="hidden min-w-fit lg:block">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-neutral-400">
            LuxeStore
          </p>

          <p className="mt-0.5 text-sm font-semibold text-neutral-900">
            Administration
          </p>
        </div>

        {/* =================================================
            SEARCH
        ================================================= */}

        <div className="relative w-full max-w-xl">
          <div
            className={`flex h-11 items-center rounded-2xl border bg-neutral-50 px-3 transition-all ${
              isFocused
                ? "border-neutral-400 bg-white shadow-sm ring-4 ring-neutral-100"
                : "border-neutral-200 hover:border-neutral-300"
            }`}
          >
            <Search
              size={18}
              strokeWidth={1.8}
              className="shrink-0 text-neutral-400"
            />

            <input
              ref={searchRef}
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              onFocus={() => setIsFocused(true)}
              onBlur={() => {
                setTimeout(
                  () => setIsFocused(false),
                  150
                );
              }}
              placeholder="Search products, orders, customers..."
              className="min-w-0 flex-1 bg-transparent px-3 text-sm text-neutral-900 outline-none placeholder:text-neutral-400"
            />

            {search && (
              <button
                type="button"
                onClick={clearSearch}
                className="mr-1 flex h-7 w-7 items-center justify-center rounded-lg text-neutral-400 transition hover:bg-neutral-200 hover:text-black"
                aria-label="Clear search"
              >
                <X size={15} />
              </button>
            )}

            {!search && (
              <kbd className="hidden rounded-lg border border-neutral-200 bg-white px-2 py-1 text-[10px] font-medium text-neutral-400 sm:block">
                Ctrl K
              </kbd>
            )}
          </div>

          {/* =================================================
              SEARCH RESULTS
          ================================================= */}

          {isFocused && (
            <div className="absolute left-0 right-0 top-[calc(100%+10px)] overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl shadow-black/5">

              <div className="border-b border-neutral-100 px-4 py-3">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
                  {search
                    ? "Search Results"
                    : "Quick Navigation"}
                </p>
              </div>

              {filteredResults.length === 0 ? (
                <div className="px-5 py-8 text-center">
                  <Search className="mx-auto h-5 w-5 text-neutral-300" />

                  <p className="mt-3 text-sm font-medium">
                    No results found
                  </p>

                  <p className="mt-1 text-xs text-neutral-400">
                    Try products, orders or customers.
                  </p>
                </div>
              ) : (
                <div className="p-2">
                  {filteredResults.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => {
                        setSearch("");
                        searchRef.current?.blur();
                      }}
                      className="group flex items-center justify-between rounded-xl px-3 py-3 transition hover:bg-neutral-50"
                    >
                      <div>
                        <p className="text-sm font-semibold text-neutral-900">
                          {item.label}
                        </p>

                        <p className="mt-0.5 text-xs text-neutral-400">
                          {item.description}
                        </p>
                      </div>

                      <ArrowRight
                        size={16}
                        className="text-neutral-300 transition group-hover:translate-x-0.5 group-hover:text-black"
                      />
                    </Link>
                  ))}
                </div>
              )}

              <div className="border-t border-neutral-100 bg-neutral-50 px-4 py-2.5">
                <p className="text-[10px] text-neutral-400">
                  Press{" "}
                  <span className="font-semibold text-neutral-600">
                    Esc
                  </span>{" "}
                  to close
                </p>
              </div>
            </div>
          )}
        </div>

        {/* =================================================
            RIGHT
        ================================================= */}

        <div className="flex min-w-fit items-center gap-3">

          {/* Notifications */}
          <button
            type="button"
            aria-label="Notifications"
            className="relative flex h-10 w-10 items-center justify-center rounded-xl text-neutral-500 transition hover:bg-neutral-100 hover:text-black"
          >
            <Bell
              size={19}
              strokeWidth={1.8}
            />

            <span className="absolute right-2.5 top-2 h-1.5 w-1.5 rounded-full bg-black" />
          </button>

          {/* Divider */}
          <div className="hidden h-8 w-px bg-neutral-200 sm:block" />

          {/* Admin Profile */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-xs font-semibold text-white">
              A
            </div>

            <div className="hidden xl:block">
              <p className="text-sm font-semibold text-neutral-900">
                Administrator
              </p>

              <p className="text-[11px] text-neutral-400">
                Admin Account
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
