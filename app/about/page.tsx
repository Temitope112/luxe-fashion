
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="bg-white text-neutral-950">
      {/* Hero */}
      <section className="px-6 pb-24 pt-16 sm:px-8 lg:px-10 lg:pb-32 lg:pt-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-neutral-500">
              About LuxeStore
            </p>

            <h1 className="mt-6 text-5xl font-bold tracking-[-0.04em] sm:text-6xl lg:text-8xl">
              Timeless style.
              <br />
              Made for you.
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-neutral-600 lg:text-xl">
              LuxeStore is a modern fashion destination built around
              timeless design, premium quality, and effortless everyday
              style.
            </p>
          </div>

          {/* Editorial Hero Image */}
          <div className="relative mt-16 h-[500px] overflow-hidden rounded-[2rem] bg-neutral-100 sm:h-[600px] lg:h-[700px]">
            <Image
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1800&q=85"
              alt="LuxeStore fashion collection"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1200px"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

            <div className="absolute bottom-8 left-8 max-w-md text-white sm:bottom-12 sm:left-12">
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/70">
                The LuxeStore Edit
              </p>

              <p className="mt-3 text-2xl font-semibold leading-tight sm:text-3xl">
                Pieces designed to become part of your everyday story.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="border-y border-neutral-200">
        <div className="mx-auto grid max-w-7xl lg:grid-cols-2">
          {/* Image */}
          <div className="relative min-h-[500px] overflow-hidden bg-neutral-100 lg:min-h-[650px]">
            <Image
              src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1400&q=85"
              alt="LuxeStore fashion"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />

            <div className="absolute left-6 top-6 rounded-full bg-white/90 px-5 py-2 text-xs font-medium uppercase tracking-[0.2em] backdrop-blur-sm sm:left-8 sm:top-8">
              Est. Luxe
            </div>
          </div>

          {/* Story Content */}
          <div className="flex items-center px-6 py-20 sm:px-10 lg:px-16 lg:py-24">
            <div className="max-w-xl">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-neutral-500">
                Our Story
              </p>

              <h2 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
                Fashion that feels effortless.
              </h2>

              <p className="mt-7 leading-8 text-neutral-600">
                We believe great style should never feel complicated.
                LuxeStore was created to bring carefully selected fashion
                pieces together in one refined shopping experience.
              </p>

              <p className="mt-5 leading-8 text-neutral-600">
                From everyday essentials to statement pieces, every item
                is selected with quality, versatility, and modern style
                in mind.
              </p>

              <Link
                href="/products"
                className="mt-8 inline-flex rounded-full bg-black px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-neutral-800"
              >
                Explore the Collection
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Philosophy */}
      <section className="px-6 py-24 sm:px-8 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-neutral-500">
                What We Stand For
              </p>

              <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
                Less noise.
                <br />
                More style.
              </h2>
            </div>

            <p className="max-w-2xl text-lg leading-8 text-neutral-600">
              We are intentional about what we put in front of you.
              LuxeStore is built around thoughtful design, quality,
              versatility, and a shopping experience that feels as
              considered as the products themselves.
            </p>
          </div>

          {/* Values */}
          <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-200 md:grid-cols-3">
            <div className="bg-white p-8 sm:p-10">
              <span className="text-xs font-semibold tracking-[0.2em] text-neutral-400">
                01
              </span>

              <h3 className="mt-12 text-xl font-semibold">
                Quality First
              </h3>

              <p className="mt-4 leading-7 text-neutral-600">
                We focus on products that combine quality materials,
                thoughtful details, and lasting appeal.
              </p>
            </div>

            <div className="bg-white p-8 sm:p-10">
              <span className="text-xs font-semibold tracking-[0.2em] text-neutral-400">
                02
              </span>

              <h3 className="mt-12 text-xl font-semibold">
                Timeless Style
              </h3>

              <p className="mt-4 leading-7 text-neutral-600">
                Our collections are built around pieces that remain
                relevant beyond passing trends.
              </p>
            </div>

            <div className="bg-white p-8 sm:p-10">
              <span className="text-xs font-semibold tracking-[0.2em] text-neutral-400">
                03
              </span>

              <h3 className="mt-12 text-xl font-semibold">
                Simple Experience
              </h3>

              <p className="mt-4 leading-7 text-neutral-600">
                From discovering products to checkout, we keep the
                shopping experience simple and enjoyable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statement */}
      <section className="px-6 pb-24 sm:px-8 lg:px-10 lg:pb-32">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-[2rem] bg-neutral-950 px-6 py-20 text-white sm:px-12 lg:px-20 lg:py-28">
            <div className="relative z-10 max-w-3xl">
              <p className="text-sm uppercase tracking-[0.3em] text-neutral-400">
                The LuxeStore Philosophy
              </p>

              <h2 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Your wardrobe should feel like you.
              </h2>

              <p className="mt-7 max-w-2xl text-lg leading-8 text-neutral-400">
                Discover pieces that complement your individuality,
                elevate your everyday look, and stay with you beyond
                the season.
              </p>

              <Link
                href="/products"
                className="mt-9 inline-flex rounded-full bg-white px-8 py-4 font-semibold text-black transition hover:bg-neutral-200"
              >
                Shop Collection
              </Link>
            </div>

            <div className="pointer-events-none absolute -bottom-32 -right-20 h-80 w-80 rounded-full border border-white/10 sm:h-96 sm:w-96" />
            <div className="pointer-events-none absolute -bottom-20 -right-8 h-64 w-64 rounded-full border border-white/10" />
          </div>
        </div>
      </section>
    </main>
  );
}

