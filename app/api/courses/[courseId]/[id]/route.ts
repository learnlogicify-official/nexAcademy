import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Course, Module, Prisma } from '@prisma/client';

type Instructor = {
  id: string;
  name: string | null;
  image: string | null;
};

type CourseWithInstructor = Course & {
  instructor: Instructor;
};

type ModuleWithSubmodules = Module & {
  submodules: {
    id: string;
    title: string;
    type: string;
    questions: number;
    order: number;
  }[];
};

type ProcessedModule = ModuleWithSubmodules & {
  isLocked: boolean;
};

type CourseWithEnrollment = CourseWithInstructor & {
  progress: number;
  status: string;
  lastAccessed: Date | null;
  deadline: Date | null;
  isStarred: boolean;
  isRemoved: boolean;
};

export async function GET(
  request: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    console.log('Session:', session);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Fetch course with instructor details
    const course = await prisma.course.findUnique({
      where: {
        id: params.courseId,
      },
      include: {
        instructor: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    }) as CourseWithInstructor;

    if (!course) {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      );
    }

    // Fetch enrollment details with completed lessons
    const enrollment = await prisma.enrolledCourse.findUnique({
      where: {
        userId_courseId: {
          userId: session.user.id,
          courseId: params.courseId,
        },
      },
      select: {
        progress: true,
        status: true,
        lastAccessed: true,
        deadline: true,
        isStarred: true,
        isRemoved: true,
        completedLessons: true,
      },
    });

    console.log('Enrollment:', enrollment);

    // Fetch modules for the course
    const modules = await prisma.module.findMany({
      where: {
        courseId: params.courseId,
      },
      orderBy: {
        order: 'asc',
      },
    });

    // Process modules to add isLocked property
    const processedModules = modules.map(module => ({
      ...module,
      isLocked: false, // You can implement your own logic for determining if a module is locked
      submodules: [], // Empty array since we don't have submodules in our schema
    }));

    return NextResponse.json({
      course,
      enrollment,
      modules: processedModules,
    });
  } catch (error) {
    console.error('Error fetching course:', error);
    return NextResponse.json(
      { error: 'Failed to fetch course details' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { courseId: string } }
) {
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

    const course = await prisma.course.update({
      where: { id: params.courseId },
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
    console.error('[COURSE_PUT]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== 'ADMIN') {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    await prisma.course.delete({
      where: { id: params.courseId },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('[COURSE_DELETE]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
} 