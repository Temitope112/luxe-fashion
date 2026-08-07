"use client";

import { Search } from "lucide-react";

interface ProductsToolbarProps {
  search: string;
  setSearch: (value: string) => void;

  activeCategory: string;
  setActiveCategory: (value: string) => void;

  sortBy: string;
  setSortBy: (value: string) => void;

  totalProducts: number;
}

const categories = [
  "All",
  "Women",
  "Men",
  "Accessories",
  "Footwear",
];

export default function ProductsToolbar({
  search,
  setSearch,
  activeCategory,
  setActiveCategory,
  sortBy,
  setSortBy,
  totalProducts,
}: ProductsToolbarProps) {
  return (
    <section className="bg-white py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 lg:px-8">

        {/* Top Row */}
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">

          <h2 className="text-lg font-semibold">
            Showing {totalProducts} Products
          </h2>

          <div className="flex w-full flex-col gap-4 lg:w-auto lg:flex-row">

            {/* Search */}
            <div className="relative">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500"
              />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="w-full rounded-full border px-12 py-3 outline-none transition focus:border-black lg:w-80"
              />
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-full border px-5 py-3 outline-none focus:border-black"
            >
              <option value="default">Featured</option>
              <option value="price-low">Price: Low → High</option>
              <option value="price-high">Price: High → Low</option>
              <option value="rating">Top Rated</option>
            </select>

          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-5 py-2 transition ${
                activeCategory === category
                  ? "bg-black text-white"
                  : "bg-stone-100 hover:bg-stone-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}