import Link from "next/link";
import {
  ArrowRight,
  Package,
  Plus,
} from "lucide-react";

import { requireAdmin } from "../../../lib/auth/admin";
import { prisma } from "../../../lib/prisma";
import DeleteProductButton from "./DeleteProductButton";
export default async function AdminProductsPage() {
  await requireAdmin();

  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-neutral-100 text-neutral-950">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10 lg:py-24">

        {/* Header */}
        <div className="flex flex-col justify-between gap-6 border-b border-neutral-200 pb-10 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-neutral-400">
              LuxeStore Admin
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
              Products
            </h1>

            <p className="mt-4 max-w-xl text-neutral-500">
              Manage the products available in your LuxeStore
              marketplace.
            </p>
          </div>

          <Link
            href="/admin/products/new"
            className="inline-flex w-fit items-center gap-2 rounded-full bg-black px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-neutral-800"
          >
            <Plus className="h-4 w-4" />
            Add Product
          </Link>
        </div>

        {/* Product count */}
        <div className="mt-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
            <Package className="h-5 w-5" />
          </div>

          <div>
            <p className="text-sm font-semibold">
              {products.length}{" "}
              {products.length === 1 ? "product" : "products"}
            </p>

            <p className="text-xs text-neutral-500">
              Currently in your catalog
            </p>
          </div>
        </div>

        {/* Products */}
        <section className="mt-8 overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">

          {products.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-neutral-100">
                <Package className="h-6 w-6" />
              </div>

              <h2 className="mt-6 text-xl font-bold">
                No products yet
              </h2>

              <p className="mt-2 max-w-md text-sm text-neutral-500">
                Start building your catalog by adding your
                first product.
              </p>

              <Link
                href="/admin/products/new"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
              >
                Add your first product
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ) : (
            <>
              {/* Desktop header */}
              <div className="hidden border-b border-neutral-200 px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400 md:grid md:grid-cols-[2fr_1fr_1fr_1fr_auto] md:gap-6">
                <span>Product</span>
                <span>Category</span>
                <span>Price</span>
                <span>Stock</span>
                <span />
              </div>

              <div className="divide-y divide-neutral-200">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="grid gap-5 px-6 py-6 md:grid-cols-[2fr_1fr_1fr_1fr_auto] md:items-center md:gap-6"
                  >
                    {/* Product */}
                    <div>
                      <div className="flex items-center gap-4">
                        {product.images[0] ? (
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="h-14 w-14 rounded-2xl object-cover"
                          />
                        ) : (
                          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-100">
                            <Package className="h-5 w-5 text-neutral-400" />
                          </div>
                        )}

                        <div className="min-w-0">
                          <p className="truncate font-semibold">
                            {product.name}
                          </p>

                          <p className="mt-1 truncate text-xs text-neutral-400">
                            /{product.slug}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Category */}
                    <div>
                      <p className="text-xs uppercase tracking-wider text-neutral-400 md:hidden">
                        Category
                      </p>

                      <p className="mt-1 text-sm font-medium md:mt-0">
                        {product.category}
                      </p>
                    </div>

                    {/* Price */}
                    <div>
                      <p className="text-xs uppercase tracking-wider text-neutral-400 md:hidden">
                        Price
                      </p>

                      <p className="mt-1 text-sm font-semibold md:mt-0">
                        ${product.price.toFixed(2)}
                      </p>
                    </div>

                    {/* Stock */}
                    <div>
                      <p className="text-xs uppercase tracking-wider text-neutral-400 md:hidden">
                        Stock
                      </p>

                      <span
                        className={`mt-1 inline-flex rounded-full px-3 py-1 text-xs font-semibold md:mt-0 ${
                          product.inStock
                            ? "bg-neutral-100 text-neutral-700"
                            : "bg-red-50 text-red-600"
                        }`}
                      >
                        {product.inStock
                          ? "In Stock"
                          : "Out of Stock"}
                      </span>
                    </div>

                   {/* Actions */}
<div className="flex items-center gap-2">
  <Link
    href={`/admin/products/${product.id}/edit`}
    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 transition hover:border-black hover:bg-black hover:text-white"
    aria-label={`Edit ${product.name}`}
  >
    <ArrowRight className="h-4 w-4" />
  </Link>

  <DeleteProductButton
    productId={product.id}
    productName={product.name}
  />
</div>
                  </div>
                ))}
              </div>
            </>
          )}
        </section>
      </div>
    </main>
  );
}