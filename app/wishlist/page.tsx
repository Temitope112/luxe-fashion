"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";

import { useWishlistStore } from "../store/wishlist-store";
import { useCartStore } from "../store/cart-store";

export default function WishlistPage() {
  const wishlist = useWishlistStore(
    (state) => state.items
  );

  const removeFromWishlist = useWishlistStore(
    (state) => state.removeItem
  );

  const addItem = useCartStore(
    (state) => state.addItem
  );

  if (wishlist.length === 0) {
    return (
      <main className="min-h-[70vh] px-6 py-24">
        <div className="mx-auto flex max-w-2xl flex-col items-center justify-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100">
            <Heart className="h-7 w-7 text-neutral-500" />
          </div>

          <p className="mt-8 text-sm font-medium uppercase tracking-[0.25em] text-neutral-400">
            Your Wishlist
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Nothing saved yet.
          </h1>

          <p className="mt-5 max-w-md leading-7 text-neutral-500">
            Save the pieces you love and come back to them
            whenever you&apos;re ready.
          </p>

          <Link
            href="/products"
            className="mt-8 rounded-full bg-black px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-neutral-800"
          >
            Explore Collection
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="px-6 py-16 sm:px-8 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="flex flex-col justify-between gap-6 border-b border-neutral-200 pb-8 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.25em] text-neutral-400">
              Saved Pieces
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
              Your Wishlist
            </h1>
          </div>

          <p className="text-sm text-neutral-500">
            {wishlist.length}{" "}
            {wishlist.length === 1
              ? "item"
              : "items"}{" "}
            saved
          </p>
        </div>

        {/* Products */}
        <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {wishlist.map((product) => (
            <div key={product.slug} className="group">

              {/* Image */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-neutral-100">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />

                <button
                  type="button"
                  onClick={() =>
                    removeFromWishlist(product.slug)
                  }
                  aria-label={`Remove ${product.name} from wishlist`}
                  className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-black shadow-sm backdrop-blur transition hover:bg-black hover:text-white"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              {/* Info */}
              <div className="mt-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.15em] text-neutral-400">
                      {product.category}
                    </p>

                    <h2 className="mt-2 font-semibold">
                      {product.name}
                    </h2>
                  </div>

                  <p className="font-semibold">
                    ${product.price}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    addItem(
                      product,
                      1,
                      product.colors[0],
                      product.sizes[0]
                    )
                  }
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-black px-5 py-3 text-sm font-semibold transition hover:bg-black hover:text-white"
                >
                  <ShoppingBag className="h-4 w-4" />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}