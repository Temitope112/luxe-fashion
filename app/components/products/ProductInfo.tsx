"use client";

import { useMemo, useState } from "react";
import {
  Heart,
  Minus,
  Plus,
  ShieldCheck,
  Star,
  Truck,
} from "lucide-react";

import type { Product } from "../../types/product";
import { useCartStore } from "../../store/cart-store";
import { useWishlistStore } from "../../store/wishlist-store";

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({
  product,
}: ProductInfoProps) {
  const [selectedColor, setSelectedColor] = useState(
    product.colors[0]
  );

  const [selectedSize, setSelectedSize] = useState(
    product.sizes[0]
  );

  const [quantity, setQuantity] = useState(1);

  /* Cart */
  const addItem = useCartStore(
    (state) => state.addItem
  );

  /* Wishlist */
  const toggleWishlist = useWishlistStore(
    (state) => state.toggleItem
  );

  const isInWishlist = useWishlistStore((state) =>
    state.items.some(
      (item) => item.slug === product.slug
    )
  );

  /* Discount */
  const discount = useMemo(() => {
    if (!product.oldPrice) return 0;

    return Math.round(
      ((product.oldPrice - product.price) /
        product.oldPrice) *
        100
    );
  }, [product.oldPrice, product.price]);

  /* Add to Cart */
  const handleAddToCart = () => {
    if (!product.inStock) return;

    addItem(
      product,
      quantity,
      selectedColor,
      selectedSize
    );
  };

  /* Wishlist */
  const handleWishlist = () => {
    toggleWishlist(product);
  };

  return (
    <div>
      {/* Category */}
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
        {product.category}
      </p>

      {/* Product Name */}
      <h1 className="mt-3 text-4xl font-bold tracking-tight lg:text-5xl">
        {product.name}
      </h1>

      {/* Rating */}
      <div className="mt-5 flex items-center gap-3">
        <div className="flex items-center gap-1">
          <Star
            size={18}
            className="fill-yellow-400 text-yellow-400"
          />

          <span className="font-medium">
            {product.rating}
          </span>
        </div>

        <span className="text-neutral-400">
          ({product.reviews} reviews)
        </span>
      </div>

      {/* Price */}
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <span className="text-4xl font-bold">
          ${product.price}
        </span>

        <span className="text-xl text-neutral-400 line-through">
          ${product.oldPrice}
        </span>

        {discount > 0 && (
          <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-600">
            -{discount}%
          </span>
        )}
      </div>

      {/* Description */}
      <p className="mt-8 max-w-xl leading-8 text-neutral-600">
        Designed for everyday luxury with premium
        craftsmanship, timeless styling and exceptional
        comfort.
      </p>

      {/* Colors */}
      <div className="mt-10">
        <h3 className="font-semibold">
          Color
        </h3>

        <div className="mt-4 flex flex-wrap gap-3">
          {product.colors.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() =>
                setSelectedColor(color)
              }
              className={`rounded-full border px-4 py-2 text-sm transition ${
                selectedColor === color
                  ? "border-black bg-black text-white"
                  : "border-neutral-300 hover:border-black"
              }`}
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div className="mt-10">
        <h3 className="font-semibold">
          Size
        </h3>

        <div className="mt-4 flex flex-wrap gap-3">
          {product.sizes.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() =>
                setSelectedSize(size)
              }
              className={`h-12 min-w-12 rounded-xl border px-5 transition ${
                selectedSize === size
                  ? "border-black bg-black text-white"
                  : "border-neutral-300 hover:border-black"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity */}
      <div className="mt-10 flex flex-wrap items-center gap-6">
        <div className="flex items-center rounded-xl border">
          <button
            type="button"
            onClick={() =>
              setQuantity((q) =>
                Math.max(1, q - 1)
              )
            }
            className="p-4 transition hover:bg-neutral-100"
            aria-label="Decrease quantity"
          >
            <Minus size={18} />
          </button>

          <span className="w-12 text-center font-medium">
            {quantity}
          </span>

          <button
            type="button"
            onClick={() =>
              setQuantity((q) => q + 1)
            }
            className="p-4 transition hover:bg-neutral-100"
            aria-label="Increase quantity"
          >
            <Plus size={18} />
          </button>
        </div>

        <span
          className={
            product.inStock
              ? "font-medium text-green-600"
              : "font-medium text-red-500"
          }
        >
          {product.inStock
            ? "In Stock"
            : "Out of Stock"}
        </span>
      </div>

      {/* Actions */}
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        {/* Add to Cart */}
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className="flex-1 rounded-xl bg-black px-8 py-4 font-semibold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-200 disabled:text-neutral-400"
        >
          {product.inStock
            ? "Add to Cart"
            : "Out of Stock"}
        </button>

        {/* Buy Now */}
        <button
          type="button"
          className="flex-1 rounded-xl border border-black px-8 py-4 font-medium transition hover:bg-black hover:text-white"
        >
          Buy Now
        </button>

        {/* Wishlist */}
        <button
          type="button"
          onClick={handleWishlist}
          aria-label={
            isInWishlist
              ? "Remove from wishlist"
              : "Add to wishlist"
          }
          className={`flex h-14 w-full items-center justify-center rounded-xl border transition sm:w-14 ${
            isInWishlist
              ? "border-black bg-black text-white"
              : "border-neutral-300 hover:border-black hover:bg-neutral-100"
          }`}
        >
          <Heart
            className={
              isInWishlist
                ? "fill-current"
                : ""
            }
          />
        </button>
      </div>

      {/* Shipping */}
      <div className="mt-12 space-y-5 rounded-3xl border p-6">
        <div className="flex items-center gap-4">
          <Truck />

          <div>
            <p className="font-semibold">
              Free Shipping
            </p>

            <p className="text-sm text-neutral-500">
              On orders over $150
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <ShieldCheck />

          <div>
            <p className="font-semibold">
              Secure Checkout
            </p>

            <p className="text-sm text-neutral-500">
              100% protected payment
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}