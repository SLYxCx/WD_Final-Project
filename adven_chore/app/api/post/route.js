import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    // Parse the request body
    const body = await req.json();

    // Validate the body and required fields
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Invalid request payload. Expected a JSON object." },
        { status: 400 }
      );
    }

    const { name, damage, level } = body;

    // Ensure all required fields are provided
    if (!name || !damage || !level) {
      return NextResponse.json(
        { error: "name, damage, and level are required." },
        { status: 400 }
      );
    }

    console.log({ name, damage, level });

    // Create a new chore in the database
    const newChore = await prisma.chore.create({
      data: {
        name,
        damage,
        level,
      },
    });

    console.log("New Chore Created:", newChore);

    return NextResponse.json(newChore);
  } catch (error) {
    console.error("Error adding movie:", error);

    // Return a proper error response
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
