"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ShoppingBag } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { navLinks } from "./nav-links";

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-2 lg:hidden">
      {/* Cart */}
      <Button
        variant="ghost"
        size="icon"
        aria-label="Shopping cart"
        className="rounded-full"
      >
        <ShoppingBag className="h-5 w-5" />
      </Button>

      {/* Menu */}
      <Sheet>
        <SheetTrigger
          render={
            <Button
              variant="ghost"
              size="icon"
              aria-label="Open menu"
              className="rounded-full"
            />
          }
        >
          <Menu className="h-6 w-6" />
        </SheetTrigger>

        <SheetContent side="left" className="w-80">
          <SheetHeader>
            <SheetTitle>LuxeStore</SheetTitle>
          </SheetHeader>

          <nav className="mt-8 flex flex-col gap-2">
            {navLinks.map((link) => {
              const active = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-lg px-4 py-3 transition-colors ${
                    active
                      ? "bg-black text-white"
                      : "hover:bg-muted"
                  }`}
                >
                  {link.title}
                </Link>
              );
            })}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}