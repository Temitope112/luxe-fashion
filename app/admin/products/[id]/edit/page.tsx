import { notFound } from "next/navigation";

import { requireAdmin } from "../../../../../lib/auth/admin";
import { prisma } from "../../../../../lib/prisma";

import ProductForm from "../../new/ProductForm";

interface EditProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditProductPage({
  params,
}: EditProductPageProps) {
  await requireAdmin();

  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });

  if (!product) {
    notFound();
  }

  const formattedProduct = {
    id: product.id,
    name: product.name,
    slug: product.slug,
    category: product.category,
    description: product.description,
    price: product.price.toString(),
    oldPrice: product.oldPrice?.toString() ?? null,
    badge: product.badge,
    images: product.images,
    colors: product.colors,
    sizes: product.sizes,
    inStock: product.inStock,
  };

  return (
    <main className="min-h-screen bg-neutral-100 text-neutral-950">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:px-8 lg:px-10 lg:py-24">

        {/* Header */}
        <div className="border-b border-neutral-200 pb-10">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-neutral-400">
            LuxeStore Admin
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Edit Product
          </h1>

          <p className="mt-4 text-neutral-500">
            Update the details for{" "}
            <span className="font-medium text-neutral-950">
              {product.name}
            </span>
            .
          </p>
        </div>

        <div className="mt-10">
          <ProductForm product={formattedProduct} />
        </div>
      </div>
    </main>
  );
}