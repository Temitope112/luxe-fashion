import { prisma } from "./prisma";

export async function getProducts() {
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return products.map((product) => ({
    id: product.id,
    slug: product.slug,
    name: product.name,
    category: product.category,

    price: Number(product.price),

    oldPrice:
      product.oldPrice !== null
        ? Number(product.oldPrice)
        : null,

    rating: product.rating,
    reviews: product.reviews,

    badge: product.badge,

    colors: product.colors,
    sizes: product.sizes,

    inStock: product.inStock,

    images: product.images,

    description: product.description,
  }));
}

export async function getProductBySlug(slug: string) {
  const product = await prisma.product.findUnique({
    where: {
      slug,
    },
  });

  if (!product) {
    return null;
  }

  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    category: product.category,

    price: Number(product.price),

    oldPrice:
      product.oldPrice !== null
        ? Number(product.oldPrice)
        : null,

    rating: product.rating,
    reviews: product.reviews,

    badge: product.badge,

    colors: product.colors,
    sizes: product.sizes,

    inStock: product.inStock,

    images: product.images,

    description: product.description,
  };
}