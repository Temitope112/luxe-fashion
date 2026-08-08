import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    name: "Women",
    description: "Refined pieces for every occasion.",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=85",
  },
  {
    name: "Men",
    description: "Modern essentials with timeless appeal.",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&q=85",
  },
  {
    name: "Footwear",
    description: "Step into comfort and effortless style.",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&q=85",
  },
  {
    name: "Accessories",
    description: "The finishing details that complete the look.",
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=1200&q=85",
  },
];

export default function CategoriesPage() {
  return (
    <main className="bg-white text-neutral-950">
      {/* Hero */}
      <section className="px-6 pb-16 pt-16 sm:px-8 lg:px-10 lg:pb-20 lg:pt-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-neutral-500">
            Explore
          </p>

          <h1 className="mt-5 max-w-4xl text-5xl font-bold tracking-[-0.04em] sm:text-6xl lg:text-8xl">
            Find your style.
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-neutral-600 lg:text-xl">
            Explore our carefully selected collections and discover
            pieces designed for modern everyday living.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="px-6 pb-24 sm:px-8 lg:px-10 lg:pb-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 sm:grid-cols-2">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={`/products?category=${encodeURIComponent(
                  category.name
                )}`}
                className="group"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-neutral-100">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                  <div className="absolute inset-x-0 bottom-0 p-7 text-white sm:p-9">
                    <p className="text-xs font-medium uppercase tracking-[0.25em] text-white/70">
                      Collection
                    </p>

                    <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
                      {category.name}
                    </h2>

                    <p className="mt-3 max-w-sm text-sm leading-6 text-white/80">
                      {category.description}
                    </p>

                    <span className="mt-6 inline-flex items-center text-sm font-semibold">
                      Shop collection
                      <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom statement */}
      <section className="bg-neutral-950 px-6 py-24 text-white sm:px-8 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
            LuxeStore Collections
          </p>

          <h2 className="mt-5 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Curated pieces.
            <br />
            Considered style.
          </h2>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-neutral-400">
            From everyday essentials to statement pieces, discover
            fashion selected with quality, versatility, and timeless
            design in mind.
          </p>

          <Link
            href="/products"
            className="mt-9 inline-flex rounded-full bg-white px-8 py-4 font-semibold text-black transition hover:bg-neutral-200"
          >
            View All Products
          </Link>
        </div>
      </section>
    </main>
  );
}