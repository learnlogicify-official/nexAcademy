import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const problems = await prisma.problem.findMany({
      orderBy: {
        createdAt: 'asc'
      }
    });

    return NextResponse.json(problems);
  } catch (error) {
    console.error('Error fetching problems:', error);
    return NextResponse.json(
      { error: 'Failed to fetch problems' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const problem = await prisma.problem.create({
      data: {
        title: data.title,
        description: data.description,
        constraints: data.constraints,
        inputFormat: data.inputFormat,
        outputFormat: data.outputFormat,
        samples: data.samples,
        hiddenTests: data.hiddenTests
      }
    });

    return NextResponse.json(problem);
  } catch (error) {
    console.error('Error creating problem:', error);
    return NextResponse.json(
      { error: 'Failed to create problem' },
      { status: 500 }
    );
  }
} 