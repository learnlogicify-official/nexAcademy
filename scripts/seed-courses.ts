import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  try {
    // Create an instructor
    const instructor = await prisma.user.upsert({
      where: { email: 'instructor@example.com' },
      update: {},
      create: {
        email: 'instructor@example.com',
        name: 'John Instructor',
        password: await bcrypt.hash('Instructor@123', 10),
        role: Role.USER,
      },
    });

    // Create a test user
    const testUser = await prisma.user.upsert({
      where: { email: 'test@example.com' },
      update: {},
      create: {
        email: 'test@example.com',
        name: 'Test User',
        password: await bcrypt.hash('Test@123', 10),
        role: Role.USER,
      },
    });

    // In Progress Courses
    const inProgressCourse1 = await prisma.course.create({
      data: {
        title: 'Python Programming Fundamentals',
        description: 'Learn Python from scratch with hands-on exercises and real-world projects.',
        instructorId: instructor.id,
        image: 'https://example.com/python-course.jpg',
        price: 49.99,
        level: 'BEGINNER',
        duration: '30 hours',
        lessons: 10,
        rating: 4.5,
        students: 0,
        category: 'Programming',
        tags: ['Python', 'Programming', 'Beginner'],
        startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // Started 7 days ago
        endDate: new Date(Date.now() + 23 * 24 * 60 * 60 * 1000), // 23 days remaining
      },
    });

    const inProgressCourse2 = await prisma.course.create({
      data: {
        title: 'Web Development Bootcamp',
        description: 'Master HTML, CSS, and JavaScript to build modern web applications.',
        instructorId: instructor.id,
        image: 'https://example.com/web-dev-course.jpg',
        price: 59.99,
        level: 'BEGINNER',
        duration: '40 hours',
        lessons: 12,
        rating: 4.7,
        students: 0,
        category: 'Web Development',
        tags: ['HTML', 'CSS', 'JavaScript', 'Web Development'],
        startDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // Started 14 days ago
        endDate: new Date(Date.now() + 16 * 24 * 60 * 60 * 1000), // 16 days remaining
      },
    });

    // Future Courses
    const futureCourse1 = await prisma.course.create({
      data: {
        title: 'Advanced React Development',
        description: 'Take your React skills to the next level with advanced patterns and best practices.',
        instructorId: instructor.id,
        image: 'https://example.com/react-course.jpg',
        price: 69.99,
        level: 'INTERMEDIATE',
        duration: '35 hours',
        lessons: 12,
        rating: 4.6,
        students: 0,
        category: 'Web Development',
        tags: ['React', 'JavaScript', 'Frontend'],
        startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Starts in 7 days
        endDate: new Date(Date.now() + 37 * 24 * 60 * 60 * 1000), // Ends in 37 days
      },
    });

    const futureCourse2 = await prisma.course.create({
      data: {
        title: 'Machine Learning Fundamentals',
        description: 'Introduction to machine learning concepts and practical applications.',
        instructorId: instructor.id,
        image: 'https://example.com/ml-course.jpg',
        price: 79.99,
        level: 'INTERMEDIATE',
        duration: '45 hours',
        lessons: 15,
        rating: 4.8,
        students: 0,
        category: 'Data Science',
        tags: ['Machine Learning', 'Python', 'Data Science'],
        startDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // Starts in 14 days
        endDate: new Date(Date.now() + 44 * 24 * 60 * 60 * 1000), // Ends in 44 days
      },
    });

    // Past Courses
    const pastCourse1 = await prisma.course.create({
      data: {
        title: 'JavaScript Basics',
        description: 'Learn the fundamentals of JavaScript programming.',
        instructorId: instructor.id,
        image: 'https://example.com/js-course.jpg',
        price: 39.99,
        level: 'BEGINNER',
        duration: '25 hours',
        lessons: 8,
        rating: 4.4,
        students: 0,
        category: 'Programming',
        tags: ['JavaScript', 'Programming', 'Beginner'],
        startDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000), // Started 60 days ago
        endDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Ended 30 days ago
      },
    });

    const pastCourse2 = await prisma.course.create({
      data: {
        title: 'Database Design',
        description: 'Learn how to design and implement efficient databases.',
        instructorId: instructor.id,
        image: 'https://example.com/db-course.jpg',
        price: 49.99,
        level: 'INTERMEDIATE',
        duration: '30 hours',
        lessons: 10,
        rating: 4.5,
        students: 0,
        category: 'Database',
        tags: ['SQL', 'Database', 'Design'],
        startDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), // Started 90 days ago
        endDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000), // Ended 60 days ago
      },
    });

    // Starred Courses
    const starredCourse1 = await prisma.course.create({
      data: {
        title: 'Data Structures and Algorithms',
        description: 'Master essential computer science concepts and ace technical interviews.',
        instructorId: instructor.id,
        image: 'https://example.com/dsa-course.jpg',
        price: 79.99,
        level: 'INTERMEDIATE',
        duration: '50 hours',
        lessons: 15,
        rating: 4.8,
        students: 0,
        category: 'Computer Science',
        tags: ['DSA', 'Algorithms', 'Data Structures', 'Interview Preparation'],
        startDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Starts in 30 days
        endDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // Ends in 60 days
      },
    });

    const starredCourse2 = await prisma.course.create({
      data: {
        title: 'System Design',
        description: 'Learn how to design scalable and efficient systems.',
        instructorId: instructor.id,
        image: 'https://example.com/system-design-course.jpg',
        price: 89.99,
        level: 'ADVANCED',
        duration: '40 hours',
        lessons: 12,
        rating: 4.9,
        students: 0,
        category: 'System Design',
        tags: ['System Design', 'Architecture', 'Scalability'],
        startDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000), // Starts in 45 days
        endDate: new Date(Date.now() + 75 * 24 * 60 * 60 * 1000), // Ends in 75 days
      },
    });

    // Enroll test user in courses
    await prisma.enrolledCourse.createMany({
      data: [
        {
          userId: testUser.id,
          courseId: inProgressCourse1.id,
          progress: 30,
          status: 'in_progress',
          lastAccessed: new Date(),
          deadline: new Date(Date.now() + 23 * 24 * 60 * 60 * 1000),
          isStarred: false,
        },
        {
          userId: testUser.id,
          courseId: inProgressCourse2.id,
          progress: 45,
          status: 'in_progress',
          lastAccessed: new Date(),
          deadline: new Date(Date.now() + 16 * 24 * 60 * 60 * 1000),
          isStarred: false,
        },
        {
          userId: testUser.id,
          courseId: futureCourse1.id,
          progress: 0,
          status: 'upcoming',
          lastAccessed: new Date(),
          deadline: new Date(Date.now() + 37 * 24 * 60 * 60 * 1000),
          isStarred: false,
        },
        {
          userId: testUser.id,
          courseId: futureCourse2.id,
          progress: 0,
          status: 'upcoming',
          lastAccessed: new Date(),
          deadline: new Date(Date.now() + 44 * 24 * 60 * 60 * 1000),
          isStarred: false,
        },
        {
          userId: testUser.id,
          courseId: pastCourse1.id,
          progress: 100,
          status: 'completed',
          lastAccessed: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          deadline: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          isStarred: false,
        },
        {
          userId: testUser.id,
          courseId: pastCourse2.id,
          progress: 100,
          status: 'completed',
          lastAccessed: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
          deadline: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
          isStarred: false,
        },
        {
          userId: testUser.id,
          courseId: starredCourse1.id,
          progress: 0,
          status: 'upcoming',
          lastAccessed: new Date(),
          deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
          isStarred: true,
        },
        {
          userId: testUser.id,
          courseId: starredCourse2.id,
          progress: 0,
          status: 'upcoming',
          lastAccessed: new Date(),
          deadline: new Date(Date.now() + 75 * 24 * 60 * 60 * 1000),
          isStarred: true,
        },
      ],
    });

    console.log('Sample courses and enrollments created successfully!');
  } catch (error) {
    console.error('Error creating sample courses:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 