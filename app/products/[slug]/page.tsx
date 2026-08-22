import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { getProductBySlug } from "../../../lib/products";
import ProductGallery from "../../components/products/ProductGallery";
import ProductInfo from "../../components/products/ProductInfo";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;

  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found | LuxeStore",
      description:
        "The product you're looking for could not be found.",
    };
  }

  const description =
    product.description ??
    `Shop ${product.name} from LuxeStore. Discover premium ${product.category.toLowerCase()} designed for modern style.`;

  return {
    title: `${product.name} | LuxeStore`,
    description,

    keywords: [
      product.name,
      product.category,
      "LuxeStore",
      "fashion",
      "online fashion store",
      "premium fashion",
    ],

    alternates: {
      canonical: `/products/${product.slug}`,
    },

    openGraph: {
      title: `${product.name} | LuxeStore`,
      description,
      type: "website",
      url: `/products/${product.slug}`,
      siteName: "LuxeStore",

      images: product.images.length
        ? [
            {
              url: product.images[0],
              width: 1200,
              height: 1500,
              alt: product.name,
            },
          ]
        : [],
    },

    twitter: {
      card: "summary_large_image",
      title: `${product.name} | LuxeStore`,
      description,
      images: product.images.length
        ? [product.images[0]]
        : [],
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { slug } = await params;

  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="bg-white text-neutral-950">
      <section className="px-4 py-10 sm:px-6 sm:py-14 md:px-8 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-7xl">
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