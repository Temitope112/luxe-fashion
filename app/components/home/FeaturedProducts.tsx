"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import ProductCard from "../../components/products/ProductCard";
import { products } from "../../data/products";

const filters = [
  "All",
  "Women",
  "Men",
  "Accessories",
  "Footwear",
];

export default function FeaturedProducts() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProducts = useMemo(() => {
    if (activeFilter === "All") return products;

    return products.filter(
      (product) => product.category === activeFilter
    );
  }, [activeFilter]);

  return (
    <section className="bg-[#F8F8F8] py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Heading */}
        <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.3em] text-stone-500">
              Featured Collection
            </span>

            <h2 className="mt-4 text-4xl font-bold text-neutral-900 md:text-5xl">
              Discover Our Best Sellers
            </h2>

            <p className="mt-4 max-w-2xl text-lg text-neutral-600">
              Handpicked fashion pieces loved by thousands of customers.
            </p>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-full border border-black px-6 py-3 font-semibold transition hover:bg-black hover:text-white"
          >
            View All
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* Filter Tabs */}
        <div className="mt-14 flex flex-wrap justify-center gap-3 lg:justify-start">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 ${
                activeFilter === filter
                  ? "bg-black text-white shadow-lg"
                  : "bg-white text-neutral-700 hover:bg-neutral-100"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Products */}
        <div className="mt-14 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 flex justify-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-full bg-black px-8 py-4 font-semibold text-white transition hover:-translate-y-1 hover:shadow-xl"
          >
            Explore All Products
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
}