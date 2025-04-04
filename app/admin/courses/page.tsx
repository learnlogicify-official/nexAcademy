import { prisma } from '@/lib/prisma';
import { Button } from '@/components/ui/button';
import { CourseTable } from '@/components/admin/CourseTable';
import Link from 'next/link';

export default async function AdminCoursesPage() {
  const courses = await prisma.course.findMany({
    include: {
      instructor: {
        select: {
          id: true,
          name: true,
        },
      },
      enrollments: {
        select: {
          id: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Courses</h1>
          <p className="text-muted-foreground">
            Manage your courses and their content.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/courses/new">
            Add Course
          </Link>
        </Button>
      </div>

      <CourseTable courses={courses} />
    </div>
  );
} 