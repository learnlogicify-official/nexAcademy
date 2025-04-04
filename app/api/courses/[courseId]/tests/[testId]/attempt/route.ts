import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(
  request: Request,
  { params }: { params: { courseId: string; testId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get the user from the database using email
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const { answers, score, status } = await request.json();

    // Validate test exists
    const test = await prisma.test.findUnique({
      where: { id: params.testId },
    });

    if (!test) {
      return NextResponse.json({ error: 'Test not found' }, { status: 404 });
    }

    // Create test attempt
    const testAttempt = await prisma.testAttempt.create({
      data: {
        userId: user.id,
        testId: params.testId,
        score: Math.round(score),
        answers: answers, // Prisma will handle JSON serialization
        status: status,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(testAttempt);
  } catch (error) {
    console.error('Error creating test attempt:', error);
    return NextResponse.json(
      { error: 'Failed to create test attempt' },
      { status: 500 }
    );
  }
} 