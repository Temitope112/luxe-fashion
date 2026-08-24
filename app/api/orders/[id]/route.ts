import { NextResponse } from "next/server";

import { prisma } from "../../../../lib/prisma";
import { getCurrentUser } from "../../../../lib/auth/user";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  request: Request,
  { params }: RouteContext
) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        {
          error: "You must be signed in.",
        },
        { status: 401 }
      );
    }

    const { id } = await params;

    const order = await prisma.order.findUnique({
      where: {
        id,
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!order) {
      return NextResponse.json(
        {
          error: "Order not found.",
        },
        { status: 404 }
      );
    }

    // Users can only view their own orders.
    if (order.userId !== user.id) {
      return NextResponse.json(
        {
          error: "You are not authorized to view this order.",
        },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("GET ORDER ERROR:", error);

    return NextResponse.json(
      {
        error: "Unable to retrieve order.",
      },
      { status: 500 }
    );
  }
}