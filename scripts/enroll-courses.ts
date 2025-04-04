import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function enrollCourses() {
  try {
    // Find the user
    const user = await prisma.user.findUnique({
      where: { email: 'sachinjeevan2506@gmail.com' },
    });

    if (!user) {
      console.error('User not found');
      return;
    }

    // Find available courses
    const courses = await prisma.course.findMany({
      take: 3, // Get 3 courses to enroll
    });

    if (courses.length === 0) {
      console.error('No courses found');
      return;
    }

    // Enroll user in courses
    for (const course of courses) {
      await prisma.enrolledCourse.create({
        data: {
          userId: user.id,
          courseId: course.id,
          progress: Math.floor(Math.random() * 100), // Random progress between 0-100
          lastAccessed: new Date(),
          status: 'IN_PROGRESS',
        },
      });
    }

    console.log('Successfully enrolled user in courses');
  } catch (error) {
    console.error('Error enrolling courses:', error);
  } finally {
    await prisma.$disconnect();
  }
}

enrollCourses(); 