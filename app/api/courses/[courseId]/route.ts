import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';

export async function GET(
  request: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

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
    });

    if (!course) {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      );
    }

    // Fetch enrollment details
    const enrollment = await prisma.enrolledCourse.findUnique({
      where: {
        userId_courseId: {
          userId: session.user.id,
          courseId: params.courseId,
        },
      },
    });

    // Fetch modules with their submodules and tests
    const modules = await prisma.module.findMany({
      where: {
        courseId: params.courseId,
      },
      orderBy: {
        order: 'asc',
      },
      include: {
        submodules: {
          orderBy: {
            order: 'asc',
          },
        },
        tests: {
          orderBy: {
            createdAt: 'asc',
          },
          select: {
            id: true,
            title: true,
            description: true,
            duration: true,
            passingScore: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });

    // Log the data for debugging
    console.log('API Response:', {
      courseId: params.courseId,
      modulesFound: modules.length,
      moduleDetails: modules.map(module => ({
        id: module.id,
        title: module.title,
        submodulesCount: module.submodules?.length || 0,
        testsCount: module.tests?.length || 0,
      })),
    });

    // Combine course data with enrollment details
    const courseWithEnrollment = {
      ...course,
      progress: enrollment?.progress || 0,
      status: enrollment?.status || 'not_started',
      lastAccessed: enrollment?.lastAccessed,
      deadline: enrollment?.deadline,
      isStarred: enrollment?.isStarred || false,
      isRemoved: enrollment?.isRemoved || false,
    };

    // Process modules to ensure consistent data structure
    const processedModules = modules.map((module, index) => ({
      ...module,
      tests: module.tests || [],
      submodules: module.submodules || [],
      isLocked: index > 0 && modules[index - 1].submodules.some(
        submodule => !enrollment?.completedLessons?.includes(parseInt(submodule.id))
      ),
    }));

    return NextResponse.json({
      course: courseWithEnrollment,
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