import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface Params {
  params: { id: string };
}

export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const deletedItem = await prisma.receipt.delete({
      where: {
        id: Number(params.id),
      },
    });

    return NextResponse.json(deletedItem, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error trying to delete item", error: error },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const { description, price, amount } = await request.json();

    const updatedItem = await prisma.receipt.update({
      where: {
        id: Number(params.id),
      },
      data: {
        description: description,
        price: price,
        amount: amount,
      },
    });

    return NextResponse.json(updatedItem, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error trying to update item", error: error },
      { status: 500 }
    );
  }
}
