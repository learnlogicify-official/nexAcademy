import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

async function createSampleCourses() {
  try {
    // Create a sample instructor
    const instructor = await prisma.user.upsert({
      where: { email: 'instructor@example.com' },
      update: {},
      create: {
        email: 'instructor@example.com',
        name: 'John Doe',
        password: 'hashed_password', // In production, this should be properly hashed
        role: Role.USER, // Changed from 'INSTRUCTOR' to Role.USER as per schema
      },
    });

    // Create Python Course
    const pythonCourse = await prisma.course.create({
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
        startDate: new Date(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      },
    });

    // Create Python Modules
    const pythonModule1 = await prisma.module.create({
      data: {
        title: 'Introduction to Python',
        description: 'Learn the basics of Python programming',
        courseId: pythonCourse.id,
      },
    });

    const pythonModule2 = await prisma.module.create({
      data: {
        title: 'Data Types and Variables',
        description: 'Understanding Python data types and variables',
        courseId: pythonCourse.id,
      },
    });

    // Create Python Tests
    const pythonTest1 = await prisma.test.create({
      data: {
        title: 'Python Basics Test',
        description: 'Test your understanding of Python basics',
        duration: 30,
        passingScore: 70,
        moduleId: pythonModule1.id,
      },
    });

    // Create Test Questions
    await prisma.testQuestion.createMany({
      data: [
        {
          question: 'What is Python?',
          options: ['A snake', 'A programming language', 'A type of coffee', 'A car brand'],
          correctAnswer: 1,
          explanation: 'Python is a high-level programming language.',
          testId: pythonTest1.id,
        },
        {
          question: 'Which of these is a Python data type?',
          options: ['String', 'Integer', 'Float', 'All of the above'],
          correctAnswer: 3,
          explanation: 'Python has several built-in data types including strings, integers, and floats.',
          testId: pythonTest1.id,
        },
      ],
    });

    // Create Web Development Course
    const webDevCourse = await prisma.course.create({
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
        startDate: new Date(),
        endDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000), // 45 days from now
      },
    });

    // Create Web Dev Modules
    const webModule1 = await prisma.module.create({
      data: {
        title: 'HTML Fundamentals',
        description: 'Learn the basics of HTML',
        courseId: webDevCourse.id,
      },
    });

    const webModule2 = await prisma.module.create({
      data: {
        title: 'CSS Styling',
        description: 'Master CSS for beautiful web pages',
        courseId: webDevCourse.id,
      },
    });

    // Create Web Dev Test
    const webTest1 = await prisma.test.create({
      data: {
        title: 'HTML Basics Test',
        description: 'Test your understanding of HTML fundamentals',
        duration: 30,
        passingScore: 70,
        moduleId: webModule1.id,
      },
    });

    // Create Test Questions
    await prisma.testQuestion.createMany({
      data: [
        {
          question: 'What does HTML stand for?',
          options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Hyper Transfer Markup Language', 'Home Tool Markup Language'],
          correctAnswer: 0,
          explanation: 'HTML stands for Hyper Text Markup Language.',
          testId: webTest1.id,
        },
        {
          question: 'Which tag is used to create a hyperlink?',
          options: ['<link>', '<a>', '<href>', '<url>'],
          correctAnswer: 1,
          explanation: 'The <a> tag is used to create hyperlinks in HTML.',
          testId: webTest1.id,
        },
      ],
    });

    // Create Data Structures Course
    const dsaCourse = await prisma.course.create({
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
        startDate: new Date(),
        endDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days from now
      },
    });

    // Create DSA Modules
    const dsaModule1 = await prisma.module.create({
      data: {
        title: 'Introduction to Data Structures',
        description: 'Understanding basic data structures',
        courseId: dsaCourse.id,
      },
    });

    const dsaModule2 = await prisma.module.create({
      data: {
        title: 'Sorting Algorithms',
        description: 'Learn various sorting algorithms',
        courseId: dsaCourse.id,
      },
    });

    // Create DSA Test
    const dsaTest1 = await prisma.test.create({
      data: {
        title: 'Data Structures Basics Test',
        description: 'Test your understanding of basic data structures',
        duration: 45,
        passingScore: 70,
        moduleId: dsaModule1.id,
      },
    });

    // Create Test Questions
    await prisma.testQuestion.createMany({
      data: [
        {
          question: 'What is the time complexity of accessing an element in an array?',
          options: ['O(1)', 'O(n)', 'O(log n)', 'O(n^2)'],
          correctAnswer: 0,
          explanation: 'Array access is O(1) because elements are stored in contiguous memory locations.',
          testId: dsaTest1.id,
        },
        {
          question: 'Which data structure uses LIFO (Last In First Out) principle?',
          options: ['Queue', 'Stack', 'Tree', 'Graph'],
          correctAnswer: 1,
          explanation: 'Stack follows the LIFO principle where the last element added is the first one to be removed.',
          testId: dsaTest1.id,
        },
      ],
    });

    console.log('Sample courses created successfully!');
  } catch (error) {
    console.error('Error creating sample courses:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createSampleCourses(); 