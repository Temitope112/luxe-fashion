"use client";

import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="shrink-0"
      aria-label="LuxeStore home"
    >
      <div>
        <h1 className="text-lg font-bold tracking-wide text-gray-900 sm:text-xl">
          LuxeStore
        </h1>

        <p className="text-[10px] text-gray-500 sm:text-xs">
          Premium Fashion
        </p>
      </div>
    </Link>
  );
}