import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(
  request: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Create a test with both MCQ and programming questions
    const test = await prisma.test.create({
      data: {
        title: 'Python Basics Assessment',
        description: 'Test your knowledge of Python basics with MCQ and programming questions',
        duration: 60, // 60 minutes
        passingScore: 70,
        moduleId: params.courseId,
        questions: {
          create: [
            // MCQ Questions
            {
              type: 'MCQ',
              question: 'What is the output of print(type(5/2))?',
              options: ['<class \'int\'>', '<class \'float\'>', '<class \'number\'>', '<class \'decimal\'>'],
              correctAnswer: 1,
              explanation: 'In Python 3, division (/) always returns a float.',
            },
            {
              type: 'MCQ',
              question: 'Which of the following is not a valid variable name in Python?',
              options: ['my_var', '_var', '2var', 'var2'],
              correctAnswer: 2,
              explanation: 'Variable names cannot start with a number in Python.',
            },
            {
              type: 'MCQ',
              question: 'What is the correct way to create a list in Python?',
              options: ['list = []', 'list = list()', 'list = {}', 'list = ()'],
              correctAnswer: 0,
              explanation: 'Square brackets [] are used to create an empty list in Python.',
            },
            {
              type: 'MCQ',
              question: 'Which method is used to add an element to the end of a list?',
              options: ['append()', 'add()', 'insert()', 'extend()'],
              correctAnswer: 0,
              explanation: 'The append() method adds an element to the end of a list.',
            },
            {
              type: 'MCQ',
              question: 'What is the output of len("Hello World")?',
              options: ['10', '11', '12', '9'],
              correctAnswer: 1,
              explanation: 'The len() function counts all characters including spaces.',
            },
            // Programming Questions
            {
              type: 'PROGRAMMING',
              question: 'Write a function to find the longest common subsequence of two strings.\n\nA subsequence is a sequence that appears in the same relative order, but not necessarily contiguous. For example, "abc", "abg", "bdf", "aeg", "acefg", etc. are subsequences of "abcdefg".',
              initialCode: 'def longest_common_subsequence(text1: str, text2: str) -> str:\n    # Your code here\n    pass\n\n# Example:\n# Input: text1 = "abcde", text2 = "ace"\n# Output: "ace"\n# Explanation: The longest common subsequence is "ace" and its length is 3.',
              testCases: {
                create: [
                  {
                    input: '"abcde", "ace"',
                    expectedOutput: '"ace"',
                  },
                  {
                    input: '"abc", "abc"',
                    expectedOutput: '"abc"',
                  },
                  {
                    input: '"abc", "def"',
                    expectedOutput: '""',
                  }
                ],
              },
              explanation: 'Use dynamic programming to find the longest common subsequence.',
            },
            {
              type: 'PROGRAMMING',
              question: 'Write a function to validate a binary search tree (BST).\n\nA valid BST is defined as follows:\n- The left subtree of a node contains only nodes with keys less than the node\'s key.\n- The right subtree of a node contains only nodes with keys greater than the node\'s key.\n- Both the left and right subtrees must also be binary search trees.',
              initialCode: 'class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\ndef is_valid_bst(root: TreeNode) -> bool:\n    # Your code here\n    pass\n\n# Example:\n#     5\n#    / \\\n#   1   4\n#      / \\\n#     3   6\n# Input: root = [5,1,4,null,null,3,6]\n# Output: false\n# Explanation: The root node\'s value is 5 but its right child\'s value is 4.',
              testCases: {
                create: [
                  {
                    input: 'TreeNode(2, TreeNode(1), TreeNode(3))',
                    expectedOutput: 'True',
                  },
                  {
                    input: 'TreeNode(5, TreeNode(1), TreeNode(4, TreeNode(3), TreeNode(6)))',
                    expectedOutput: 'False',
                  },
                  {
                    input: 'TreeNode(5, TreeNode(4), TreeNode(6, TreeNode(3), TreeNode(7)))',
                    expectedOutput: 'False',
                  }
                ],
              },
              explanation: 'Use recursion with valid range checking to validate the BST property.',
            },
            {
              type: 'PROGRAMMING',
              question: 'Write a function that takes a list of numbers and returns their sum.',
              initialCode: 'def sum_numbers(numbers):\n    # Your code here\n    pass\n',
              testCases: {
                create: [
                  {
                    input: '[1, 2, 3, 4, 5]',
                    expectedOutput: '15',
                  },
                  {
                    input: '[-1, 0, 1]',
                    expectedOutput: '0',
                  },
                ],
              },
              explanation: 'Use a loop or the sum() function to add all numbers in the list.',
            },
            {
              type: 'PROGRAMMING',
              question: 'Write a function that checks if a string is a palindrome.',
              initialCode: 'def is_palindrome(text):\n    # Your code here\n    pass\n',
              testCases: {
                create: [
                  {
                    input: '"racecar"',
                    expectedOutput: 'True',
                  },
                  {
                    input: '"hello"',
                    expectedOutput: 'False',
                  },
                ],
              },
              explanation: 'Compare the string with its reverse, ignoring case and spaces.',
            },
            {
              type: 'PROGRAMMING',
              question: 'Write a function that finds the largest number in a list.',
              initialCode: 'def find_max(numbers):\n    # Your code here\n    pass\n',
              testCases: {
                create: [
                  {
                    input: '[1, 5, 2, 8, 3]',
                    expectedOutput: '8',
                  },
                  {
                    input: '[-5, -2, -8, -1]',
                    expectedOutput: '-1',
                  },
                ],
              },
              explanation: 'Use a loop or the max() function to find the largest number.',
            },
            {
              type: 'PROGRAMMING',
              question: 'Write a function that counts the frequency of each character in a string.',
              initialCode: 'def char_frequency(text):\n    # Your code here\n    pass\n',
              testCases: {
                create: [
                  {
                    input: '"hello"',
                    expectedOutput: "{'h': 1, 'e': 1, 'l': 2, 'o': 1}",
                  },
                  {
                    input: '"banana"',
                    expectedOutput: "{'b': 1, 'a': 3, 'n': 2}",
                  },
                ],
              },
              explanation: 'Use a dictionary to store character counts.',
            },
            {
              type: 'PROGRAMMING',
              question: 'Write a function that generates the Fibonacci sequence up to n terms.',
              initialCode: 'def fibonacci(n):\n    # Your code here\n    pass\n',
              testCases: {
                create: [
                  {
                    input: '5',
                    expectedOutput: '[0, 1, 1, 2, 3]',
                  },
                  {
                    input: '8',
                    expectedOutput: '[0, 1, 1, 2, 3, 5, 8, 13]',
                  },
                ],
              },
              explanation: 'Each number is the sum of the two preceding ones, starting from 0 and 1.',
            },
            {
              type: 'PROGRAMMING',
              question: 'Implement a binary search function that returns the index of a target number in a sorted list. Return -1 if the target is not found.',
              initialCode: 'def binary_search(numbers, target):\n    # Your code here\n    pass\n',
              testCases: {
                create: [
                  {
                    input: '[1, 3, 5, 7, 9, 11, 13, 15], 7',
                    expectedOutput: '3',
                  },
                  {
                    input: '[1, 3, 5, 7, 9, 11, 13, 15], 10',
                    expectedOutput: '-1',
                  },
                  {
                    input: '[1, 3, 5, 7, 9, 11, 13, 15], 1',
                    expectedOutput: '0',
                  },
                ],
              },
              explanation: 'Use the binary search algorithm to efficiently find the target number in the sorted list.',
            },
            {
              type: 'PROGRAMMING',
              question: 'Write a function that rotates a square matrix 90 degrees clockwise. The matrix should be modified in-place.',
              initialCode: 'def rotate_matrix(matrix):\n    # Your code here\n    pass\n\n# Example usage:\n# matrix = [\n#     [1, 2, 3],\n#     [4, 5, 6],\n#     [7, 8, 9]\n# ]\n# rotate_matrix(matrix)\n# print(matrix)  # Should print: [[7, 4, 1], [8, 5, 2], [9, 6, 3]]',
              testCases: {
                create: [
                  {
                    input: '[[1, 2, 3], [4, 5, 6], [7, 8, 9]]',
                    expectedOutput: '[[7, 4, 1], [8, 5, 2], [9, 6, 3]]',
                  },
                  {
                    input: '[[1, 2], [3, 4]]',
                    expectedOutput: '[[3, 1], [4, 2]]',
                  },
                ],
              },
              explanation: 'Rotate the matrix by first transposing it (swapping elements across the main diagonal) and then reversing each row.',
            },
            {
              type: 'PROGRAMMING',
              question: 'Write a program that prints all integers sequentially from 1 to a given number N.\n\nInput Format:\nThe program accepts a single integer num, which represents the upper limit of the sequence (N).\n\nOutput Format:\nThe output should display all numbers from 1 to num, separated by spaces.\n\nConstraints:\n- 1 ≤ N ≤ 1000',
              initialCode: 'def print_numbers(n):\n    # Write your code here\n    pass',
              testCases: {
                create: [
                  {
                    input: '5',
                    expectedOutput: '1 2 3 4 5',
                  },
                  {
                    input: '10',
                    expectedOutput: '1 2 3 4 5 6 7 8 9 10',
                  },
                  {
                    input: '1',
                    expectedOutput: '1',
                  }
                ],
              },
              explanation: 'The program should generate a sequence of numbers from 1 to N.',
            },
            {
              type: 'PROGRAMMING',
              question: 'Write a program to check if a given string is a palindrome.\n\nInput Format:\nA single line containing a string S.\n\nOutput Format:\nPrint "YES" if the string is a palindrome, "NO" otherwise.\n\nConstraints:\n- 1 ≤ |S| ≤ 1000\n- S contains only lowercase English letters',
              initialCode: 'def is_palindrome(s):\n    # Write your code here\n    pass',
              testCases: {
                create: [
                  {
                    input: 'madam',
                    expectedOutput: 'YES',
                  },
                  {
                    input: 'racecar',
                    expectedOutput: 'YES',
                  },
                  {
                    input: 'hello',
                    expectedOutput: 'NO',
                  }
                ],
              },
              explanation: 'A palindrome is a string that reads the same forwards and backwards.',
            },
          ],
        },
      },
      include: {
        questions: {
          include: {
            testCases: true,
          },
        },
      },
    });

    return NextResponse.json(test);
  } catch (error) {
    console.error('Error creating test:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 