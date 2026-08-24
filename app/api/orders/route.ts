import { NextResponse } from "next/server";

import { prisma } from "../../../lib/prisma";
import { getCurrentUser } from "../../../lib/auth/user";

interface CartItem {
  productId: string;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export async function POST(request: Request) {
  try {
    /* ---------------------------------------------
       AUTHENTICATION
    --------------------------------------------- */

    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        {
          error: "You must be signed in to place an order.",
        },
        { status: 401 }
      );
    }

    /* ---------------------------------------------
       REQUEST BODY
    --------------------------------------------- */

    const body = await request.json();

    const {
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      state,
      items,
    } = body as {
      firstName?: string;
      lastName?: string;
      email?: string;
      phone?: string;
      address?: string;
      city?: string;
      state?: string;
      items?: CartItem[];
    };

    /* ---------------------------------------------
       VALIDATION
    --------------------------------------------- */

    if (
      !firstName?.trim() ||
      !lastName?.trim() ||
      !email?.trim() ||
      !phone?.trim() ||
      !address?.trim() ||
      !city?.trim() ||
      !state?.trim()
    ) {
      return NextResponse.json(
        {
          error: "All customer and delivery fields are required.",
        },
        { status: 400 }
      );
    }

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        {
          error: "Your cart is empty.",
        },
        { status: 400 }
      );
    }

    /* ---------------------------------------------
       VALIDATE CART ITEMS
    --------------------------------------------- */

    for (const item of items) {
      if (
        !item.productId ||
        !Number.isInteger(item.quantity) ||
        item.quantity <= 0
      ) {
        return NextResponse.json(
          {
            error: "Invalid cart item.",
          },
          { status: 400 }
        );
      }
    }

    /* ---------------------------------------------
       FETCH PRODUCTS FROM DATABASE
    --------------------------------------------- */

    const productIds = [
      ...new Set(items.map((item) => item.productId)),
    ];

    const products = await prisma.product.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
    });

    if (products.length !== productIds.length) {
      return NextResponse.json(
        {
          error: "One or more products are no longer available.",
        },
        { status: 400 }
      );
    }

    /* ---------------------------------------------
       CHECK STOCK
    --------------------------------------------- */

    const unavailableProduct = products.find(
      (product) => !product.inStock
    );

    if (unavailableProduct) {
      return NextResponse.json(
        {
          error: `${unavailableProduct.name} is currently out of stock.`,
        },
        { status: 400 }
      );
    }

    /* ---------------------------------------------
       CALCULATE TOTALS
       
       IMPORTANT:
       Prices come from the database, not the client.
    --------------------------------------------- */

    let subtotal = 0;

    const orderItems = items.map((item) => {
      const product = products.find(
        (currentProduct) =>
          currentProduct.id === item.productId
      );

      if (!product) {
        throw new Error("Product not found.");
      }

      const price = Number(product.price);

      subtotal += price * item.quantity;

      return {
        productId: product.id,
        productName: product.name,
        price: product.price,
        quantity: item.quantity,
        selectedColor:
          item.selectedColor?.trim() || null,
        selectedSize:
          item.selectedSize?.trim() || null,
      };
    });

    /* ---------------------------------------------
       SHIPPING
    --------------------------------------------- */

    const shipping = subtotal >= 150 ? 0 : 10;

    const total = subtotal + shipping;

    /* ---------------------------------------------
       CREATE ORDER
    --------------------------------------------- */

    const order = await prisma.order.create({
      data: {
        userId: user.id,

        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),

        address: address.trim(),
        city: city.trim(),
        state: state.trim(),

        subtotal,
        shipping,
        total,

        status: "PENDING",
        paymentStatus: "UNPAID",

        items: {
          create: orderItems,
        },
      },

      include: {
        items: true,
      },
    });

    /* ---------------------------------------------
       RESPONSE
    --------------------------------------------- */

    return NextResponse.json(
      {
        success: true,
        order,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("CREATE ORDER ERROR:", error);

    return NextResponse.json(
      {
        error: "Unable to create order.",
      },
      { status: 500 }
    );
  }
}