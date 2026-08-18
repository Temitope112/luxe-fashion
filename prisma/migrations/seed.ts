import "dotenv/config";

import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "../../lib/generated/prisma/client";

import { products } from "../../app/data/products";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined");
}

const adapter = new PrismaNeon({
  connectionString,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log("🌱 Starting database seed...");

  for (const product of products) {
    await prisma.product.upsert({
      where: {
        slug: product.slug,
      },

      update: {
        name: product.name,
        category: product.category,
        price: product.price,
        oldPrice: product.oldPrice,
        rating: product.rating,
        reviews: product.reviews,
        badge: product.badge,
        inStock: product.inStock,
        images: product.images,
        colors: product.colors,
        sizes: product.sizes,
      },

      create: {
        name: product.name,
        slug: product.slug,
        category: product.category,
        price: product.price,
        oldPrice: product.oldPrice,
        rating: product.rating,
        reviews: product.reviews,
        badge: product.badge,
        inStock: product.inStock,
        images: product.images,
        colors: product.colors,
        sizes: product.sizes,
      },
    });
  }

  console.log(`✅ Seeded ${products.length} products.`);
}

main()
  .catch((error) => {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });