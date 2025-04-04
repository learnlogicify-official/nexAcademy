import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { title, description, duration, passingScore, moduleId, problems } = body;

    // Validate required fields
    if (!title || !duration || !moduleId || !problems) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create the test with its problems
    const test = await prisma.test.create({
      data: {
        title,
        description,
        duration,
        passingScore,
        moduleId,
        problems: {
          create: problems.map((problem: any) => ({
            question: problem.question,
            options: problem.options,
            correctAnswer: problem.correctAnswer,
          })),
        },
      },
      include: {
        problems: true,
      },
    });

    return NextResponse.json(test);
  } catch (error) {
    console.error("Error creating test:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 