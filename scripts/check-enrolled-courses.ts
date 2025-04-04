import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    const enrolledCourses = await prisma.enrolledCourse.findMany({
      include: {
        course: true,
        user: true,
      },
    });

    console.log('Enrolled Courses:', JSON.stringify(enrolledCourses, null, 2));
    console.log('Total Enrolled Courses:', enrolledCourses.length);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 