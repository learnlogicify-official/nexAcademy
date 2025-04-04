import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

async function createUserAndEnroll() {
  try {
    // Create user if not exists
    const user = await prisma.user.upsert({
      where: { email: 'sachinjeevan2506@gmail.com' },
      update: {},
      create: {
        email: 'sachinjeevan2506@gmail.com',
        name: 'Sachin Jeevan',
        role: Role.USER,
      },
    });

    console.log('User created/found:', user);

    // Create some courses if they don't exist
    const courses = await Promise.all([
      prisma.course.upsert({
        where: { id: 'intro-to-programming' },
        update: {},
        create: {
          id: 'intro-to-programming',
          title: 'Introduction to Programming',
          description: 'Learn the basics of programming with Python',
          instructorId: user.id,
          image: 'https://example.com/python-course.jpg',
          price: 49.99,
          level: 'BEGINNER',
          duration: '30 hours',
          lessons: 10,
          rating: 4.5,
          students: 0,
          category: 'Programming',
          tags: ['Python', 'Programming', 'Beginner'],
          startDate: new Date(),
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        },
      }),
      prisma.course.upsert({
        where: { id: 'web-dev-fundamentals' },
        update: {},
        create: {
          id: 'web-dev-fundamentals',
          title: 'Web Development Fundamentals',
          description: 'Master HTML, CSS, and JavaScript',
          instructorId: user.id,
          image: 'https://example.com/web-dev-course.jpg',
          price: 59.99,
          level: 'BEGINNER',
          duration: '40 hours',
          lessons: 12,
          rating: 4.7,
          students: 0,
          category: 'Web Development',
          tags: ['HTML', 'CSS', 'JavaScript'],
          startDate: new Date(),
          endDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000), // 45 days from now
        },
      }),
      prisma.course.upsert({
        where: { id: 'dsa' },
        update: {},
        create: {
          id: 'dsa',
          title: 'Data Structures and Algorithms',
          description: 'Learn essential computer science concepts',
          instructorId: user.id,
          image: 'https://example.com/dsa-course.jpg',
          price: 79.99,
          level: 'INTERMEDIATE',
          duration: '50 hours',
          lessons: 15,
          rating: 4.8,
          students: 0,
          category: 'Computer Science',
          tags: ['DSA', 'Algorithms', 'Data Structures'],
          startDate: new Date(),
          endDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days from now
        },
      }),
    ]);

    console.log('Courses created/found:', courses);

    // Enroll user in courses
    for (const course of courses) {
      await prisma.enrolledCourse.upsert({
        where: {
          userId_courseId: {
            userId: user.id,
            courseId: course.id,
          },
        },
        update: {},
        create: {
          userId: user.id,
          courseId: course.id,
          progress: Math.floor(Math.random() * 100),
          lastAccessed: new Date(),
          status: 'IN_PROGRESS',
          completedLessons: [],
          isStarred: false,
          isRemoved: false,
        },
      });
    }

    console.log('Successfully enrolled user in courses');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createUserAndEnroll(); 