import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function cleanup() {
  try {
    // Delete all enrollments first (due to foreign key constraints)
    await prisma.enrolledCourse.deleteMany();
    console.log('Deleted all enrollments');

    // Delete all test attempts
    await prisma.testAttempt.deleteMany();
    console.log('Deleted all test attempts');

    // Delete all test questions
    await prisma.testQuestion.deleteMany();
    console.log('Deleted all test questions');

    // Delete all tests
    await prisma.test.deleteMany();
    console.log('Deleted all tests');

    // Delete all modules
    await prisma.module.deleteMany();
    console.log('Deleted all modules');

    // Delete all courses
    await prisma.course.deleteMany();
    console.log('Deleted all courses');

    console.log('Database cleanup completed successfully!');
  } catch (error) {
    console.error('Error during cleanup:', error);
  } finally {
    await prisma.$disconnect();
  }
}

cleanup(); 