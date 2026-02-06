import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request) {
  try {
    const body = await request.json();
    const name = body?.name?.trim();
    const amount = Number(body?.amount);
    const userId = Number(body?.userId);

    if (!name || Number.isNaN(amount) || !Number.isInteger(userId)) {
      return NextResponse.json(
        { error: "Name, amount, and userId are required." },
        { status: 400 }
      );
    }

    const item = await prisma.tediyeInput.create({
      data: {
        name,
        amount,
        userId,
      },
      select: {
        id: true,
        name: true,
        amount: true,
      },
    });

    return NextResponse.json({ ok: true, item });
  } catch (error) {
    console.error("Tediye input create error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
