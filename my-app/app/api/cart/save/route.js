import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request) {
  try {
    const { userId, items } = await request.json();

    if (!userId || !Array.isArray(items)) {
      return NextResponse.json({ error: "Missing or invalid cart data" }, { status: 400 });
    }

    // Clear existing cart
    await prisma.cartItem.deleteMany({ where: { userId } });

    
    for (const item of items) {
      await prisma.cartItem.upsert({
        where: {
          userId_productId: {
            userId,
            productId: String(item.id),
          },
        },
        update: {
          quantity: item.quantity,
          price: item.price,
          title: item.title,
        },
        create: {
          userId,
          productId: String(item.id),
          quantity: item.quantity,
          price: item.price,
          title: item.title,
        },
      });
    }

    return NextResponse.json({ message: "Cart saved successfully" });
  } catch (err) {
    console.error("Save cart error:", err);
    return NextResponse.json({ error: "Failed to save cart" }, { status: 500 });
  }
}
