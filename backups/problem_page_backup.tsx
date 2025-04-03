"use client";

import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Play, Maximize2, ChevronLeft, ChevronRight, Clock, BookOpen, Code2, CheckCircle2 } from 'lucide-react';
import Editor from '@monaco-editor/react';
import Image from 'next/image';

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

const problem = problems[0]; // For now, we'll use the first problem

const CodeEditor = ({ code, setCode }: { code: string; setCode: React.Dispatch<React.SetStateAction<string>> }) => {
  const handleEditorChange = (value: string | undefined) => {
    if (value) {
      setCode(value);
    }
  };

  return (
    <div className="code-editor-wrapper">
      <Editor
        height="100%"
        defaultLanguage="python"
        theme="vs-dark"
        value={code}
        onChange={handleEditorChange}
        options={{
          fontSize: 14,
          fontFamily: "'JetBrains Mono', monospace",
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          automaticLayout: true,
          lineNumbers: 'on',
          wordWrap: 'on',
          suggestOnTriggerCharacters: true,
          parameterHints: {
            enabled: true
          },
          bracketPairColorization: {
            enabled: true
          },
          guides: {
            bracketPairs: true
          },
          tabSize: 4,
          insertSpaces: true,
          formatOnPaste: true,
          formatOnType: true
        }}
      />
    </div>
  );
};

