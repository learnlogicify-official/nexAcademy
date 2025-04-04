"use client";

import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Play, Maximize2, ChevronLeft, ChevronRight, Clock, BookOpen, Code2, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import CodeEditor from '@/components/ui/code-editor';

interface Problem {
  id: string;
  title: string;
  description: string;
  constraints: string[];
  inputFormat: string;
  outputFormat: string;
  samples: {
    input: string;
    output: string;
    explanation?: string[];
  }[];
  hiddenTests: {
    input: string;
    output: string;
  }[];
  initialCode: string;
}

// Add new types for Judge0 API
interface Judge0Submission {
  source_code: string;
  language_id: number; // 71 for Python
  stdin: string;
  expected_output: string;
}

interface Judge0Response {
  stdout: string | null;
  stderr: string | null;
  status: {
    id: number;
    description: string;
  };
  time: string;
  memory: number;
  isHidden?: boolean;
  expected_output?: string;
}

interface LanguageConfig {
  id: number;
  name: string;
  extension: string;
  monacoId: string;
  defaultCode: string;
}

const LANGUAGES: LanguageConfig[] = [
  {
    id: 71,
    name: 'Python',
    extension: 'py',
    monacoId: 'python',
    defaultCode: '# Write your code here\n'
  },
  {
    id: 54,
    name: 'C++',
    extension: 'cpp',
    monacoId: 'cpp',
    defaultCode: `#include <iostream>
using namespace std;

int main() {
    // Write your code here
    return 0;
}`
  },
  {
    id: 50,
    name: 'C',
    extension: 'c',
    monacoId: 'c',
    defaultCode: `#include <stdio.h>

int main() {
    // Write your code here
    return 0;
}`
  },
  {
    id: 62,
    name: 'Java',
    extension: 'java',
    monacoId: 'java',
    defaultCode: `public class Solution {
    public static void main(String[] args) {
        // Write your code here
    }
}`
  },
  {
    id: 63,
    name: 'JavaScript',
    extension: 'js',
    monacoId: 'javascript',
    defaultCode: '// Write your code here\n'
  }
];

