"use client";

import ProductCard from "./ProductCard";
import type { Product } from "../../types/product";

interface ProductsGridProps {
  products: Product[];
}

export default function ProductsGrid({
  products,
}: ProductsGridProps) {
  if (products.length === 0) {
    return (
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-neutral-300 bg-neutral-50 py-24 text-center">
            <h3 className="text-2xl font-semibold text-neutral-900">
              No products found
            </h3>

            <p className="mt-3 max-w-md text-neutral-500">
              We couldn't find any products matching your search or selected
              category. Try adjusting your filters.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="pb-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </div>
    </section>
  );
}