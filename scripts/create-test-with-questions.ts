import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const testQuestions = [
  {
    question: "What is Python?",
    options: ['A snake', 'A programming language', 'A type of coffee', 'A car brand'],
    correctAnswer: 1,
    explanation: 'Python is a high-level programming language.',
  },
  {
    question: "Which of these is a Python data type?",
    options: ['String', 'Integer', 'Float', 'All of the above'],
    correctAnswer: 3,
    explanation: 'Python has several built-in data types including strings, integers, and floats.',
  },
  {
    question: "What is a closure in JavaScript?",
    options: [
      "A function that has access to its outer function's variables",
      "A way to close a browser window",
      "A method to clear memory",
      "A type of loop"
    ],
    correctAnswer: 0,
    explanation: "A closure is a function that has access to its outer function's variables.",
  },
  {
    question: "What does the 'this' keyword refer to in JavaScript?",
    options: [
      "The current function",
      "The global object",
      "The object that owns the current code",
      "The parent object"
    ],
    correctAnswer: 2,
    explanation: "The 'this' keyword refers to the object that owns the current code.",
  },
  {
    question: "Which of these is not a JavaScript framework?",
    options: [
      "React",
      "Angular",
      "Vue",
      "Django"
    ],
    correctAnswer: 3,
    explanation: "Django is a Python web framework, not a JavaScript framework.",
  },
  {
    question: "What is the purpose of the 'use strict' directive?",
    options: [
      "To enable strict mode",
      "To disable certain JavaScript features",
      "To make code run faster",
      "To prevent variable hoisting"
    ],
    correctAnswer: 0,
    explanation: "The 'use strict' directive enables strict mode in JavaScript.",
  },
  {
    question: "What is the time complexity of accessing an element in an array?",
    options: ['O(1)', 'O(n)', 'O(log n)', 'O(n^2)'],
    correctAnswer: 0,
    explanation: "Array access is O(1) because elements are stored in contiguous memory locations.",
  },
  {
    question: "Which data structure uses LIFO (Last In First Out) principle?",
    options: ['Queue', 'Stack', 'Tree', 'Graph'],
    correctAnswer: 1,
    explanation: "Stack follows the LIFO principle where the last element added is the first one to be removed.",
  },
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Tech Modern Language",
      "Hyper Transfer Markup Language",
      "Home Tool Markup Language"
    ],
    correctAnswer: 0,
    explanation: "HTML stands for Hyper Text Markup Language.",
  },
  {
    question: "Which tag is used to create a hyperlink?",
    options: ['<link>', '<a>', '<href>', '<url>'],
    correctAnswer: 1,
    explanation: "The <a> tag is used to create hyperlinks in HTML.",
  }
];

async function createTestWithQuestions() {
  try {
    // Get the first course
    const course = await prisma.course.findFirst();
    if (!course) {
      throw new Error('No course found. Please create a course first.');
    }

    // Create a module for the course
    const module = await prisma.module.create({
      data: {
        title: 'Programming Fundamentals Test Module',
        description: 'A comprehensive test covering various programming concepts',
        courseId: course.id,
        order: 1,
      },
    });

    // Create a test in the module
    const test = await prisma.test.create({
      data: {
        title: 'Programming Fundamentals Assessment',
        description: 'Test your knowledge of programming fundamentals with this comprehensive assessment',
        duration: 60, // 60 minutes
        passingScore: 70, // 70% required to pass
        moduleId: module.id,
        questions: {
          create: testQuestions,
        },
      },
      include: {
        questions: true,
      },
    });

    console.log('Test created successfully:', {
      course: course.title,
      module: module.title,
      test: test.title,
      questions: test.questions.length,
    });
  } catch (error) {
    console.error('Error creating test:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createTestWithQuestions(); 