const problems: Problem[] = [
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
  {
    id: '2',
    title: 'Calculate Sum of Array',
    description: 'Write a program to calculate the sum of all elements in an array.',
    inputFormat: 'First line contains N, the size of array. Second line contains N space-separated integers.',
    outputFormat: 'Print the sum of all elements in the array.',
    constraints: ['1 ≤ N ≤ 1000', '-1000 ≤ arr[i] ≤ 1000'],
    samples: [
      {
        input: '5\n1 2 3 4 5',
        output: '15',
        explanation: ['Sum of elements: 1 + 2 + 3 + 4 + 5 = 15']
      }
    ],
    hiddenTests: [
      { input: '3\n10 20 30', output: '60' },
      { input: '1\n5', output: '5' },
      { input: '4\n-1 2 -3 4', output: '2' }
    ],
    initialCode: `def calculate_sum(arr):
    # Write your code here
    pass`
  },
  {
    id: '3',
    title: 'Find Maximum Element',
    description: 'Write a program to find the maximum element in an array.',
    inputFormat: 'First line contains N, the size of array. Second line contains N space-separated integers.',
    outputFormat: 'Print the maximum element in the array.',
    constraints: ['1 ≤ N ≤ 1000', '-1000 ≤ arr[i] ≤ 1000'],
    samples: [
      {
        input: '5\n3 7 1 9 4',
        output: '9',
        explanation: ['The maximum element in the array is 9']
      }
    ],
    hiddenTests: [
      { input: '3\n10 20 30', output: '30' },
      { input: '1\n5', output: '5' },
      { input: '4\n-1 2 -3 4', output: '4' }
    ],
    initialCode: `def find_maximum(arr):
    # Write your code here
    pass`
  },
  {
    id: '4',
    title: 'Reverse Array',
    description: 'Write a program to reverse the elements of an array.',
    inputFormat: 'First line contains N, the size of array. Second line contains N space-separated integers.',
    outputFormat: 'Print the reversed array, with elements separated by spaces.',
    constraints: ['1 ≤ N ≤ 1000', '-1000 ≤ arr[i] ≤ 1000'],
    samples: [
      {
        input: '5\n1 2 3 4 5',
        output: '5 4 3 2 1',
        explanation: ['The array is reversed: [5, 4, 3, 2, 1]']
      }
    ],
    hiddenTests: [
      { input: '3\n10 20 30', output: '30 20 10' },
      { input: '1\n5', output: '5' },
      { input: '4\n-1 2 -3 4', output: '4 -3 2 -1' }
    ],
    initialCode: `def reverse_array(arr):
    # Write your code here
    pass`
  },
  {
    id: '5',
    title: 'Count Even Numbers',
    description: 'Write a program to count the number of even integers in an array.',
    inputFormat: 'First line contains N, the size of array. Second line contains N space-separated integers.',
    outputFormat: 'Print the count of even numbers in the array.',
    constraints: ['1 ≤ N ≤ 1000', '-1000 ≤ arr[i] ≤ 1000'],
    samples: [
      {
        input: '5\n2 3 4 5 6',
        output: '3',
        explanation: ['There are 3 even numbers: 2, 4, and 6']
      }
    ],
    hiddenTests: [
      { input: '3\n2 4 6', output: '3' },
      { input: '1\n5', output: '0' },
      { input: '4\n1 2 3 4', output: '2' }
    ],
    initialCode: `def count_even_numbers(arr):
    # Write your code here
    pass`
  },
  {
    id: '6',
    title: 'Check Palindrome',
    description: 'Write a program to check if a given string is a palindrome.',
    inputFormat: 'A single line containing a string S.',
    outputFormat: 'Print "YES" if the string is a palindrome, "NO" otherwise.',
    constraints: ['1 ≤ |S| ≤ 1000', 'S contains only lowercase English letters'],
    samples: [
      {
        input: 'madam',
        output: 'YES',
        explanation: ['"madam" reads the same forwards and backwards']
      }
    ],
    hiddenTests: [
      { input: 'racecar', output: 'YES' },
      { input: 'hello', output: 'NO' },
      { input: 'a', output: 'YES' }
    ],
    initialCode: `def is_palindrome(s):
    # Write your code here
    pass`
  },
  {
    id: '7',
    title: 'Calculate Factorial',
    description: 'Write a program to calculate the factorial of a given number N.',
    inputFormat: 'A single integer N.',
    outputFormat: 'Print the factorial of N.',
    constraints: ['0 ≤ N ≤ 10'],
    samples: [
      {
        input: '5',
        output: '120',
        explanation: ['5! = 5 × 4 × 3 × 2 × 1 = 120']
      }
    ],
    hiddenTests: [
      { input: '3', output: '6' },
      { input: '0', output: '1' },
      { input: '10', output: '3628800' }
    ],
    initialCode: `def factorial(n):
    # Write your code here
    pass`
  },
  {
    id: '8',
    title: 'Check Prime Number',
    description: 'Write a program to check if a given number is prime.',
    inputFormat: 'A single integer N.',
    outputFormat: 'Print "YES" if N is prime, "NO" otherwise.',
    constraints: ['1 ≤ N ≤ 1000'],
    samples: [
      {
        input: '7',
        output: 'YES',
        explanation: ['7 is a prime number as it has no divisors other than 1 and itself']
      }
    ],
    hiddenTests: [
      { input: '2', output: 'YES' },
      { input: '4', output: 'NO' },
      { input: '17', output: 'YES' }
    ],
    initialCode: `def is_prime(n):
    # Write your code here
    pass`
  },
  {
    id: '9',
    title: 'Find GCD',
    description: 'Write a program to find the Greatest Common Divisor (GCD) of two numbers.',
    inputFormat: 'Two space-separated integers A and B.',
    outputFormat: 'Print the GCD of A and B.',
    constraints: ['1 ≤ A, B ≤ 1000'],
    samples: [
      {
        input: '12 18',
        output: '6',
        explanation: ['The GCD of 12 and 18 is 6']
      }
    ],
    hiddenTests: [
      { input: '48 18', output: '6' },
      { input: '7 13', output: '1' },
      { input: '100 25', output: '25' }
    ],
    initialCode: `def find_gcd(a, b):
    # Write your code here
    pass`
  },
  {
    id: '10',
    title: 'Check Armstrong Number',
    description: 'Write a program to check if a given number is an Armstrong number.',
    inputFormat: 'A single integer N.',
    outputFormat: 'Print "YES" if N is an Armstrong number, "NO" otherwise.',
    constraints: ['1 ≤ N ≤ 1000'],
    samples: [
      {
        input: '153',
        output: 'YES',
        explanation: ['153 is an Armstrong number: 1³ + 5³ + 3³ = 1 + 125 + 27 = 153']
      }
    ],
    hiddenTests: [
      { input: '370', output: 'YES' },
      { input: '123', output: 'NO' },
      { input: '407', output: 'YES' }
    ],
    initialCode: `def is_armstrong(n):
    # Write your code here
    pass`
  }
];

