"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCartStore } from "../../store/cart-store";

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CartDrawer({
  open,
  onOpenChange,
}: CartDrawerProps) {
  const items = useCartStore((state) => state.items);

  const increaseQuantity = useCartStore(
    (state) => state.increaseQuantity
  );

  const decreaseQuantity = useCartStore(
    (state) => state.decreaseQuantity
  );

  const removeItem = useCartStore(
    (state) => state.removeItem
  );

  const subtotal = items.reduce(
    (total, item) =>
      total + item.product.price * item.quantity,
    0
  );

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="flex w-full flex-col border-l border-neutral-200 bg-white px-6 sm:max-w-md"
      >
        {/* Header */}
        <SheetHeader className="border-b border-neutral-100 px-0 pb-5">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-neutral-400">
                LuxeStore
              </p>

              <SheetTitle className="mt-1 text-2xl font-semibold tracking-tight">
                Shopping Bag
              </SheetTitle>
            </div>

            {items.length > 0 && (
              <span className="text-sm text-neutral-400">
                {items.reduce(
                  (total, item) => total + item.quantity,
                  0
                )}{" "}
                items
              </span>
            )}
          </div>
        </SheetHeader>

        {/* Empty Cart */}
        {items.length === 0 ? (
          <div className="flex flex-1 items-center justify-center">
            <div className="max-w-xs text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100">
                <span className="text-xl">🛍</span>
              </div>

              <h3 className="mt-6 text-lg font-semibold">
                Your bag is empty
              </h3>

              <p className="mt-2 text-sm leading-6 text-neutral-500">
                Discover something you love and add it to your
                shopping bag.
              </p>

              <Link
                href="/products"
                onClick={() => onOpenChange(false)}
                className="mt-6 inline-flex rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-neutral-800"
              >
                Explore Collection
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="flex-1 space-y-7 overflow-y-auto py-6">
              {items.map((item) => (
                <div
                  key={`${item.product.slug}-${item.selectedColor}-${item.selectedSize}`}
                  className="flex gap-4"
                >
                  {/* Product Image */}
                  <div className="relative h-28 w-24 shrink-0 overflow-hidden rounded-2xl bg-neutral-100">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="truncate text-sm font-semibold">
                          {item.product.name}
                        </h3>

                        <p className="mt-1 text-xs text-neutral-500">
                          {item.selectedColor} · Size{" "}
                          {item.selectedSize}
                        </p>
                      </div>

                      <span className="shrink-0 text-sm font-semibold">
                        $
                        {(
                          item.product.price *
                          item.quantity
                        ).toFixed(2)}
                      </span>
                    </div>

                    {/* Quantity + Remove */}
                    <div className="mt-5 flex items-center justify-between">
                      <div className="flex items-center rounded-full border border-neutral-200">
                        <button
                          type="button"
                          onClick={() =>
                            decreaseQuantity(
                              item.product.slug
                            )
                          }
                          className="flex h-8 w-8 items-center justify-center text-neutral-500 transition hover:text-black"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={13} />
                        </button>

                        <span className="w-8 text-center text-xs font-medium">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            increaseQuantity(
                              item.product.slug
                            )
                          }
                          className="flex h-8 w-8 items-center justify-center text-neutral-500 transition hover:text-black"
                          aria-label="Increase quantity"
                        >
                          <Plus size={13} />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          removeItem(item.product.slug)
                        }
                        className="flex items-center gap-1.5 text-xs text-neutral-400 transition hover:text-red-500"
                      >
                        <Trash2 size={14} />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="border-t border-neutral-200 pt-5">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-500">
                    Subtotal
                  </span>

                  <span className="font-semibold">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-500">
                    Shipping
                  </span>

                  <span className="text-neutral-500">
                    Calculated at checkout
                  </span>
                </div>

                <div className="flex items-center justify-between border-t border-neutral-100 pt-4">
                  <span className="font-medium">
                    Total
                  </span>

                  <span className="text-xl font-semibold tracking-tight">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Checkout */}
              <Link
                href="/checkout"
                onClick={() => onOpenChange(false)}
                className="mt-6 ml-auto flex w-full items-center justify-center rounded-full bg-black px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-neutral-800 sm:w-auto sm:min-w-44"
              >
                Proceed to Checkout
              </Link>

              <p className="mt-3 text-center text-[11px] text-neutral-400">
                Secure checkout · Free shipping on orders over
                $150
              </p>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}