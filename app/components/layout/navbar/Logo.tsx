"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";

export default function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-3"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-white">
        <ShoppingBag className="h-5 w-5" />
      </div>

      <div>
        <h1 className="text-xl font-bold tracking-wide text-gray-900">
          LuxeStore
        </h1>

        <p className="text-xs text-gray-500">
          Premium Fashion
        </p>
      </div>
    </Link>
  );
}