export default function ProblemPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState<'description' | 'test'>('description');
  const [isRunning, setIsRunning] = useState(false);
  const [problem, setProblem] = useState<Problem | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageConfig>(LANGUAGES[0]);
  const [code, setCode] = useState(LANGUAGES[0].defaultCode);
  const [leftPanelWidth, setLeftPanelWidth] = useState(45);
  const [isDragging, setIsDragging] = useState(false);
  const [testResults, setTestResults] = useState<Judge0Response[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showHiddenTests, setShowHiddenTests] = useState(false);

  // Initialize from localStorage on client side only
  useEffect(() => {
    // Try to restore the last selected language from localStorage
    const savedLanguage = localStorage.getItem(`problem_${params.id}_language`);
    if (savedLanguage) {
      const lang = LANGUAGES.find(l => l.id.toString() === savedLanguage);
      if (lang) {
        setSelectedLanguage(lang);
      }
    }

    // Try to restore saved code for this problem and language
    const savedCode = localStorage.getItem(`problem_${params.id}_code_${selectedLanguage.id}`);
    if (savedCode) {
      setCode(savedCode);
    }
  }, [params.id]); // Run once on mount for each problem

  // Save code to localStorage whenever it changes
  useEffect(() => {
    if (problem && typeof window !== 'undefined') {
      localStorage.setItem(`problem_${params.id}_code_${selectedLanguage.id}`, code);
    }
  }, [code, params.id, selectedLanguage.id, problem]);

  // Save selected language to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(`problem_${params.id}_language`, selectedLanguage.id.toString());
    }
  }, [selectedLanguage, params.id]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;

    const container = document.querySelector('.split-view');
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const newWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100;

    // Clamp the width between 30% and 70%
    const clampedWidth = Math.min(Math.max(newWidth, 30), 70);
    setLeftPanelWidth(clampedWidth);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);

  useEffect(() => {
    const fetchProblem = async () => {
      const foundProblem = problems.find(p => p.id === params.id);
      if (foundProblem) {
        setProblem(foundProblem);
        // Load saved code or use default
        const savedCode = localStorage.getItem(`problem_${params.id}_code_${selectedLanguage.id}`);
        setCode(savedCode || foundProblem.initialCode || selectedLanguage.defaultCode);
      }
    };

    fetchProblem();
  }, [params.id, selectedLanguage.id]);

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = LANGUAGES.find(lang => lang.id === Number(event.target.value));
    if (newLanguage) {
      setSelectedLanguage(newLanguage);
      // Load saved code for the new language or use default
      const savedCode = localStorage.getItem(`problem_${params.id}_code_${newLanguage.id}`);
      setCode(savedCode || newLanguage.defaultCode);
    }
  };

  // Add a function to reset code to default
  const handleResetCode = () => {
    const defaultCode = problem?.initialCode || selectedLanguage.defaultCode;
    setCode(defaultCode);
    localStorage.setItem(`problem_${params.id}_code_${selectedLanguage.id}`, defaultCode);
  };

  const handleRunCode = async () => {
    if (!problem) return;
    
    setIsRunning(true);
    setTestResults([]);
    setActiveTab('test');

    try {
      const results = await Promise.all(
        problem.samples.map(async (sample, index) => {
          try {
            const response = await fetch('/api/run-code', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                code: code,
                input: sample.input,
                expected_output: sample.output,
                problemId: problem.id,
                languageId: selectedLanguage.id
              })
            });

            if (!response.ok) {
              throw new Error('Failed to run code');
            }

            const result = await response.json();
            return result;
          } catch (error) {
            console.error(`Error running sample ${index + 1}:`, error);
            return {
              status: { id: 6 },
              stdout: '',
              stderr: error instanceof Error ? error.message : 'Unknown error occurred',
              time: '0.000',
              memory: 0,
              compile_output: ''
            };
          }
        })
      );

      setTestResults(results);
    } catch (error) {
      console.error('Error running code:', error);
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmit = async () => {
    if (!problem) return;
    
    setIsSubmitting(true);
    setTestResults([]);
    setActiveTab('test');

    try {
      // Run sample tests first
      const sampleResults = await Promise.all(
        problem.samples.map(async (sample) => {
          try {
            const response = await fetch('/api/run-code', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                code: code,
                input: sample.input,
                expected_output: sample.output,
                problemId: problem.id,
                languageId: selectedLanguage.id
              })
            });

            if (!response.ok) {
              throw new Error('Failed to run code');
            }

            return await response.json();
          } catch (error) {
            console.error('Error running sample test:', error);
            return {
              status: { id: 6 },
              stdout: '',
              stderr: error instanceof Error ? error.message : 'Unknown error occurred',
              time: '0.000',
              memory: 0,
              compile_output: ''
            };
          }
        })
      );

      // Run hidden tests
      const hiddenResults = await Promise.all(
        problem.hiddenTests.map(async (test) => {
          try {
            const response = await fetch('/api/run-code', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                code: code,
                input: test.input,
                expected_output: test.output,
                problemId: problem.id,
                languageId: selectedLanguage.id
              })
            });

            if (!response.ok) {
              throw new Error('Failed to run code');
            }

            return await response.json();
          } catch (error) {
            console.error('Error running hidden test:', error);
            return {
              status: { id: 6 },
              stdout: '',
              stderr: error instanceof Error ? error.message : 'Unknown error occurred',
              time: '0.000',
              memory: 0,
              compile_output: ''
            };
          }
        })
      );

      setTestResults([...sampleResults, ...hiddenResults]);
      setShowHiddenTests(true);
    } catch (error) {
      console.error('Error submitting code:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Alt + Left Arrow for previous
      if (e.altKey && e.key === 'ArrowLeft') {
        const currentIndex = problems.findIndex(p => p.id === params.id);
        if (currentIndex > 0) {
          window.location.href = `/problems/${problems[currentIndex - 1].id}`;
        }
      }
      // Alt + Right Arrow for next
      if (e.altKey && e.key === 'ArrowRight') {
        const currentIndex = problems.findIndex(p => p.id === params.id);
        if (currentIndex < problems.length - 1) {
          window.location.href = `/problems/${problems[currentIndex + 1].id}`;
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [params.id]);

  if (!problem) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading problem...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="main-layout relative">
      {/* Top Navigation */}
      <div className="top-nav">
        <button className="nav-button">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center space-x-4 ml-4">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-4 h-4 text-gray-400" />
            <span className="text-sm font-medium">Problem Solving in Python</span>
          </div>
          <div className="flex items-center space-x-2">
            <Code2 className="w-4 h-4 text-gray-400" />
            <span className="text-sm">Looping</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-gray-400" />
            <span className="text-sm">Level 1</span>
          </div>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => {
                const currentIndex = problems.findIndex(p => p.id === params.id);
                if (currentIndex > 0) {
                  window.location.href = `/problems/${problems[currentIndex - 1].id}`;
                }
              }}
              disabled={params.id === '1'}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${
                params.id === '1' 
                  ? 'opacity-50 cursor-not-allowed bg-gray-800 text-gray-400' 
                  : 'bg-gray-800 hover:bg-gray-700 text-white'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Previous</span>
            </button>
            <button 
              onClick={() => {
                const currentIndex = problems.findIndex(p => p.id === params.id);
                if (currentIndex < problems.length - 1) {
                  window.location.href = `/problems/${problems[currentIndex + 1].id}`;
                }
              }}
              disabled={params.id === problems[problems.length - 1].id}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${
                params.id === problems[problems.length - 1].id 
                  ? 'opacity-50 cursor-not-allowed bg-gray-800 text-gray-400' 
                  : 'bg-gray-800 hover:bg-gray-700 text-white'
              }`}
            >
              <span className="text-sm font-medium">Next</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-green-400" />
            <span className="text-sm text-green-400 font-medium">00:07:32</span>
          </div>
        </div>
      </div>

      <div className="split-view relative h-[calc(100vh-3.5rem)] flex overflow-hidden">
        {/* Left Panel */}
        <div 
          className="h-full overflow-auto"
          style={{ width: `${leftPanelWidth}%` }}
        >
          <div className="panel-header">
            <button 
              className={`tab-button ${activeTab === 'description' ? 'active' : ''}`}
              onClick={() => setActiveTab('description')}
            >
              Description
            </button>
            <button 
              className={`tab-button ${activeTab === 'test' ? 'active' : ''}`}
              onClick={() => setActiveTab('test')}
            >
              Test Result
            </button>
            <div className="ml-auto flex items-center space-x-2">
              <button className="nav-button">
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="panel-content">
            {activeTab === 'description' ? (
              <div className="space-y-6">
                <h1 className="text-xl font-semibold">{problem.title}</h1>
                
                <div>
                  <h2 className="text-base font-medium mb-2">Problem Statement:</h2>
                  <p className="text-gray-300">{problem.description}</p>
                </div>

                <div>
                  <h2 className="text-base font-medium mb-2">Input Format:</h2>
                  <p className="text-gray-300">{problem.inputFormat}</p>
                </div>

                <div>
                  <h2 className="text-base font-medium mb-2">Output Format:</h2>
                  <p className="text-gray-300">{problem.outputFormat}</p>
                </div>

                <div>
                  <h2 className="text-base font-medium mb-2">Constraints:</h2>
                  <ul className="explanation-list">
                    {problem.constraints.map((constraint, index) => (
                      <li key={index}>{constraint}</li>
                    ))}
                  </ul>
                </div>

                {problem.samples.map((sample, index) => (
                  <div key={index}>
                    <h2 className="text-base font-medium mb-2">Sample {index + 1}:</h2>
                    <div className="flex-1">
                      <div className="bg-gray-800 rounded-lg p-4">
                        <div className="text-sm text-gray-400 mb-2">Input</div>
                        <pre className="text-white font-mono whitespace-pre-wrap break-words">
                          {sample.input}
                        </pre>
                      </div>
                      <div className="bg-gray-800 rounded-lg p-4 mt-4">
                        <div className="text-sm text-gray-400 mb-2">Expected Output</div>
                        <pre className="text-white font-mono whitespace-pre-wrap break-words">
                          {sample.output}
                        </pre>
                      </div>
                    </div>
                    {sample.explanation && (
                      <div className="mt-2">
                        <h3 className="text-sm font-medium mb-1">Explanation:</h3>
                        <ul className="explanation-list">
                          {sample.explanation.map((line, i) => (
                            <li key={i}>{line}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                <h2 className="text-lg font-medium">Test Results</h2>
                <div className="space-y-4">
                  {/* Test Results */}
                  {testResults.map((result, index) => {
                    const testCase = problem?.samples[index];
                    if (!testCase) return null;
                    
                    return (
                      <div key={index} className="bg-gray-800/50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-300">
                            Test Case {index + 1}
                          </span>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            result.status.id === 3
                              ? 'bg-green-500/20 text-green-400'
                              : result.status.id === 4
                              ? 'bg-red-500/20 text-red-400'
                              : 'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {result.status.description}
                          </span>
                        </div>
                        <div className="space-y-2">
                          <div>
                            <span className="text-xs text-gray-400">Input:</span>
                            <pre className="mt-1 text-sm bg-gray-900/50 p-2 rounded">
                              {testCase.input}
                            </pre>
                          </div>
                          <div>
                            <span className="text-xs text-gray-400">Expected Output:</span>
                            <pre className="mt-1 text-sm bg-gray-900/50 p-2 rounded">
                              {testCase.output}
                            </pre>
                          </div>
                          <div>
                            <span className="text-xs text-gray-400">Your Output:</span>
                            <pre className={`mt-1 text-sm bg-gray-900/50 p-2 rounded whitespace-pre-wrap break-words font-mono ${
                              result.stderr || result.status.id === 11 || result.status.id === 6
                                ? 'text-red-400 border border-red-500/30 bg-red-950/20' 
                                : ''
                            }`}>
                              {result.stderr 
                                ? `Error: ${result.stderr}`
                                : result.stdout || 'No output'}
                            </pre>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {/* Hidden Test Cases Summary */}
                  {showHiddenTests && testResults.length > problem?.samples.length && (
                    <div className="mt-6">
                      <h3 className="text-base font-medium mb-3">Hidden Test Cases</h3>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-700">
                          <thead>
                            <tr>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Test Case
                              </th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Status
                              </th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Time
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-700">
                            {testResults
                              .slice(problem?.samples.length)
                              .map((result, index) => (
                                <tr key={index}>
                                  <td className="px-4 py-2 text-sm text-gray-300">
                                    Test Case {index + 1}
                                  </td>
                                  <td className="px-4 py-2">
                                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                                      result.status.id === 3
                                        ? 'bg-green-500/20 text-green-400'
                                        : result.status.id === 4
                                        ? 'bg-red-500/20 text-red-400'
                                        : 'bg-yellow-500/20 text-yellow-400'
                                    }`}>
                                      {result.status.description}
                                    </span>
                                  </td>
                                  <td className="px-4 py-2 text-sm text-gray-300">
                                    {result.time}ms
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Resizer */}
        <div
          className="w-1 hover:w-2 bg-gray-800 hover:bg-gray-700 cursor-col-resize transition-all relative z-10 flex items-center justify-center"
          onMouseDown={handleMouseDown}
        >
          <div className="absolute w-4 h-full opacity-0"></div>
          <div className="w-0.5 h-8 bg-gray-600 rounded-full"></div>
        </div>

        {/* Right Panel */}
        <div 
          className="h-full flex flex-col"
          style={{ 
            width: `${100 - leftPanelWidth}%`,
            marginRight: '64px'
          }}
        >
          <div className="panel-header flex-none">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-sm font-medium mr-2">Language</span>
                <select 
                  className="code-input"
                  value={selectedLanguage.id}
                  onChange={handleLanguageChange}
                >
                  {LANGUAGES.map(lang => (
                    <option key={lang.id} value={lang.id}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={handleResetCode}
                className="px-2 py-1 text-sm text-gray-400 hover:text-white transition-colors"
              >
                Reset Code
              </button>
            </div>
          </div>

          <div className="editor-container flex-1">
            <div className="h-full">
              <CodeEditor 
                code={code} 
                onChange={(value: string) => setCode(value)}
                language={selectedLanguage.monacoId}
              />
            </div>
          </div>
          <div className="flex items-center justify-end gap-2 p-4 border-t border-gray-800 flex-none">
            <button
              onClick={handleRunCode}
              disabled={isRunning}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors ${
                isRunning ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <Play className="w-4 h-4" />
              {isRunning ? 'Running...' : 'Run'}
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-500 rounded-lg transition-colors ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </div>
      </div>

      {/* Question Navigator */}
      <div className="fixed right-0 top-0 h-full w-16 bg-gray-900 border-l border-gray-800 flex flex-col items-center py-4 mt-14">
        {problems.map((p, index) => (
          <button
            key={p.id}
            onClick={() => window.location.href = `/problems/${p.id}`}
            className={`w-10 h-10 mb-2 rounded-lg flex items-center justify-center text-sm font-medium transition-colors ${
              p.id === params.id 
                ? 'bg-green-600 text-white' 
                : 'text-gray-400 hover:bg-gray-800'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </main>
  );
} 