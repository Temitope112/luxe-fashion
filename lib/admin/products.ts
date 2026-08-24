import { prisma } from "../prisma";

export async function getAdminProducts() {
  return prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      name: true,
      slug: true,
      category: true,
      price: true,
      oldPrice: true,
      inStock: true,
      images: true,
      createdAt: true,
    },
  });
}