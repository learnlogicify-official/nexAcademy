import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';
import { Prisma } from '@prisma/client';

type EnrolledCourseWithRelations = Prisma.EnrolledCourseGetPayload<{
  include: {
    course: {
      include: {
        instructor: {
          select: {
            id: true;
            name: true;
            image: true;
          };
        };
      };
    };
  };
}>;

type ProcessedCourse = Prisma.CourseGetPayload<{
  include: {
    instructor: {
      select: {
        id: true;
        name: true;
        image: true;
      };
    };
  };
}> & {
  enrollmentStatus: 'enrolled';
  progress: number;
  lastAccessed: string | null;
  status: string;
  enrolledAt: string;
  completedLessons: number[];
  deadline: string | null;
  isStarred: boolean;
  isRemoved: boolean;
};

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    console.log('Session:', JSON.stringify(session, null, 2));

    if (!session?.user?.id) {
      console.log('No user ID in session:', session?.user);
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const search = searchParams.get('search')?.toLowerCase();
    const sortBy = searchParams.get('sortBy') || 'lastAccessed';

    // Find enrolled courses with filters
    const enrolledCourses = await prisma.enrolledCourse.findMany({
      where: {
        userId: session.user.id,
        ...(status === 'in-progress' && { progress: { gt: 0, lt: 100 } }),
        ...(status === 'future' && { progress: 0 }),
        ...(status === 'past' && { progress: 100 }),
        ...(status === 'starred' && { isStarred: true }),
        ...(status === 'removed' && { isRemoved: true }),
      },
      include: {
        course: {
          include: {
            instructor: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
        },
      },
      orderBy: sortBy === 'lastAccessed' 
        ? { lastAccessed: 'desc' }
        : sortBy === 'deadline'
        ? { deadline: 'asc' }
        : { createdAt: 'desc' },
    });

    console.log('Found enrolled courses:', enrolledCourses.length);

    // Process and filter courses
    const processedCourses = enrolledCourses
      .map((enrollment: EnrolledCourseWithRelations): ProcessedCourse => ({
        ...enrollment.course,
        enrollmentStatus: 'enrolled',
        progress: enrollment.progress,
        lastAccessed: enrollment.lastAccessed?.toISOString() || null,
        status: enrollment.status,
        enrolledAt: enrollment.createdAt.toISOString(),
        completedLessons: enrollment.completedLessons,
        deadline: enrollment.deadline?.toISOString() || null,
        isStarred: enrollment.isStarred,
        isRemoved: enrollment.isRemoved,
      }))
      .filter((course: ProcessedCourse) => {
        if (!search) return true;
        return (
          course.title.toLowerCase().includes(search) ||
          course.instructor.name?.toLowerCase().includes(search) ||
          course.category.toLowerCase().includes(search)
        );
      });

    console.log('Processed courses:', processedCourses.length);
    return NextResponse.json(processedCourses);
  } catch (error) {
    console.error('Error fetching enrolled courses:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch enrolled courses' },
      { status: 500 }
    );
  }
} 