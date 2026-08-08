"use client";

import { create } from "zustand";
import type { Product } from "../data/products";

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor: string;
  selectedSize: string;
}

interface CartStore {
  items: CartItem[];

  addItem: (
    product: Product,
    quantity: number,
    selectedColor: string,
    selectedSize: string
  ) => void;

  removeItem: (slug: string) => void;

  increaseQuantity: (slug: string) => void;

  decreaseQuantity: (slug: string) => void;

  clearCart: () => void;
}

export const useCartStore = create<CartStore>((set) => ({
  items: [],

  addItem: (
    product,
    quantity,
    selectedColor,
    selectedSize
  ) =>
    set((state) => {
      const existingItem = state.items.find(
        (item) =>
          item.product.slug === product.slug &&
          item.selectedColor === selectedColor &&
          item.selectedSize === selectedSize
      );

      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.product.slug === product.slug &&
            item.selectedColor === selectedColor &&
            item.selectedSize === selectedSize
              ? {
                  ...item,
                  quantity: item.quantity + quantity,
                }
              : item
          ),
        };
      }

      return {
        items: [
          ...state.items,
          {
            product,
            quantity,
            selectedColor,
            selectedSize,
          },
        ],
      };
    }),

  removeItem: (slug) =>
    set((state) => ({
      items: state.items.filter(
        (item) => item.product.slug !== slug
      ),
    })),

  increaseQuantity: (slug) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.product.slug === slug
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      ),
    })),

  decreaseQuantity: (slug) =>
    set((state) => ({
      items: state.items
        .map((item) =>
          item.product.slug === slug
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0),
    })),

  clearCart: () => set({ items: [] }),
}));