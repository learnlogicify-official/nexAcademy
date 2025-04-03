import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch all courses with their enrollments
    const courses = await prisma.course.findMany({
      include: {
        instructor: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        enrollments: {
          where: {
            userId: session.user.id,
          },
          select: {
            status: true,
            progress: true,
            completedLessons: true,
          },
        },
      },
    });

    // Transform the courses to include enrollment status
    const transformedCourses = courses.map((course) => {
      const enrollment = course.enrollments[0];
      return {
        ...course,
        enrollmentStatus: enrollment ? 'ENROLLED' : 'NOT_ENROLLED',
        progress: enrollment?.progress || 0,
        completedLessons: enrollment?.completedLessons || [],
      };
    });

    return NextResponse.json(transformedCourses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json(
      { error: 'Failed to fetch courses' },
      { status: 500 }
    );
  }
} 