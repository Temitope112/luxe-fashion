"use client";

import { useMemo, useState } from "react";

import { products } from "../data/products";

import ProductsHero from "../components/products/ProductsHero";
import ProductsToolbar from "../components/products/ProductsToolBar";
import ProductsGrid from "../components/products/ProductsGrid";

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search
    if (search) {
      result = result.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Category
    if (activeCategory !== "All") {
      result = result.filter(
        (product) => product.category === activeCategory
      );
    }

    // Sorting
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;

      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;

      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;

      default:
        break;
    }

    return result;
  }, [search, activeCategory, sortBy]);

  return (
    <>
      <ProductsHero />

      <ProductsToolbar
        search={search}
        setSearch={setSearch}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        sortBy={sortBy}
        setSortBy={setSortBy}
        totalProducts={filteredProducts.length}
      />

      <ProductsGrid
        products={filteredProducts}
      />
    </>
  );
}