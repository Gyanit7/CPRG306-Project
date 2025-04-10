import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request) {
  const { userId, items, total } = await request.json();

  if (!userId || !items || items.length === 0) {
    return NextResponse.json({ error: "Invalid order data" }, { status: 400 });
  }

  try {
    const order = await prisma.order.create({
      data: {
        userId,
        items,
        total,
      },
    });

    return NextResponse.json({ message: "Order placed", order }, { status: 201 });
  } catch (err) {
    console.error("Checkout error:", err);
    return NextResponse.json({ error: "Failed to place order" }, { status: 500 });
  }
}
