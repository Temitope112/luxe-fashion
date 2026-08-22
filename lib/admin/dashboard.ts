import { prisma } from "../prisma";

export async function getAdminDashboardStats() {
  const [products, users] = await Promise.all([
    prisma.product.count(),
    prisma.user.count(),
  ]);

  return {
    products,
    users,
  };
}