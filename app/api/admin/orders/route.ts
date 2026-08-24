
import { NextResponse } from "next/server";

import { prisma } from "../../../../lib/prisma";
import { requireAdmin } from "../../../../lib/auth/admin";

export async function GET() {
  try {
    await requireAdmin();

    const orders = await prisma.order.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        items: {
          select: {
            id: true,
            productId: true,
            productName: true,
            price: true,
            quantity: true,
            selectedColor: true,
            selectedSize: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("GET ADMIN ORDERS ERROR:", error);

    return NextResponse.json(
      {
        error: "Unable to retrieve orders.",
      },
      { status: 500 }
    );
  }
}
