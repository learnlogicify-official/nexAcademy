import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    const users = await prisma.user.findMany();
    console.log('Users:', JSON.stringify(users, null, 2));
    console.log('Total Users:', users.length);

    const courses = await prisma.course.findMany({
      include: {
        instructor: true,
      },
    });
    console.log('\nCourses:', JSON.stringify(courses, null, 2));
    console.log('Total Courses:', courses.length);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 