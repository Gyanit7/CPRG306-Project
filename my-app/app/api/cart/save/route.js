import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request) {
  try {
    const { userId, items } = await request.json();

    if (!userId || !items) {
      return NextResponse.json({ error: "Missing cart data" }, { status: 400 });
    }

    await prisma.cartItem.deleteMany({ where: { userId } });

    const mapped = items.map((item) => ({
      userId,
      productId: String(item.id),
      title: item.title,
      price: item.price,
      quantity: item.quantity,
    }));

    await prisma.cartItem.createMany({ data: mapped });

    return NextResponse.json({ message: "Cart saved" });
  } catch (err) {
    console.error("Save cart error:", err);
    return NextResponse.json({ error: "Failed to save cart" }, { status: 500 });
  }
}
