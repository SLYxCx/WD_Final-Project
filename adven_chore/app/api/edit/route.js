import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(req) {
  try {
    // Parse the request body
    const body = await req.json();
    const { name, id } = body;

    // Validate required fields
    if (!name || typeof name !== "string") {
      return NextResponse.json(
        { error: "'name' is required and must be a string." },
        { status: 400 }
      );
    }

    if (!id || typeof id !== "string") {
      return NextResponse.json(
        { error: "'id' is required and must be a string." },
        { status: 400 }
      );
    }

    const updatedChore = await prisma.chore.update({
      where: {
        id,
      },
      data: {
        name,
      },
      select: {
        name: true,
      },
    });

    console.log("Chore Updated:", updatedChore);

    return NextResponse.json(updatedChore);
  } catch (error) {
    console.error("Error updating chore:", error);

    if (error.code === "P2025") {
      return NextResponse.json(
        { error: "Chore not found or invalid 'id'." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
