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

    // Retrieve all items with IDs greater than the deleted ID
    const itemsToUpdate = await prisma.receipt.findMany({
      where: {
        id: {
          gt: Number(params.id),
        },
      },
    });

    // Update the IDs of the remaining items
    // This is to keep continuity of IDs (1, 2, 3, ...)
    await Promise.all(
      itemsToUpdate.map(async (item) => {
        return prisma.receipt.update({
          where: { id: item.id },
          data: {
            id: item.id - 1,
          },
        });
      })
    );

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
