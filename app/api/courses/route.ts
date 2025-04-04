import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const instructorId = searchParams.get('instructorId');

    const courses = await prisma.course.findMany({
      where: instructorId ? { instructorId } : undefined,
      include: {
        instructor: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        enrollments: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(courses);
  } catch (error) {
    console.error('[COURSES_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== 'ADMIN') {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = await request.json();
    const {
      title,
      description,
      image,
      price,
      level,
      duration,
      lessons,
      category,
      tags,
      startDate,
      endDate,
      instructorId,
    } = body;

    if (!title || !description || !image || !instructorId) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    const course = await prisma.course.create({
      data: {
        title,
        description,
        image,
        price,
        level,
        duration,
        lessons,
        category,
        tags,
        startDate,
        endDate,
        instructorId,
      },
    });

    return NextResponse.json(course);
  } catch (error) {
    console.error('[COURSES_POST]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== 'ADMIN') {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = await request.json();
    const {
      id,
      title,
      description,
      image,
      price,
      level,
      duration,
      lessons,
      category,
      tags,
      startDate,
      endDate,
      instructorId,
    } = body;

    if (!id || !title || !description || !image || !instructorId) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    const course = await prisma.course.update({
      where: { id },
      data: {
        title,
        description,
        image,
        price,
        level,
        duration,
        lessons,
        category,
        tags,
        startDate,
        endDate,
        instructorId,
      },
    });

    return NextResponse.json(course);
  } catch (error) {
    console.error('[COURSES_PUT]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== 'ADMIN') {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return new NextResponse('Missing course ID', { status: 400 });
    }

    await prisma.course.delete({
      where: { id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('[COURSES_DELETE]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
} 