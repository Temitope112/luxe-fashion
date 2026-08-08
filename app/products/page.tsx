import { Suspense } from "react";
import ProductsContent from "./ProductContent";

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-white">
          <section className="px-6 pb-24 pt-16 sm:px-8 lg:px-10 lg:pb-32 lg:pt-24">
            <div className="mx-auto max-w-7xl">
              <div className="h-4 w-40 animate-pulse rounded bg-neutral-100" />

              <div className="mt-6 h-14 w-72 animate-pulse rounded-lg bg-neutral-100" />

              <div className="mt-4 h-6 w-full max-w-xl animate-pulse rounded bg-neutral-100" />

              <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div key={index}>
                    <div className="aspect-[4/5] animate-pulse rounded-3xl bg-neutral-100" />

                    <div className="mt-5 h-4 w-24 animate-pulse rounded bg-neutral-100" />

                    <div className="mt-3 h-5 w-40 animate-pulse rounded bg-neutral-100" />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}