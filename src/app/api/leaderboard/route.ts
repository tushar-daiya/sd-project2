import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
 await prisma.user.findMany({
    select: {
      name: true,
      roastScore: true,
    },
    orderBy: {
      roastScore: "desc",
    },
  });
}