export default function ProblemPage() {
  const [activeTab, setActiveTab] = useState<'description' | 'test'>('description');
  const [isRunning, setIsRunning] = useState(false);
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [code, setCode] = useState(problems[0].initialCode);
  const [leftPanelWidth, setLeftPanelWidth] = useState(50); // Percentage
  const resizerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startWidthRef = useRef(0);
  const [testResults, setTestResults] = useState<Judge0Response[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showHiddenTests, setShowHiddenTests] = useState(false);

  useEffect(() => {
    const resizer = resizerRef.current;
    if (!resizer) return;

    const startDragging = (e: MouseEvent) => {
      isDraggingRef.current = true;
      startXRef.current = e.clientX;
      startWidthRef.current = leftPanelWidth;
      resizer.classList.add('dragging');
    };

    const stopDragging = () => {
      isDraggingRef.current = false;
      resizer.classList.remove('dragging');
    };

    const doDrag = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;

      const deltaX = e.clientX - startXRef.current;
      const containerWidth = window.innerWidth;
      const deltaPercent = (deltaX / containerWidth) * 100;
      const newWidth = Math.max(20, Math.min(80, startWidthRef.current + deltaPercent));
      
      setLeftPanelWidth(newWidth);
    };

    resizer.addEventListener('mousedown', startDragging);
    window.addEventListener('mousemove', doDrag);
    window.addEventListener('mouseup', stopDragging);

    return () => {
      resizer.removeEventListener('mousedown', startDragging);
      window.removeEventListener('mousemove', doDrag);
      window.removeEventListener('mouseup', stopDragging);
    };
  }, [leftPanelWidth]);

  const handleRunCode = async () => {
    setIsRunning(true);
    setTestResults([]);
    setActiveTab('test');
    setShowHiddenTests(false);

    try {
      const currentProblem = problems[currentProblemIndex];
      if (!currentProblem || !currentProblem.samples) {
        throw new Error('Invalid problem data');
      }

      console.log('Running code for problem:', currentProblem.id);
      console.log('Sample test cases:', currentProblem.samples);
      
      // Run code for each sample test case
      const results = await Promise.all(
        currentProblem.samples.map(async (sample, index) => {
          try {
            console.log(`Running test case ${index + 1}:`, sample);
            
            const response = await fetch('/api/run-code', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                code: code,
                input: sample.input,
                expected_output: sample.output,
                problemId: currentProblem.id
              })
            });

            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log(`Test case ${index + 1} result:`, result);
            
            return {
              ...result,
              expected_output: sample.output
            };
          } catch (error) {
            console.error(`Error running test case ${index + 1}:`, error);
            return {
              stdout: null,
              stderr: error instanceof Error ? error.message : 'Unknown error occurred',
              status: { id: 11, description: 'Runtime Error' },
              time: '0',
              memory: 0,
              expected_output: sample.output
            };
          }
        })
      );

      console.log('All test results:', results);
      setTestResults(results);
    } catch (error) {
      console.error('Error running code:', error);
      setTestResults([{
        stdout: null,
        stderr: error instanceof Error ? error.message : 'Error running code. Please try again.',
        status: { id: 11, description: 'Runtime Error' },
        time: '0',
        memory: 0
      }]);
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setTestResults([]);
    setActiveTab('test');
    setShowHiddenTests(true);

    try {
      const currentProblem = problems[currentProblemIndex];
      
      // Run both sample and hidden test cases
      const allTests = [...currentProblem.samples, ...currentProblem.hiddenTests];
      const results = await Promise.all(
        allTests.map(async (test, index) => {
          try {
            console.log('Running test case:', test);
            const response = await fetch('/api/run-code', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                code: code,
                input: test.input,
                expected_output: test.output,
                problemId: currentProblem.id
              })
            });

            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log('Test case result:', result);
            
            // If there's a syntax error, return it immediately
            if (result.status.id === 6) {
              return result;
            }
            
            return {
              ...result,
              expected_output: test.output,
              isHidden: index >= currentProblem.samples.length
            };
          } catch (error) {
            console.error('Error running test case:', error);
            return {
              stdout: null,
              stderr: error instanceof Error ? error.message : 'Unknown error occurred',
              status: { id: 11, description: 'Runtime Error' },
              time: '0',
              memory: 0,
              expected_output: test.output,
              isHidden: index >= currentProblem.samples.length
            };
          }
        })
      );

      // If any result has a syntax error, only show that one
      const syntaxError = results.find(result => result.status.id === 6);
      if (syntaxError) {
        setTestResults([syntaxError]);
      } else {
        // Show sample test cases in detail
        const sampleResults = results.filter(result => !result.isHidden);
        // Show hidden test cases in summary
        const hiddenResults = results.filter(result => result.isHidden);
        setTestResults([...sampleResults, ...hiddenResults]);
      }
    } catch (error) {
      console.error('Error submitting code:', error);
      setTestResults([{
        stdout: null,
        stderr: 'Error submitting code. Please try again.',
        status: { id: 11, description: 'Runtime Error' },
        time: '0',
        memory: 0
      }]);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrevProblem = () => {
    if (currentProblemIndex > 0) {
      setCurrentProblemIndex(currentProblemIndex - 1);
      setCode(problems[currentProblemIndex - 1].initialCode);
    }
  };

  const handleNextProblem = () => {
    if (currentProblemIndex < problems.length - 1) {
      setCurrentProblemIndex(currentProblemIndex + 1);
      setCode(problems[currentProblemIndex + 1].initialCode);
    }
  };

  const currentProblem = problems[currentProblemIndex];

  return (
    <main className="main-layout">
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
        <div className="ml-auto flex items-center space-x-2">
          <Clock className="w-4 h-4 text-green-400" />
          <span className="text-sm text-green-400 font-medium">00:07:32</span>
        </div>
      </div>

      <div className="split-view">
        {/* Left Panel */}
        <div 
          className="panel panel-left"
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
              <button className="nav-button">
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="panel-content">
            {activeTab === 'description' ? (
              <div className="space-y-6">
                <h1 className="text-xl font-semibold">{currentProblem.title}</h1>
                
                <div>
                  <h2 className="text-base font-medium mb-2">Problem Statement:</h2>
                  <p className="text-gray-300">{currentProblem.description}</p>
                </div>

                <div>
                  <h2 className="text-base font-medium mb-2">Input Format:</h2>
                  <p className="text-gray-300">{currentProblem.inputFormat}</p>
                </div>

                <div>
                  <h2 className="text-base font-medium mb-2">Output Format:</h2>
                  <p className="text-gray-300">{currentProblem.outputFormat}</p>
                </div>

                <div>
                  <h2 className="text-base font-medium mb-2">Constraints:</h2>
                  <ul className="explanation-list">
                    {currentProblem.constraints.map((constraint, index) => (
                      <li key={index}>{constraint}</li>
                    ))}
                  </ul>
                </div>

                {currentProblem.samples.map((sample, index) => (
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
                    const testCase = problems[currentProblemIndex].samples[index];
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
                  {testResults.filter(result => result.isHidden && result.status.id !== 6).length > 0 && (
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
                              .filter(result => result.isHidden && result.status.id !== 6)
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
          ref={resizerRef}
          className="resizer"
          style={{ left: `${leftPanelWidth}%` }}
        />

        {/* Right Panel */}
        <div 
          className="panel panel-right"
          style={{ width: `${100 - leftPanelWidth}%` }}
        >
          <div className="panel-header">
            <div className="flex items-center">
              <span className="text-sm font-medium mr-2">Code</span>
              <select className="code-input">
                <option>Python</option>
              </select>
            </div>
          </div>

          <div className="editor-container">
            <CodeEditor code={code} setCode={setCode} />
            
            {/* Question Navigation */}
            <div className="question-nav">
              {problems.map((_, index) => (
                <div 
                  key={index} 
                  className={`question-number ${index === currentProblemIndex ? 'active' : ''}`}
                  onClick={() => {
                    setCurrentProblemIndex(index);
                    setCode(problems[index].initialCode);
                  }}
                >
                  {index + 1}
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation Footer */}
          <div className="nav-footer">
            <div className="flex items-center space-x-2">
              <button 
                className="nav-button-large"
                onClick={handlePrevProblem}
                disabled={currentProblemIndex === 0}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Prev
              </button>
              <button 
                className="nav-button-large"
                onClick={handleNextProblem}
                disabled={currentProblemIndex === problems.length - 1}
              >
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </button>
            </div>
            <div className="action-buttons">
              <button
                onClick={handleRunCode}
                disabled={isRunning}
                className="run-button"
              >
                <Play className="w-4 h-4 mr-1" />
                {isRunning ? 'Running...' : 'Run'}
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="submit-button"
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 