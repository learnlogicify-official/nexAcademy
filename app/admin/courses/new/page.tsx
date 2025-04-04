import { prisma } from '@/lib/prisma';
import { CourseForm } from '@/components/admin/CourseForm';

export default async function NewCoursePage() {
  const instructors = await prisma.user.findMany({
    where: {
      role: 'ADMIN',
    },
    select: {
      id: true,
      name: true,
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Create New Course</h1>
        <p className="text-muted-foreground">
          Fill in the details below to create a new course.
        </p>
      </div>

      <CourseForm instructors={instructors} />
    </div>
  );
} 