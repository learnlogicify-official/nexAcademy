import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { CourseForm } from '@/components/admin/CourseForm';
import { Course, User } from '@prisma/client';

interface CourseEditPageProps {
  params: {
    id: string;
  };
}

export default async function CourseEditPage({ params }: CourseEditPageProps) {
  const course = await prisma.course.findUnique({
    where: { id: params.id },
    include: {
      instructor: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          createdAt: true,
          updatedAt: true,
          emailVerified: true,
          password: true,
          role: true,
        },
      },
    },
  });

  if (!course) {
    notFound();
  }

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
        <h1 className="text-3xl font-bold">Edit Course</h1>
        <p className="text-muted-foreground">
          Update the course details below.
        </p>
      </div>

      <CourseForm initialData={course} instructors={instructors} />
    </div>
  );
} 