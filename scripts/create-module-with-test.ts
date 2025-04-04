import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const testQuestions = [
  {
    question: "What is the output of `print(2 ** 3)` in Python?",
    options: ["6", "8", "5", "9"],
    correctAnswer: 1,
    explanation: "The `**` operator in Python is used for exponentiation. 2 ** 3 means 2 raised to the power of 3, which equals 8."
  },
  {
    question: "Which of the following is NOT a JavaScript data type?",
    options: ["String", "Boolean", "Integer", "Object"],
    correctAnswer: 2,
    explanation: "JavaScript has Number type, not Integer. All numbers in JavaScript are stored as floating-point numbers."
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
    explanation: "HTML stands for Hyper Text Markup Language, which is the standard markup language for creating web pages."
  },
  {
    question: "Which data structure uses LIFO (Last In First Out) principle?",
    options: ["Queue", "Stack", "Array", "Linked List"],
    correctAnswer: 1,
    explanation: "A Stack follows the LIFO principle where the last element added is the first one to be removed."
  },
  {
    question: "What is the time complexity of binary search?",
    options: ["O(n)", "O(log n)", "O(n log n)", "O(n²)"],
    correctAnswer: 1,
    explanation: "Binary search has a time complexity of O(log n) as it divides the search space in half with each comparison."
  },
  {
    question: "Which CSS property is used to change the text color?",
    options: ["text-color", "font-color", "color", "text-style"],
    correctAnswer: 2,
    explanation: "The 'color' property in CSS is used to set the color of text."
  },
  {
    question: "What is the correct way to declare a variable in Python?",
    options: ["var x = 5", "let x = 5", "x = 5", "const x = 5"],
    correctAnswer: 2,
    explanation: "In Python, variables are declared by simply assigning a value using the = operator."
  },
  {
    question: "Which of these is NOT a valid JavaScript loop?",
    options: ["for", "while", "do-while", "foreach"],
    correctAnswer: 3,
    explanation: "JavaScript has 'for...of' and 'for...in' loops, but not 'foreach'. 'foreach' is commonly used in other languages like PHP."
  },
  {
    question: "What is the correct way to create a function in JavaScript?",
    options: [
      "function myFunction() {}",
      "def myFunction() {}",
      "func myFunction() {}",
      "void myFunction() {}"
    ],
    correctAnswer: 0,
    explanation: "In JavaScript, functions are declared using the 'function' keyword followed by the function name and parentheses."
  },
  {
    question: "Which HTTP method is used to send data to a server?",
    options: ["GET", "POST", "PUT", "DELETE"],
    correctAnswer: 1,
    explanation: "The POST method is used to send data to a server to create or update a resource."
  }
];

async function createModuleWithTest() {
  try {
    // Get the first course
    const course = await prisma.course.findFirst();
    if (!course) {
      throw new Error('No course found. Please create a course first.');
    }

    // Create a module
    const module = await prisma.module.create({
      data: {
        title: "Programming Fundamentals Assessment",
        description: "Test your knowledge of basic programming concepts",
        order: 1,
        courseId: course.id
      }
    });

    // Create a test in the module
    const test = await prisma.test.create({
      data: {
        title: "Programming Basics Test",
        description: "A comprehensive test covering fundamental programming concepts",
        duration: 30, // 30 minutes
        passingScore: 70, // 70% required to pass
        moduleId: module.id,
        questions: {
          create: testQuestions
        }
      },
      include: {
        questions: true
      }
    });

    console.log('Successfully created:');
    console.log(`- Course: ${course.title}`);
    console.log(`- Module: ${module.title}`);
    console.log(`- Test: ${test.title} with ${test.questions.length} questions`);

  } catch (error) {
    console.error('Error creating module with test:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createModuleWithTest(); 