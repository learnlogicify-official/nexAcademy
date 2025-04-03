import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';

interface Instructor {
  id: string;
  name: string | null;
  image: string | null;
}

interface CourseWithInstructor {
  id: string;
  title: string;
  description: string;
  instructorId: string;
  instructor: Instructor;
  image: string;
  price: number;
  level: string;
  duration: string;
  lessons: number;
  rating: number;
  students: number;
  category: string;
  tags: string[];
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

interface EnrollmentWithCourse {
  id: string;
  userId: string;
  courseId: string;
  course: CourseWithInstructor;
  enrolledAt: Date;
  completedLessons: number[];
  progress: number;
  status: string;
  lastAccessed: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

interface ProcessedCourse extends CourseWithInstructor {
  enrollmentStatus: 'enrolled';
  progress: number;
  lastAccessed: string | null;
  status: string;
  enrolledAt: string;
  completedLessons: number[];
}

export async function GET() {
  try {
    // Get the session
    const session = await getServerSession(authOptions);
    console.log('Session:', session); // Debug log

    if (!session?.user?.id) {
      console.log('No session or user ID found'); // Debug log
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Find enrolled courses directly using the user ID from the session
    const enrolledCourses = await prisma.enrollment.findMany({
      where: {
        userId: session.user.id,
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
    });
    console.log('Enrolled courses:', enrolledCourses); // Debug log

    // Process enrollments
    const processedCourses = enrolledCourses.map(enrollment => {
      const course = enrollment.course;
      return {
        ...course,
        enrollmentStatus: 'enrolled' as const,
        progress: enrollment.progress,
        lastAccessed: enrollment.lastAccessed?.toISOString() || null,
        status: enrollment.status,
        enrolledAt: enrollment.enrolledAt.toISOString(),
        completedLessons: enrollment.completedLessons,
      };
    });

    // Return all courses in a flat array
    return NextResponse.json(processedCourses);
  } catch (error) {
    console.error('Detailed error:', error); // Debug log
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch enrolled courses' },
      { status: 500 }
    );
  }
} 