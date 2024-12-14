import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();
export async function GET() {
  const allChores = await prisma.chore.findMany({
    select: {
      id: true,
      name: true,
      damage: true,
      level: true,
    },
  });
  return NextResponse.json(allChores);
}
