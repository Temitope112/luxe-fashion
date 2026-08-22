"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "../types/product";

interface WishlistStore {
  items: Product[];

  addItem: (product: Product) => void;
  removeItem: (slug: string) => void;
  toggleItem: (product: Product) => void;
  isInWishlist: (slug: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) =>
        set((state) => {
          const alreadyExists = state.items.some(
            (item) => item.slug === product.slug
          );

          if (alreadyExists) {
            return state;
          }

          return {
            items: [...state.items, product],
          };
        }),

      removeItem: (slug) =>
        set((state) => ({
          items: state.items.filter(
            (item) => item.slug !== slug
          ),
        })),

      toggleItem: (product) =>
        set((state) => {
          const exists = state.items.some(
            (item) => item.slug === product.slug
          );

          if (exists) {
            return {
              items: state.items.filter(
                (item) => item.slug !== product.slug
              ),
            };
          }

          return {
            items: [...state.items, product],
          };
        }),

      isInWishlist: (slug) =>
        get().items.some(
          (item) => item.slug === slug
        ),

      clearWishlist: () =>
        set({
          items: [],
        }),
    }),
    {
      name: "luxestore-wishlist",
    }
  )
);