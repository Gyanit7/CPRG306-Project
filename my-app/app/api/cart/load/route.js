import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
    }

    const items = await prisma.cartItem.findMany({
      where: { userId },
    });

    const cart = items.map((item) => ({
      id: item.productId,
      title: item.title,
      price: item.price,
      quantity: item.quantity,
    }));

    return NextResponse.json({ cart });
  } catch (err) {
    console.error("🔥 Load cart error:", err);
    return NextResponse.json({ error: "Failed to load cart" }, { status: 500 });
  }
}
