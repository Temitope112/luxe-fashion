"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Heart,
  Search,
  ShoppingBag,
  User,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { useCartStore } from "../../../store/cart-store";
import { useWishlistStore } from "../../../store/wishlist-store";
import CartDrawer from "../../../components/cart/CartDrawer";

export default function NavActions() {
  const router = useRouter();

  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [openCart, setOpenCart] = useState(false);

  /* ---------------- CART ---------------- */

  const items = useCartStore((state) => state.items);

  const cartCount = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  /* ---------------- WISHLIST ---------------- */

  const wishlist = useWishlistStore(
    (state) => state.items
  );

  const wishlistCount = wishlist.length;

  /* ---------------- SEARCH ---------------- */

  const handleSearchSubmit = (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    const query = search.trim();

    if (!query) return;

    router.push(
      `/products?search=${encodeURIComponent(query)}`
    );

    setSearchOpen(false);
  };

  return (
    <>
      {/* Search */}
      <Button
        variant="ghost"
        size="icon"
        aria-label="Search"
        className="rounded-full"
        onClick={() =>
          setSearchOpen((current) => !current)
        }
      >
        {searchOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <Search className="h-5 w-5" />
        )}
      </Button>

      {/* Wishlist */}
      <Button
        variant="ghost"
        size="icon"
        aria-label="Wishlist"
        className="relative rounded-full"
        onClick={() => router.push("/wishlist")}
      >
        <Heart
          className={`h-5 w-5 transition ${
            wishlistCount > 0
              ? "fill-black"
              : ""
          }`}
        />

        {wishlistCount > 0 && (
          <Badge
            className="
              absolute
              -right-1
              -top-1
              flex
              h-5
              min-w-5
              items-center
              justify-center
              rounded-full
              p-0
              text-[10px]
            "
          >
            {wishlistCount}
          </Badge>
        )}
      </Button>

      {/* Cart */}
      <Button
        variant="ghost"
        size="icon"
        aria-label="Shopping cart"
        className="relative rounded-full"
        onClick={() => setOpenCart(true)}
      >
        <ShoppingBag className="h-5 w-5" />

        {cartCount > 0 && (
          <Badge
            className="
              absolute
              -right-1
              -top-1
              flex
              h-5
              min-w-5
              items-center
              justify-center
              rounded-full
              p-0
              text-[10px]
            "
          >
            {cartCount}
          </Badge>
        )}
      </Button>

      {/* Account */}
      <Button
        variant="ghost"
        size="icon"
        aria-label="Account"
        className="rounded-full"
        onClick={() => router.push("/account")}
      >
        <User className="h-5 w-5" />
      </Button>

      {/* Search Panel */}
      {searchOpen && (
        <div
          className="
            absolute
            right-0
            top-14
            z-[60]
            w-[calc(100vw-2rem)]
            max-w-md
            rounded-2xl
            border
            border-neutral-200
            bg-white
            p-4
            shadow-xl
            sm:w-96
          "
        >
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center gap-3"
          >
            <Search
              size={19}
              className="shrink-0 text-neutral-400"
            />

            <input
              type="search"
              autoFocus
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search products..."
              className="
                min-w-0
                flex-1
                bg-transparent
                text-sm
                outline-none
                placeholder:text-neutral-400
              "
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="
                  text-neutral-400
                  transition
                  hover:text-black
                "
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}

            <button
              type="submit"
              disabled={!search.trim()}
              className="
                rounded-full
                bg-black
                px-4
                py-2
                text-xs
                font-medium
                text-white
                transition
                hover:bg-neutral-800
                disabled:cursor-not-allowed
                disabled:bg-neutral-200
                disabled:text-neutral-400
              "
            >
              Search
            </button>
          </form>

          <div className="mt-3 border-t border-neutral-100 pt-3">
            <p className="text-xs text-neutral-400">
              Search by product name or category
            </p>
          </div>
        </div>
      )}

      {/* Cart Drawer */}
      <CartDrawer
        open={openCart}
        onOpenChange={setOpenCart}
      />
    </>
  );
}