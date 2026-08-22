"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

import ProductsGrid from "../components/products/ProductsGrid";
import type { Product } from "../types/product";

interface ProductsContentProps {
  products: Product[];
}

export default function ProductsContent({
  products,
}: ProductsContentProps) {
  const searchParams = useSearchParams();

  const category = searchParams.get("category");

  const filteredProducts = useMemo(() => {
    if (!category) {
      return products;
    }

    return products.filter(
      (product) => product.category === category
    );
  }, [category, products]);

  const pageTitle = category || "All Products";

  return (
    <main className="min-h-screen bg-white text-neutral-950">
      <section className="px-6 pb-24 pt-16 sm:px-8 lg:px-10 lg:pb-32 lg:pt-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-neutral-400">
            LuxeStore Collection
          </p>

          <div className="mt-4 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                {pageTitle}
              </h1>

              <p className="mt-4 max-w-xl text-neutral-500">
                {category
                  ? `Explore our ${category.toLowerCase()} collection.`
                  : "Discover our complete collection of carefully selected pieces."}
              </p>
            </div>

            <p className="text-sm text-neutral-500">
              {filteredProducts.length}{" "}
              {filteredProducts.length === 1
                ? "product"
                : "products"}
            </p>
          </div>

          <ProductsGrid products={filteredProducts} />
        </div>
      </section>
    </main>
  );
}