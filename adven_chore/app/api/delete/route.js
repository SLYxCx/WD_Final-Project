import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function DELETE(req) {
  try {
    const { id } = await req.json();
    const deleteChore = await prisma.chore.delete({
      where: {
        id: id,
      },
    });
    console.log(deleteChore);

    return NextResponse.json("Deleted", deleteChore);
  } catch (error) {
    console.error("Error deleting Chore:", error);
    NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
