"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

import { categories } from "../../data/categories";

export default function Categories() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-16 text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.3em] text-stone-500">
            Categories
          </span>

          <h2 className="mt-4 text-4xl font-bold text-neutral-900 md:text-5xl">
            Shop by Category
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-600">
            Explore curated collections designed for every occasion and every
            style.
          </p>
        </div>

        {/* Editorial Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              whileHover={{ y: -8 }}
              className={`group relative overflow-hidden rounded-[32px] ${
                category.name === "New Arrivals"
                  ? "md:col-span-2 lg:col-span-1 lg:row-span-2 lg:h-[620px]"
                  : "h-[300px]"
              }`}
            >
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover transition duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <p className="text-sm opacity-80">
                  {category.products}+ Products
                </p>

                <h3 className="mt-2 text-3xl font-bold">
                  {category.name}
                </h3>

                <Link
                  href={`/categories/${category.slug}`}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold opacity-0 transition-all duration-300 group-hover:opacity-100"
                >
                  Shop Now
                  <ArrowRight size={18} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}