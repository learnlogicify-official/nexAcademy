import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { TestQuestion } from '@prisma/client';

export async function GET(
  request: Request,
  { params }: { params: { courseId: string; testId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch test with questions
    const test = await prisma.test.findUnique({
      where: {
        id: params.testId,
      },
      include: {
        questions: {
          include: {
            testCases: true,
          },
          orderBy: {
            createdAt: 'asc',
          },
        },
        problems: {
          select: {
            id: true,
            title: true,
            description: true,
            inputFormat: true,
            outputFormat: true,
            constraints: true,
            samples: true,
            initialCode: true,
          },
        },
      },
    });

    if (!test) {
      return NextResponse.json({ error: 'Test not found' }, { status: 404 });
    }

    // Fetch user's attempts for this test
    const attempts = await prisma.testAttempt.findMany({
      where: {
        testId: params.testId,
        userId: session.user.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        score: true,
        status: true,
        createdAt: true,
      },
    });

    // Log the response for debugging
    console.log('Test data:', {
      testId: test.id,
      title: test.title,
      questionCount: test.questions.length,
      mcqCount: test.questions.filter((q: TestQuestion) => q.type === 'MCQ').length,
      programmingCount: test.questions.filter((q: TestQuestion) => q.type === 'PROGRAMMING').length,
    });

    return NextResponse.json({
      test,
      attempts,
    });
  } catch (error) {
    console.error('Error fetching test:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: { courseId: string; testId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { answers, score, status } = await request.json();

    // Create test attempt
    const attempt = await prisma.testAttempt.create({
      data: {
        testId: params.testId,
        userId: session.user.id,
        answers,
        score,
        status,
      },
    });

    return NextResponse.json(attempt);
  } catch (error) {
    console.error('Error submitting test attempt:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 