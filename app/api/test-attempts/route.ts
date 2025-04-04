import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

// POST /api/test-attempts
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json();
    const { testId, answers } = body;

    if (!testId || !answers) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // Get the test with problems to calculate score
    const test = await prisma.test.findUnique({
      where: { id: testId },
      include: { problems: true },
    });

    if (!test) {
      return new NextResponse("Test not found", { status: 404 });
    }

    // Calculate score
    let correctAnswers = 0;
    test.problems.forEach((problem, index) => {
      if (answers[index] === problem.correctAnswer) {
        correctAnswers++;
      }
    });

    const score = Math.round((correctAnswers / test.problems.length) * 100);

    // Create test attempt
    const attempt = await prisma.testAttempt.create({
      data: {
        userId: session.user.id,
        testId,
        score,
        answers,
        completedAt: new Date(),
      },
    });

    return NextResponse.json(attempt);
  } catch (error) {
    console.error("[TEST_ATTEMPTS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// GET /api/test-attempts?testId=xxx
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const testId = searchParams.get("testId");

    if (!testId) {
      return new NextResponse("Test ID is required", { status: 400 });
    }

    const attempts = await prisma.testAttempt.findMany({
      where: {
        testId,
        userId: session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(attempts);
  } catch (error) {
    console.error("[TEST_ATTEMPTS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 