import { NextResponse } from "next/server";

import { prisma } from "../../../../../lib/prisma";
import { requireAdmin } from "../../../../../lib/auth/admin";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

/* =====================================================
   UPDATE PRODUCT
===================================================== */

export async function PUT(
  request: Request,
  { params }: RouteContext
) {
  try {
    await requireAdmin();

    const { id } = await params;

    const body = await request.json();

    const {
      name,
      slug,
      category,
      description,
      price,
      oldPrice,
      badge,
      images,
      colors,
      sizes,
      inStock,
    } = body;

    /* ---------------- VALIDATION ---------------- */

    if (!name || !slug || !category || !price) {
      return NextResponse.json(
        {
          error:
            "Name, slug, category, and price are required.",
        },
        { status: 400 }
      );
    }

    /* ---------------- CHECK PRODUCT ---------------- */

    const existingProduct =
      await prisma.product.findUnique({
        where: {
          id,
        },
      });

    if (!existingProduct) {
      return NextResponse.json(
        {
          error: "Product not found.",
        },
        { status: 404 }
      );
    }

    /* ---------------- CHECK SLUG ---------------- */

    const slugOwner =
      await prisma.product.findFirst({
        where: {
          slug: String(slug).trim().toLowerCase(),
          NOT: {
            id,
          },
        },
      });

    if (slugOwner) {
      return NextResponse.json(
        {
          error:
            "Another product already uses this slug.",
        },
        { status: 409 }
      );
    }

    /* ---------------- UPDATE ---------------- */

    const product = await prisma.product.update({
      where: {
        id,
      },

      data: {
        name: String(name).trim(),

        slug: String(slug)
          .trim()
          .toLowerCase(),

        category: String(category).trim(),

        description:
          description?.toString().trim() || null,

        price: Number(price),

        oldPrice:
          oldPrice !== undefined &&
          oldPrice !== null &&
          String(oldPrice).trim() !== ""
            ? Number(oldPrice)
            : null,

        badge:
          badge?.toString().trim() || null,

        images: Array.isArray(images)
          ? images
          : String(images || "")
              .split(",")
              .map((item: string) => item.trim())
              .filter(Boolean),

        colors: Array.isArray(colors)
          ? colors
          : String(colors || "")
              .split(",")
              .map((item: string) => item.trim())
              .filter(Boolean),

        sizes: Array.isArray(sizes)
          ? sizes
          : String(sizes || "")
              .split(",")
              .map((item: string) => item.trim())
              .filter(Boolean),

        inStock: Boolean(inStock),
      },
    });

    return NextResponse.json({
      success: true,
      product,
    });
  } catch (error) {
    console.error(
      "UPDATE PRODUCT ERROR:",
      error
    );

    return NextResponse.json(
      {
        error: "Unable to update product.",
      },
      { status: 500 }
    );
  }
}

/* =====================================================
   DELETE PRODUCT
===================================================== */

export async function DELETE(
  _request: Request,
  { params }: RouteContext
) {
  try {
    /* ---------------- ADMIN CHECK ---------------- */

    await requireAdmin();

    const { id } = await params;

    /* ---------------- CHECK PRODUCT ---------------- */

    const product =
      await prisma.product.findUnique({
        where: {
          id,
        },
      });

    if (!product) {
      return NextResponse.json(
        {
          error: "Product not found.",
        },
        { status: 404 }
      );
    }

    /* ---------------- DELETE ---------------- */

    await prisma.product.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(
      "DELETE PRODUCT ERROR:",
      error
    );

    return NextResponse.json(
      {
        error: "Unable to delete product.",
      },
      { status: 500 }
    );
  }
}