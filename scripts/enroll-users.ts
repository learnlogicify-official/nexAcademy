import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    // Get all users and courses
    const users = await prisma.user.findMany({
      where: {
        role: 'USER'
      }
    });
    const courses = await prisma.course.findMany();

    // Enroll each user in each course
    for (const user of users) {
      for (const course of courses) {
        // Check if enrollment already exists
        const existingEnrollment = await prisma.enrolledCourse.findUnique({
          where: {
            userId_courseId: {
              userId: user.id,
              courseId: course.id,
            },
          },
        });

        if (!existingEnrollment) {
          await prisma.enrolledCourse.create({
            data: {
              userId: user.id,
              courseId: course.id,
              progress: Math.floor(Math.random() * 100), // Random progress
              status: 'in_progress',
              lastAccessed: new Date(),
              deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
              isStarred: Math.random() > 0.5, // Randomly star some courses
            },
          });
          console.log(`Enrolled user ${user.email} in course ${course.title}`);
        }
      }
    }

    console.log('Enrollment complete!');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 