"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Menu, ShoppingBag, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { navLinks } from "./nav-links";
import { useCartStore } from "../../../store/cart-store";
import CartDrawer from "../../../components/cart/CartDrawer";

export default function MobileNav() {
  const pathname = usePathname();

  const [openCart, setOpenCart] = useState(false);

  const items = useCartStore((state) => state.items);

  const cartCount = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <>
      <Sheet>
        {/* Menu Button */}
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

        {/* Mobile Menu */}
        <SheetContent
          side="left"
          className="w-[85%] sm:max-w-sm"
        >
          <SheetHeader>
            <SheetTitle className="text-xl font-bold">
              LuxeStore
            </SheetTitle>
          </SheetHeader>

          <div className="px-4">
            {/* Navigation */}
            <nav className="mt-6 flex flex-col gap-2">
              {navLinks.map((link) => {
                const active = pathname === link.href;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`rounded-xl px-4 py-3 font-medium transition-colors ${
                      active
                        ? "bg-black text-white"
                        : "hover:bg-neutral-100"
                    }`}
                  >
                    {link.title}
                  </Link>
                );
              })}
            </nav>

            <div className="my-6 border-t" />

            {/* Mobile Actions */}
            <div className="flex flex-col gap-2">
              {/* Wishlist */}
              <button
                type="button"
                className="flex items-center gap-4 rounded-xl px-4 py-3 text-left transition hover:bg-neutral-100"
              >
                <Heart className="h-5 w-5" />

                <span className="font-medium">
                  Wishlist
                </span>

                <Badge className="ml-auto">
                  0
                </Badge>
              </button>

              {/* Cart */}
              <button
                type="button"
                onClick={() => setOpenCart(true)}
                className="flex items-center gap-4 rounded-xl px-4 py-3 text-left transition hover:bg-neutral-100"
              >
                <ShoppingBag className="h-5 w-5" />

                <span className="font-medium">
                  Cart
                </span>

                {cartCount > 0 && (
                  <Badge className="ml-auto">
                    {cartCount}
                  </Badge>
                )}
              </button>

              {/* Account */}
              <button
                type="button"
                className="flex items-center gap-4 rounded-xl px-4 py-3 text-left transition hover:bg-neutral-100"
              >
                <User className="h-5 w-5" />

                <span className="font-medium">
                  Account
                </span>
              </button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Cart Drawer */}
      <CartDrawer
        open={openCart}
        onOpenChange={setOpenCart}
      />
    </>
  );
}