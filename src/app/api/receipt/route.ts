import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const items = await prisma.receipt.findMany();

    return NextResponse.json(items, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error trying to fetch receipt", error: error },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { description, price, amount } = await request.json();

    const newItem = await prisma.receipt.create({
      data: {
        description: description,
        price: price,
        amount: amount,
      },
    });

    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error trying to create a new item", error: error },
      { status: 500 }
    );
  }
}
