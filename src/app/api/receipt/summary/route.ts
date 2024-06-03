import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const totalAmount = await prisma.receipt.aggregate({
      _sum: {
        amount: true,
      },
    });

    const pricingRows = await prisma.receipt.findMany({
      select: {
        price: true,
        amount: true,
      },
    });

    const totalPrice = pricingRows.reduce(
      (acc, row) => acc + row.price * row.amount,
      0
    );

    const summary = {
      totalAmount: totalAmount._sum.amount || 0,
      totalPrice: totalPrice || 0,
    };

    return NextResponse.json(summary, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error trying to fetch summary", error: error },
      { status: 500 }
    );
  }
}
