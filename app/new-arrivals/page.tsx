import ProductsGrid from "../components/products/ProductsGrid";
import { products } from "../data/products";

export default function NewArrivalsPage() {
  const newArrivals = products.filter(
    (product) => product.badge === "New"
  );

  return (
    <main className="bg-white text-neutral-950">
      <section className="px-6 pb-24 pt-16 sm:px-8 lg:px-10 lg:pb-32 lg:pt-24">
        <div className="mx-auto max-w-7xl">

          {/* Header */}
          <div className="mb-12 max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-neutral-500">
              Just In
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              New Arrivals
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-neutral-500 sm:text-lg">
              Discover the latest additions to the LuxeStore
              collection, selected for modern style and effortless
              everyday wear.
            </p>
          </div>

          {/* Products */}
          <ProductsGrid products={newArrivals} />

        </div>
      </section>
    </main>
  );
}