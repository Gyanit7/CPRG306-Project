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
  
      // Avoid crashing if empty
      if (items.length === 0) {
        return NextResponse.json({ message: "Cart cleared" });
      }
  
      const cleanItems = items.map((item) => ({
        userId,
        productId: String(item.id),
        title: item.title,
        price: item.price,
        quantity: item.quantity,
      }));
  
      await prisma.cartItem.createMany({ data: cleanItems });
  
      return NextResponse.json({ message: "Cart saved" });
    } catch (err) {
      console.error("Save cart error:", err);
      return NextResponse.json({ error: "Failed to save cart" }, { status: 500 });
    }
  }
  