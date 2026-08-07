"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function PromoBanner() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="overflow-hidden rounded-[40px] bg-stone-100"
        >
          <div className="grid items-center lg:grid-cols-2">
            {/* Left Content */}
            <div className="p-10 md:p-16 lg:p-20">
              <span className="inline-block rounded-full bg-black px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white">
                Fall 2026 Collection
              </span>

              <h2 className="mt-8 text-4xl font-bold leading-tight text-stone-900 md:text-6xl">
                Luxury Fashion
                <br />
                Designed For
                <br />
                Everyday Life.
              </h2>

              <p className="mt-8 max-w-xl text-lg leading-8 text-stone-600">
                Discover timeless essentials crafted with premium materials,
                elegant silhouettes, and modern comfort. Build a wardrobe that
                never goes out of style.
              </p>

              <Link
                href="/products"
                className="mt-10 inline-flex items-center gap-3 rounded-full bg-black px-8 py-4 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-neutral-800"
              >
                Shop Collection
                <ArrowRight size={20} />
              </Link>

              {/* Stats */}
              <div className="mt-14 grid grid-cols-3 gap-6 border-t border-stone-300 pt-8">
                <div>
                  <h3 className="text-3xl font-bold">10k+</h3>
                  <p className="mt-2 text-sm text-stone-500">
                    Happy Customers
                  </p>
                </div>

                <div>
                  <h3 className="text-3xl font-bold">500+</h3>
                  <p className="mt-2 text-sm text-stone-500">
                    Premium Products
                  </p>
                </div>

                <div>
                  <h3 className="text-3xl font-bold">4.9★</h3>
                  <p className="mt-2 text-sm text-stone-500">
                    Customer Rating
                  </p>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative h-[500px] lg:h-[720px]">
              <Image
                src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1200&q=80"
                alt="Luxury Fashion"
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}