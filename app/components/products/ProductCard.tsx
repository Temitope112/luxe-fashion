"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Star } from "lucide-react";

import { useWishlistStore } from "../../store/wishlist-store";
import type { Product } from "../../types/product";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({
  product,
}: ProductCardProps) {
  const toggleWishlist = useWishlistStore(
    (state) => state.toggleItem
  );

  const isInWishlist = useWishlistStore((state) =>
    state.items.some(
      (item) => item.slug === product.slug
    )
  );

  const handleWishlist = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    toggleWishlist(product);
  };

  return (
    <div className="group relative">
      {/* Wishlist */}
      <button
        type="button"
        onClick={handleWishlist}
        aria-label={
          isInWishlist
            ? `Remove ${product.name} from wishlist`
            : `Add ${product.name} to wishlist`
        }
        className="absolute right-5 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition hover:scale-110"
      >
        <Heart
          size={20}
          className={`transition ${
            isInWishlist
              ? "fill-black text-black"
              : "text-black"
          }`}
        />
      </button>

      <Link href={`/products/${product.slug}`}>
        {/* Product Image */}
        <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-neutral-100">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            priority={false}
            sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
            className="object-cover transition duration-700 group-hover:scale-105 group-hover:opacity-0"
          />

          <Image
            src={product.images[1] ?? product.images[0]}
            alt={`${product.name} alternate`}
            fill
            priority={false}
            sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
            className="object-cover opacity-0 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
          />

          {product.badge && (
            <span className="absolute left-5 top-5 rounded-full bg-black px-4 py-2 text-xs font-semibold text-white">
              {product.badge}
            </span>
          )}
        </div>

        {/* Product Info */}
        <div className="mt-5">
          <p className="text-sm uppercase tracking-wide text-neutral-500">
            {product.category}
          </p>

          <h3 className="mt-2 text-lg font-semibold transition group-hover:text-neutral-700">
            {product.name}
          </h3>

          <div className="mt-3 flex items-center gap-2">
            <span className="text-xl font-bold">
              ${product.price}
            </span>

            {product.oldPrice !== null && (
              <span className="text-sm text-neutral-400 line-through">
                ${product.oldPrice}
              </span>
            )}
          </div>

          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Star
                size={16}
                className="fill-yellow-400 text-yellow-400"
              />

              <span className="text-sm font-medium">
                {product.rating}
              </span>

              <span className="text-sm text-neutral-500">
                ({product.reviews})
              </span>
            </div>

            <span
              className={`text-sm font-medium ${
                product.inStock
                  ? "text-green-600"
                  : "text-red-500"
              }`}
            >
              {product.inStock
                ? "In Stock"
                : "Out of Stock"}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}