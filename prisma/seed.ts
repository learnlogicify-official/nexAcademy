import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash('Admin@123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@learnlogicify.com' },
    update: {},
    create: {
      email: 'admin@learnlogicify.com',
      name: 'Admin User',
      password: hashedPassword,
      role: Role.ADMIN,
    },
  });

  // Create test user
  const testUserPassword = await bcrypt.hash('Test@123', 10);
  const testUser = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      name: 'Test User',
      password: testUserPassword,
      role: Role.USER,
    },
  });

  // Create instructor
  const instructorPassword = await bcrypt.hash('Instructor@123', 10);
  const instructor = await prisma.user.upsert({
    where: { email: 'instructor@example.com' },
    update: {},
    create: {
      email: 'instructor@example.com',
      name: 'John Instructor',
      password: instructorPassword,
      role: Role.USER,
    },
  });

  // Create a course
  const course = await prisma.course.create({
    data: {
      title: 'Introduction to Programming',
      description: 'Learn the basics of programming',
      instructorId: testUser.id,
      image: 'https://example.com/course.jpg',
      price: 49.99,
      level: 'BEGINNER',
      duration: '30 hours',
      lessons: 10,
      rating: 4.5,
      students: 0,
      category: 'Programming',
      tags: ['Programming', 'Beginner'],
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
  });

  // Create a module for the course
  const module = await prisma.module.create({
    data: {
      courseId: course.id,
      title: 'Introduction to JavaScript',
      description: 'Learn the basics of JavaScript syntax and concepts',
    },
  });

  // Create a problem
  const problem = await prisma.problem.create({
    data: {
      title: 'Hello World',
      description: 'Write a function that returns "Hello, World!"',
      inputFormat: 'No input required',
      outputFormat: 'A string "Hello, World!"',
      constraints: ['Function must return exactly "Hello, World!"'],
      samples: {
        input: '',
        output: 'Hello, World!',
        explanation: 'The function should return the string "Hello, World!"',
      },
      hiddenTests: {
        input: '',
        output: 'Hello, World!',
      },
      initialCode: 'function helloWorld() {\n  // Write your code here\n}',
    },
  });

  // Enroll test user in courses
  await prisma.enrolledCourse.createMany({
    data: [
      {
        userId: testUser.id,
        courseId: course.id,
        progress: 30,
        status: 'in_progress',
        lastAccessed: new Date(),
        deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        isStarred: false,
      },
    ],
  });

  console.log('Database has been seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 