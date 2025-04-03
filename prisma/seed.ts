import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const problems = [
  {
    id: '1',
    title: 'Print Numbers from 1 to N',
    description: 'Write a program that prints all integers sequentially from 1 to a given number N.',
    inputFormat: 'The program accepts a single integer num, which represents the upper limit of the sequence (N).',
    outputFormat: 'The output should display all numbers from 1 to num, separated by spaces.',
    constraints: ['1 ≤ N ≤ 1000'],
    samples: [
      {
        input: '5',
        output: '1 2 3 4 5',
        explanation: ['The input number N is 5.', 'The program generates a sequence of numbers from 1 to 5.']
      }
    ],
    hiddenTests: [
      { input: '10', output: '1 2 3 4 5 6 7 8 9 10' },
      { input: '1', output: '1' },
      { input: '100', output: '1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59 60 61 62 63 64 65 66 67 68 69 70 71 72 73 74 75 76 77 78 79 80 81 82 83 84 85 86 87 88 89 90 91 92 93 94 95 96 97 98 99 100' }
    ],
    initialCode: `def print_numbers(n):
    # Write your code here
    pass`
  },
  // Add other problems here...
];

async function main() {
  console.log('Seeding database...');

  // Create test user
  const hashedPassword = await bcrypt.hash('password123', 10);
  const user = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      name: 'Test User',
      password: hashedPassword,
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=test',
    },
  });

  // Create instructors
  const instructors = await Promise.all([
    prisma.user.upsert({
      where: { email: 'john@example.com' },
      update: {},
      create: {
        email: 'john@example.com',
        name: 'John Smith',
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john',
        role: 'ADMIN',
      },
    }),
    prisma.user.upsert({
      where: { email: 'jane@example.com' },
      update: {},
      create: {
        email: 'jane@example.com',
        name: 'Jane Doe',
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jane',
        role: 'ADMIN',
      },
    }),
  ]);

  // Create courses
  const courses = await Promise.all([
    // In Progress Courses
    prisma.course.create({
      data: {
        title: 'Advanced JavaScript Concepts',
        description: 'Deep dive into JavaScript\'s advanced features',
        image: 'https://picsum.photos/seed/js/800/600',
        price: 49.99,
        level: 'Advanced',
        duration: '20h',
        lessons: 25,
        rating: 4.8,
        students: 1500,
        category: 'Programming',
        tags: ['JavaScript', 'Web Development'],
        startDate: new Date(),
        endDate: new Date(Date.now() + 7776000000), // 90 days from now
        instructorId: instructors[0].id,
        enrollments: {
          create: {
            userId: user.id,
            progress: 45,
            lastAccessed: new Date(),
            status: 'in_progress',
            completedLessons: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          },
        },
      },
    }),
    prisma.course.create({
      data: {
        title: 'React Masterclass',
        description: 'Build modern web applications with React',
        image: 'https://picsum.photos/seed/react/800/600',
        price: 59.99,
        level: 'Intermediate',
        duration: '15h',
        lessons: 20,
        rating: 4.7,
        students: 2000,
        category: 'Web Development',
        tags: ['React', 'JavaScript', 'Frontend'],
        startDate: new Date(),
        endDate: new Date(Date.now() + 7776000000),
        instructorId: instructors[1].id,
        enrollments: {
          create: {
            userId: user.id,
            progress: 75,
            lastAccessed: new Date(Date.now() - 86400000), // 1 day ago
            status: 'in_progress',
            completedLessons: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
          },
        },
      },
    }),

    // Future Courses
    prisma.course.create({
      data: {
        title: 'Machine Learning Fundamentals',
        description: 'Introduction to machine learning concepts',
        image: 'https://picsum.photos/seed/ml/800/600',
        price: 79.99,
        level: 'Beginner',
        duration: '30h',
        lessons: 40,
        rating: 4.9,
        students: 1200,
        category: 'Data Science',
        tags: ['Machine Learning', 'Python', 'AI'],
        startDate: new Date(Date.now() + 604800000), // Starts in 1 week
        endDate: new Date(Date.now() + 8380800000), // 97 days from now
        instructorId: instructors[0].id,
        enrollments: {
          create: {
            userId: user.id,
            progress: 0,
            status: 'not_started',
            completedLessons: [],
          },
        },
      },
    }),
    prisma.course.create({
      data: {
        title: 'Cloud Architecture with AWS',
        description: 'Learn to build scalable cloud solutions',
        image: 'https://picsum.photos/seed/aws/800/600',
        price: 89.99,
        level: 'Advanced',
        duration: '25h',
        lessons: 30,
        rating: 4.6,
        students: 800,
        category: 'Cloud Computing',
        tags: ['AWS', 'Cloud', 'DevOps'],
        startDate: new Date(Date.now() + 1209600000), // Starts in 2 weeks
        endDate: new Date(Date.now() + 8985600000), // 104 days from now
        instructorId: instructors[1].id,
        enrollments: {
          create: {
            userId: user.id,
            progress: 0,
            status: 'not_started',
            completedLessons: [],
          },
        },
      },
    }),

    // Completed Courses
    prisma.course.create({
      data: {
        title: 'HTML & CSS Basics',
        description: 'Learn the fundamentals of web development',
        image: 'https://picsum.photos/seed/html/800/600',
        price: 29.99,
        level: 'Beginner',
        duration: '10h',
        lessons: 15,
        rating: 4.5,
        students: 3000,
        category: 'Web Development',
        tags: ['HTML', 'CSS', 'Web Design'],
        startDate: new Date(Date.now() - 7776000000), // Started 90 days ago
        endDate: new Date(Date.now() - 86400000), // Ended yesterday
        instructorId: instructors[0].id,
        enrollments: {
          create: {
            userId: user.id,
            progress: 100,
            lastAccessed: new Date(Date.now() - 604800000), // 1 week ago
            status: 'completed',
            completedLessons: Array.from({ length: 15 }, (_, i) => i + 1),
          },
        },
      },
    }),
    prisma.course.create({
      data: {
        title: 'Git Version Control',
        description: 'Master Git and GitHub workflows',
        image: 'https://picsum.photos/seed/git/800/600',
        price: 39.99,
        level: 'Intermediate',
        duration: '8h',
        lessons: 12,
        rating: 4.7,
        students: 2500,
        category: 'Development Tools',
        tags: ['Git', 'GitHub', 'Version Control'],
        startDate: new Date(Date.now() - 5184000000), // Started 60 days ago
        endDate: new Date(Date.now() - 2592000000), // Ended 30 days ago
        instructorId: instructors[1].id,
        enrollments: {
          create: {
            userId: user.id,
            progress: 100,
            lastAccessed: new Date(Date.now() - 1209600000), // 2 weeks ago
            status: 'completed',
            completedLessons: Array.from({ length: 12 }, (_, i) => i + 1),
          },
        },
      },
    }),

    // Removed Course (but keeping in database)
    prisma.course.create({
      data: {
        title: 'Deprecated Python Course',
        description: 'Old Python course content',
        image: 'https://picsum.photos/seed/python/800/600',
        price: 19.99,
        level: 'Beginner',
        duration: '5h',
        lessons: 8,
        rating: 3.5,
        students: 500,
        category: 'Programming',
        tags: ['Python', 'Programming'],
        startDate: new Date(Date.now() - 7776000000), // Started 90 days ago
        endDate: new Date(Date.now() - 6912000000), // Ended 80 days ago
        instructorId: instructors[0].id,
        enrollments: {
          create: {
            userId: user.id,
            progress: 25,
            lastAccessed: new Date(Date.now() - 2592000000), // 1 month ago
            status: 'in_progress',
            completedLessons: [1, 2],
          },
        },
      },
    }),
  ]);

  console.log('Seeding problems...');
  
  for (const problem of problems) {
    await prisma.problem.upsert({
      where: { id: problem.id },
      update: problem,
      create: problem,
    });
  }
  
  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 