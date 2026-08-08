import { notFound } from "next/navigation";

import { products } from "../../data/products";
import ProductGallery from "../../components/products/ProductGallery";
import ProductInfo from "../../components/products/ProductInfo";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { slug } = await params;

  const product = products.find(
    (item) => item.slug === slug
  );

  if (!product) {
    notFound();
  }

  return (
    <main className="bg-white text-neutral-950">
      <section className="px-4 py-10 sm:px-6 sm:py-14 md:px-8 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-7xl">

          {/* Product Layout */}
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start lg:gap-16 xl:gap-20">

            {/* Product Gallery */}
            <div className="min-w-0">
              <ProductGallery product={product} />
            </div>

            {/* Product Information */}
            <div className="min-w-0 lg:sticky lg:top-28">
              <ProductInfo product={product} />
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}