import { prisma } from "../lib/prisma";

const testData = {
  title: "JavaScript Fundamentals Test",
  description: "A test covering basic JavaScript concepts and syntax",
  duration: 30, // 30 minutes
  passingScore: 70,
  moduleId: "module-1", // Replace with your actual module ID
  questions: [
    {
      question: "What is the correct way to declare a variable in JavaScript?",
      options: [
        "var x = 5",
        "let x = 5",
        "const x = 5",
        "All of the above"
      ],
      correctAnswer: 3
    },
    {
      question: "Which of the following is not a JavaScript data type?",
      options: [
        "String",
        "Boolean",
        "Integer",
        "Object"
      ],
      correctAnswer: 2
    },
    {
      question: "What does the '===' operator do in JavaScript?",
      options: [
        "Assigns a value",
        "Compares values and types",
        "Compares only values",
        "None of the above"
      ],
      correctAnswer: 1
    },
    {
      question: "How do you write a comment in JavaScript?",
      options: [
        "// This is a comment",
        "<!-- This is a comment -->",
        "/* This is a comment */",
        "Both A and C"
      ],
      correctAnswer: 3
    },
    {
      question: "What is the output of console.log(typeof null)?",
      options: [
        "null",
        "undefined",
        "object",
        "string"
      ],
      correctAnswer: 2
    },
    {
      question: "Which method is used to add an element to the end of an array?",
      options: [
        "push()",
        "pop()",
        "shift()",
        "unshift()"
      ],
      correctAnswer: 0
    },
    {
      question: "What is a closure in JavaScript?",
      options: [
        "A function that has access to its outer function's variables",
        "A way to close a browser window",
        "A method to clear memory",
        "A type of loop"
      ],
      correctAnswer: 0
    },
    {
      question: "What does the 'this' keyword refer to in JavaScript?",
      options: [
        "The current function",
        "The global object",
        "The object that owns the current code",
        "The parent object"
      ],
      correctAnswer: 2
    },
    {
      question: "Which of these is not a JavaScript framework?",
      options: [
        "React",
        "Angular",
        "Vue",
        "Django"
      ],
      correctAnswer: 3
    },
    {
      question: "What is the purpose of the 'use strict' directive?",
      options: [
        "To enable strict mode",
        "To disable certain JavaScript features",
        "To make code run faster",
        "To prevent variable hoisting"
      ],
      correctAnswer: 0
    }
  ]
};

async function createTest() {
  try {
    const test = await prisma.test.create({
      data: {
        title: testData.title,
        description: testData.description,
        duration: testData.duration,
        passingScore: testData.passingScore,
        moduleId: testData.moduleId,
        questions: {
          create: testData.questions.map(question => ({
            question: question.question,
            options: question.options,
            correctAnswer: question.correctAnswer,
          })),
        },
      },
      include: {
        questions: true,
      },
    });

    console.log("Test created successfully:", test);
  } catch (error) {
    console.error("Error creating test:", error);
  } finally {
    await prisma.$disconnect();
  }
}

createTest(); 