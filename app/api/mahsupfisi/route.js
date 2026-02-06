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

    const item = await prisma.mahsupItem.create({
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
    console.error("Mahsup item create error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = Number(searchParams.get("userId"));

    if (!Number.isInteger(userId)) {
      return NextResponse.json(
        { error: "userId is required." },
        { status: 400 }
      );
    }

    const items = await prisma.mahsupItem.findMany({
      where: { userId },
      select: {
        id: true,
        name: true,
        amount: true,
      },
      orderBy: { id: "desc" },
    });

    return NextResponse.json({ ok: true, items });
  } catch (error) {
    console.error("Mahsup item list error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = Number(searchParams.get("id"));

    if (!Number.isInteger(id)) {
      return NextResponse.json(
        { error: "id is required." },
        { status: 400 }
      );
    }

    await prisma.mahsupItem.delete({
      where: { id },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Mahsup item delete error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
