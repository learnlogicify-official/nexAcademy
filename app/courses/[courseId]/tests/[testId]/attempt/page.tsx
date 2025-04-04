'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Play,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Clock,
  BookOpen,
  Code2,
  CheckCircle2,
  Cog,
  XCircle,
  Terminal,
  Copy,
  CheckSquare,
  Cpu,
  AlertCircle,
  RotateCcw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import CodeEditor from '@/app/components/CodeEditor';

interface TestCase {
  input: string;
  output: string;
  explanation?: string;
}

interface Problem {
  id: string;
  title: string;
  description: string;
  inputFormat: string;
  outputFormat: string;
  constraints: string[];
  samples: TestCase[];
  hiddenTests?: TestCase[];
  initialCode: string;
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
    extension: '.py',
    monacoId: 'python',
    defaultCode: `def solve():
    # Read input
    N = int(input())
    arr = list(map(int, input().split()))
    
    # Calculate sum
    total = sum(arr)
    
    # Print result
    print(total)

# Call the solve function
solve()`
  },
  {
    id: 63,
    name: 'JavaScript',
    extension: '.js',
    monacoId: 'javascript',
    defaultCode: `function solve() {
    // Read input
    const N = parseInt(readline());
    const arr = readline().split(' ').map(Number);
    
    // Calculate sum
    const total = arr.reduce((sum, num) => sum + num, 0);
    
    // Print result
    console.log(total);
}

// Call the solve function
solve();`
  },
  {
    id: 54,
    name: 'C++',
    extension: '.cpp',
    monacoId: 'cpp',
    defaultCode: `#include <iostream>
#include <vector>
using namespace std;

void solve() {
    // Read input
    int N;
    cin >> N;
    vector<int> arr(N);
    for(int i = 0; i < N; i++) {
        cin >> arr[i];
    }
    
    // Calculate sum
    int total = 0;
    for(int num : arr) {
        total += num;
    }
    
    // Print result
    cout << total << endl;
}

int main() {
    solve();
    return 0;
}`
  },
  {
    id: 62,
    name: 'Java',
    extension: '.java',
    monacoId: 'java',
    defaultCode: `import java.util.Scanner;

public class Main {
    public static void solve() {
        Scanner scanner = new Scanner(System.in);
        
        // Read input
        int N = scanner.nextInt();
        int total = 0;
        for(int i = 0; i < N; i++) {
            total += scanner.nextInt();
        }
        
        // Print result
        System.out.println(total);
        
        scanner.close();
    }
    
    public static void main(String[] args) {
        solve();
    }
}`
  }
];

interface TestQuestion {
  id: string;
  question: string;
  type: 'MCQ' | 'PROGRAMMING';
  options?: string[];
  correctAnswer?: number;
  initialCode?: string;
  testCases?: TestCase[];
  hiddenTestCases?: TestCase[];
  explanation: string | null;
  problemId?: string;
}

interface Test {
  id: string;
  title: string;
  description: string | null;
  duration: number;
  passingScore: number;
  questions: TestQuestion[];
  problems: {
    id: string;
    title: string;
    description: string;
    inputFormat: string;
    outputFormat: string;
    constraints: string[];
    samples: TestCase | TestCase[];
    hiddenTestCases?: TestCase[];
    initialCode: string;
  }[];
}

interface TestAnswers {
  [key: string]: string | number;
}

interface CodeEditorProps {
  code: string;
  onChange: (value: string | undefined) => void;
  language: string;
}

type ContentType = 'questions' | 'problems';

function getLanguageId(monacoId: string): number {
  const languageMap: Record<string, number> = {
    'python': 71,
    'javascript': 63,
    'java': 62,
    'cpp': 54
  };
  return languageMap[monacoId] || 71; // Default to Python if not found
}

export default function TestAttemptPage({
  params,
}: {
  params: { courseId: string; testId: string };
}) {
  const router = useRouter();
  const [test, setTest] = useState<Test | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<TestAnswers>({});
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [code, setCode] = useState<string>('');
  const [currentTab, setCurrentTab] = useState<string>('description');
  const [leftPanelWidth, setLeftPanelWidth] = useState(45);
  const [isDragging, setIsDragging] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [contentType, setContentType] = useState<ContentType>('questions');
  const [selectedLanguage, setSelectedLanguage] = useState('python');
  const [fontSize, setFontSize] = useState(14);
  const [tabSize, setTabSize] = useState(4);
  const [theme, setTheme] = useState('vs-dark');
  const [showHiddenResults, setShowHiddenResults] = useState(false);

  useEffect(() => {
    const fetchTest = async () => {
      try {
        // Fetch test data
        const response = await fetch(`/api/courses/${params.courseId}/tests/${params.testId}`);
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Test fetch error:', errorText);
          throw new Error('Failed to fetch test');
        }
        const data = await response.json();
        console.log('Test data:', data); // Debug log

        if (!data.test || !Array.isArray(data.test.questions)) {
          throw new Error('Invalid test data structure');
        }

        // Set initial test data
        setTest(data.test);
        setTimeLeft(data.test.duration * 60);
        setStartTime(new Date());

        // Initialize answers
        const initialAnswers = data.test.questions.reduce((acc: TestAnswers, _: any, index: number) => {
          acc[`question_${index}`] = data.test.problems[index]?.initialCode || '';
          return acc;
        }, {} as TestAnswers);
        setAnswers(initialAnswers);

        // Fetch current problem details if available
        if (data.test.problems && data.test.problems[currentIndex]) {
          try {
            const problemId = data.test.problems[currentIndex].id;
            console.log('Fetching problem:', problemId); // Debug log
            
            const problemResponse = await fetch(`/api/courses/${params.courseId}/problems/${problemId}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            });

            if (!problemResponse.ok) {
              const errorText = await problemResponse.text();
              console.error('Problem fetch error:', errorText);
              
              // Use existing problem data as fallback
              console.log('Using fallback problem data');
              return;
            }

            const problemData = await problemResponse.json();
            console.log('Problem data:', problemData); // Debug log
            
            if (!problemData.problem) {
              console.error('Invalid problem data structure');
              return;
            }

            // Update the problem with fetched data
            setTest(prevTest => {
              if (!prevTest) return prevTest;
              const updatedProblems = [...prevTest.problems];
              updatedProblems[currentIndex] = {
                ...updatedProblems[currentIndex],
                ...problemData.problem,
                samples: problemData.problem.samples || [],
                hiddenTestCases: problemData.problem.hiddenTestCases || []
              };
              return {
                ...prevTest,
                problems: updatedProblems
              };
            });

            // Set initial code based on selected language or problem's initial code
            const initialCode = problemData.problem.initialCode?.[selectedLanguage] || 
              LANGUAGES.find(l => l.monacoId === selectedLanguage)?.defaultCode;
            
            if (initialCode) {
              setCode(initialCode);
            }
          } catch (problemError) {
            console.error('Error fetching problem details:', problemError);
            // Continue with existing problem data
            console.log('Continuing with existing problem data');
          }
        }
      } catch (err) {
        console.error('Error in fetchTest:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch test');
      } finally {
        setLoading(false);
      }
    };

    fetchTest();
  }, [params.courseId, params.testId, currentIndex, selectedLanguage]);

  // Remove the hardcoded test cases effect
  useEffect(() => {
    if (test && test.problems && test.problems[currentIndex] && !test.problems[currentIndex].samples) {
      // If no samples are available, fetch them
      const fetchProblemDetails = async () => {
        try {
          const response = await fetch(`/api/courses/${params.courseId}/problems/${test.problems[currentIndex].id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch problem details');
          }
          const data = await response.json();
          
          // Update the test state with the fetched problem details
          setTest(prev => {
            if (!prev) return prev;
            const updatedProblems = [...prev.problems];
            updatedProblems[currentIndex] = {
              ...updatedProblems[currentIndex],
              ...data.problem,
              title: data.problem.title,
              description: data.problem.description,
              inputFormat: data.problem.inputFormat,
              outputFormat: data.problem.outputFormat,
              constraints: data.problem.constraints,
              samples: data.problem.samples || [],
              hiddenTestCases: data.problem.hiddenTestCases || []
            };
            return {
              ...prev,
              problems: updatedProblems
            };
          });
        } catch (error) {
          console.error('Error fetching problem details:', error);
          setError('Failed to load problem details. Please try again.');
        }
      };

      fetchProblemDetails();
    }
  }, [currentIndex, params.courseId, test]);

  useEffect(() => {
    if (!startTime) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime]);

  useEffect(() => {
    if (test && test.questions[currentQuestionIndex]?.type === 'PROGRAMMING') {
      setCode(test.questions[currentQuestionIndex].initialCode || '');
    }
  }, [currentQuestionIndex, test]);

  useEffect(() => {
    if (test && test.problems && test.problems[currentIndex]) {
      // Set initial code based on selected language
      const lang = LANGUAGES.find(l => l.monacoId === selectedLanguage);
      if (lang) {
        setCode(lang.defaultCode);
      }
    }
  }, [selectedLanguage, currentIndex, test]);

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [`question_${questionIndex}`]: answerIndex
    }));
  };

  const handleCodeChange = (value: string | undefined) => {
    if (!value) return;
    setAnswers(prev => ({
      ...prev,
      [`question_${currentQuestionIndex}`]: value
    }));
    setCode(value);
  };

  const handleSubmit = async () => {
    if (!test) return;

    try {
      const score = test.questions.reduce((acc: number, question, index) => {
        const answer = answers[`question_${index}`];
        if (question.type === 'MCQ') {
          return acc + (answer === question.correctAnswer ? 1 : 0);
        }
        // For programming questions, we'll need to implement test case validation
        // For now, give partial credit if they submitted any code
        return acc + (typeof answer === 'string' && answer.trim() ? 0.5 : 0);
      }, 0) * (100 / test.questions.length);

      const response = await fetch(`/api/courses/${params.courseId}/tests/${params.testId}/attempt`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          answers: Object.entries(answers).map(([key, value]) => ({
            questionId: key.replace('question_', ''),
            answer: value
          })),
          score,
          status: 'COMPLETED',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit test');
      }

      const data = await response.json();
      console.log('Test submission successful:', data);

      router.push(`/courses/${params.courseId}/tests/${params.testId}`);
    } catch (err) {
      console.error('Error submitting test:', err);
      setError(err instanceof Error ? err.message : 'Failed to submit test');
      // Show error to user
      alert(err instanceof Error ? err.message : 'Failed to submit test. Please try again.');
    }
  };

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

  const handleRunCode = async () => {
    if (!test || !test.problems[currentIndex]) return;
    
    setIsRunning(true);
    setTestResults([]);
    setCurrentTab('test');

    try {
      const problem = test.problems[currentIndex];
      const sampleTestCases = Array.isArray(problem.samples) 
        ? problem.samples 
        : [problem.samples];
      
      const results = await Promise.all(
        sampleTestCases.map(async (testCase) => {
          const response = await fetch('/api/run-code', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              code,
              input: testCase.input,
              expected_output: testCase.output,
              languageId: getLanguageId(selectedLanguage)
            })
          });
          return response.json();
        })
      );
      
      setTestResults(results);
    } catch (error) {
      console.error('Error running code:', error);
    } finally {
      setIsRunning(false);
    }
  };

  const handlePrevious = () => {
    if (contentType === 'questions') {
      if (currentQuestionIndex > 0) {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
      } else if (test?.problems?.length) {
        setContentType('problems');
        setCurrentIndex(test.problems.length - 1);
      }
    } else if (currentIndex > 0 && test?.problems?.length) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (contentType === 'questions') {
      if (currentQuestionIndex < (test?.questions?.length || 0) - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else if (test?.problems?.length) {
        setContentType('problems');
        setCurrentIndex(0);
      }
    } else if (currentIndex < (test?.problems?.length || 0) - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!test) {
    return <div>No test data available</div>;
  }

  if (!test?.questions?.length && !test?.problems?.length) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">No questions or problems found in this test.</p>
      </div>
    );
  }

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

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
            <span className="text-sm font-medium">Problem Solving</span>
          </div>
          <div className="flex items-center space-x-2">
            <Code2 className="w-4 h-4 text-gray-400" />
            <span className="text-sm">Programming</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-gray-400" />
            <span className="text-sm">Level 1</span>
          </div>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <button 
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${
                currentIndex === 0 
                  ? 'opacity-50 cursor-not-allowed bg-gray-800 text-gray-400' 
                  : 'bg-gray-800 hover:bg-gray-700 text-white'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Previous</span>
            </button>
            <button 
              onClick={handleNext}
              disabled={currentIndex === (test?.problems?.length || 0) - 1}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${
                currentIndex === (test?.problems?.length || 0) - 1
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
            <span className="text-sm text-green-400 font-medium">{minutes}:{seconds.toString().padStart(2, '0')}</span>
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
              className={`tab-button ${currentTab === 'description' ? 'active' : ''}`}
              onClick={() => setCurrentTab('description')}
            >
              Description
            </button>
            <button 
              className={`tab-button ${currentTab === 'test' ? 'active' : ''}`}
              onClick={() => setCurrentTab('test')}
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
            {currentTab === 'description' ? (
              <div className="p-8 max-w-4xl mx-auto space-y-8">
                {/* Problem Title */}
                <div>
                  <h1 className="text-2xl font-semibold text-white">
                    {test.problems[currentIndex]?.title || 'Problem'}
                  </h1>
                </div>

                {/* Problem Statement */}
                <div className="space-y-2">
                  <h2 className="text-lg font-medium text-gray-200">Problem Statement</h2>
                  <p className="text-gray-300 leading-relaxed">
                    {test.problems[currentIndex]?.description || 'No description available'}
                  </p>
                </div>

                {/* Input Format */}
                <div className="space-y-2">
                  <h2 className="text-lg font-medium text-gray-200">Input Format</h2>
                  <p className="text-gray-300 leading-relaxed">
                    {test.problems[currentIndex]?.inputFormat || 'No input format available'}
                  </p>
                </div>

                {/* Output Format */}
                <div className="space-y-2">
                  <h2 className="text-lg font-medium text-gray-200">Output Format</h2>
                  <p className="text-gray-300 leading-relaxed">
                    {test.problems[currentIndex]?.outputFormat || 'No output format available'}
                  </p>
                </div>

                {/* Constraints */}
                <div className="space-y-2">
                  <h2 className="text-lg font-medium text-gray-200">Constraints</h2>
                  <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
                    {test.problems[currentIndex]?.constraints?.map((constraint, index) => (
                      <li key={index} className="leading-relaxed">{constraint}</li>
                    )) || <li>No constraints available</li>}
                  </ul>
                </div>

                {/* Sample Test Cases */}
                <div className="space-y-4">
                  <h2 className="text-lg font-medium text-gray-200">Sample Test Cases</h2>
                  <div className="space-y-6">
                    {Array.isArray(test.problems[currentIndex]?.samples) ? 
                      test.problems[currentIndex].samples.map((sample, index) => (
                        <div key={index} className="bg-gray-800/50 rounded-lg p-4 space-y-4">
                          <div>
                            <h3 className="text-sm font-medium text-gray-300 mb-2">Sample Input {index + 1}</h3>
                            <pre className="bg-gray-900/50 p-3 rounded-lg text-gray-300 text-sm font-mono">{sample.input}</pre>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-300 mb-2">Sample Output {index + 1}</h3>
                            <pre className="bg-gray-900/50 p-3 rounded-lg text-gray-300 text-sm font-mono">{sample.output}</pre>
                          </div>
                          {sample.explanation && (
                            <div>
                              <h3 className="text-sm font-medium text-gray-300 mb-2">Explanation</h3>
                              <p className="text-gray-400 text-sm bg-gray-900/30 p-3 rounded-lg">{sample.explanation}</p>
                            </div>
                          )}
                        </div>
                      )) : (
                        <div className="text-gray-400">No sample test cases available</div>
                      )
                    }
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4 p-6">
                <h2 className="text-lg font-medium">Test Results</h2>
                
                {/* Show detailed view for Run Sample Cases */}
                {!showHiddenResults && test?.problems[currentIndex]?.samples && (
                  <div className="space-y-6">
                    {/* Test Results Section */}
                    {testResults.length > 0 && (
                      <div className="space-y-4">
                        {testResults.map((result, index) => {
                          // If there's a runtime error, only show the error message in a red box
                          if (result.status.id === 11) {
                            return (
                              <div key={index} className="bg-red-500/5 border border-red-500/20 rounded-lg p-4 overflow-hidden">
                                <pre className="text-sm whitespace-pre-wrap text-red-400 break-words">
                                  {result.stderr || 'Runtime Error'}
                                </pre>
                              </div>
                            );
                          }

                          const currentSample = Array.isArray(test?.problems[currentIndex]?.samples) 
                            ? test.problems[currentIndex].samples[index]
                            : test?.problems[currentIndex]?.samples;

                          return (
                            <div key={index} className="bg-gray-800/50 rounded-lg p-4 space-y-4">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                    result.status.id === 3
                                      ? 'bg-green-500/10 text-green-400'
                                      : result.status.id === 4
                                      ? 'bg-red-500/10 text-red-400'
                                      : 'bg-yellow-500/10 text-yellow-400'
                                  }`}>
                                    {result.status.id === 3 ? (
                                      <CheckCircle2 className="w-4 h-4" />
                                    ) : result.status.id === 4 ? (
                                      <XCircle className="w-4 h-4" />
                                    ) : (
                                      <AlertCircle className="w-4 h-4" />
                                    )}
                                  </div>
                                  <div>
                                    <h4 className="text-sm font-medium">Test Case {index + 1}</h4>
                                    <span className={`text-xs font-medium ${
                                      result.status.id === 3
                                        ? 'text-green-400'
                                        : result.status.id === 4
                                        ? 'text-red-400'
                                        : 'text-yellow-400'
                                    }`}>
                                      {result.status.description}
                                    </span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-4">
                                  <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-gray-400" />
                                    <span className="text-sm text-gray-400">{result.time}s</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Cpu className="w-4 h-4 text-gray-400" />
                                    <span className="text-sm text-gray-400">
                                      {result.memory ? `${Math.round(result.memory / 1024)} KB` : '0 KB'}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Only show input/output if not a runtime error */}
                              {currentSample && (
                                <div className="space-y-4">
                                  <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                      <h5 className="text-sm font-medium text-gray-300">Input:</h5>
                                      <button 
                                        onClick={() => navigator.clipboard.writeText(currentSample.input)}
                                        className="p-1.5 rounded-md bg-gray-700/50 hover:bg-gray-700 transition-colors"
                                      >
                                        <Copy className="w-4 h-4 text-gray-400" />
                                      </button>
                                    </div>
                                    <pre className="text-sm p-3 rounded overflow-x-auto whitespace-pre-wrap border border-gray-700/50 bg-gray-900/50 w-full">
                                      {currentSample.input}
                                    </pre>
                                  </div>

                                  <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                      <h5 className="text-sm font-medium text-gray-300">Expected Output:</h5>
                                      <button 
                                        onClick={() => navigator.clipboard.writeText(currentSample.output)}
                                        className="p-1.5 rounded-md bg-gray-700/50 hover:bg-gray-700 transition-colors"
                                      >
                                        <Copy className="w-4 h-4 text-gray-400" />
                                      </button>
                                    </div>
                                    <pre className="text-sm p-3 rounded overflow-x-auto whitespace-pre-wrap border border-gray-700/50 bg-gray-900/50 w-full">
                                      {currentSample.output}
                                    </pre>
                                  </div>

                                  <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                      <h5 className="text-sm font-medium text-gray-300">Your Output:</h5>
                                      <button 
                                        onClick={() => navigator.clipboard.writeText(result.stdout || '')}
                                        className="p-1.5 rounded-md bg-gray-700/50 hover:bg-gray-700 transition-colors"
                                      >
                                        <Copy className="w-4 h-4 text-gray-400" />
                                      </button>
                                    </div>
                                    <pre className={`text-sm p-3 rounded overflow-x-auto whitespace-pre-wrap border w-full ${
                                      result.status.id === 3
                                        ? 'bg-green-500/5 border-green-500/20'
                                        : result.status.id === 4
                                        ? 'bg-red-500/5 border-red-500/20'
                                        : 'bg-gray-900/50 border-gray-700/50'
                                    }`}>
                                      {result.stdout || 'No output'}
                                    </pre>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                    
                    {testResults.length === 0 && (
                      <div className="text-center text-gray-400 py-8">
                        No test results yet. Run your code to see the results.
                      </div>
                    )}
                  </div>
                )}

                {/* Show summary table for Submit All Cases */}
                {showHiddenResults && (
                  <div className="overflow-x-auto rounded-lg border border-gray-800">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-800/50">
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-300">Test Case</th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-300">Status</th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-300">Time</th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-300">Memory</th>
                        </tr>
                      </thead>
                      <tbody>
                        {testResults.map((result, index) => (
                          <tr key={index} className="border-t border-gray-800 hover:bg-gray-800/30">
                            <td className="px-4 py-2 text-sm text-gray-300">
                              {result.isHidden ? `Hidden Test Case ${index - 1}` : `Sample Test Case ${index + 1}`}
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
                            <td className="px-4 py-2 text-sm text-gray-400">{result.time}s</td>
                            <td className="px-4 py-2 text-sm text-gray-400">
                              {result.memory ? `${Math.round(result.memory / 1024)} KB` : '0 KB'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
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
          style={{ width: `${100 - leftPanelWidth}%` }}
        >
          <div className="panel-header flex-none">
            <div className="table w-full">
              <div className="table-row">
                <div className="table-cell align-middle p-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-200">Language</span>
                    <Select 
                      value={selectedLanguage}
                      onValueChange={(value) => {
                        setSelectedLanguage(value);
                        const lang = LANGUAGES.find(l => l.monacoId === value);
                        if (lang) {
                          setCode(lang.defaultCode);
                        }
                      }}
                    >
                      <SelectTrigger className="w-[140px] bg-gray-800/50 border-gray-700 text-gray-200 hover:bg-gray-800 focus:ring-1 focus:ring-gray-700 focus:ring-offset-0">
                        <SelectValue placeholder="Select Language" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        {LANGUAGES.map(lang => (
                          <SelectItem 
                            key={lang.id} 
                            value={lang.monacoId}
                            className="text-gray-200 focus:bg-gray-700 focus:text-white hover:bg-gray-700/50"
                          >
                            {lang.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="table-cell align-middle p-2 text-right">
                  <div className="flex items-center gap-2 justify-end">
                    {/* Reset Code Button */}
                    <button
                      onClick={() => {
                        const lang = LANGUAGES.find(l => l.monacoId === selectedLanguage);
                        if (lang) {
                          setCode(lang.defaultCode);
                        }
                      }}
                      className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-colors"
                      title="Reset Code"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>

                    {/* Settings Button */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="w-9 h-9 p-0 hover:bg-gray-800/50"
                        >
                          <Cog className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56 bg-gray-800 border-gray-700">
                        <DropdownMenuLabel className="text-gray-200">Editor Settings</DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-gray-700" />
                        <div className="p-2">
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label className="text-xs text-gray-400">Theme</Label>
                              <Select 
                                value={theme}
                                onValueChange={setTheme}
                              >
                                <SelectTrigger className="w-full bg-gray-900/50 border-gray-700 text-gray-200">
                                  <SelectValue placeholder="Select theme" />
                                </SelectTrigger>
                                <SelectContent className="bg-gray-800 border-gray-700">
                                  <SelectItem value="vs-dark">Dark</SelectItem>
                                  <SelectItem value="light">Light</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label className="text-xs text-gray-400">Font Size</Label>
                              <Select 
                                value={fontSize.toString()}
                                onValueChange={(value) => setFontSize(parseInt(value))}
                              >
                                <SelectTrigger className="w-full bg-gray-900/50 border-gray-700 text-gray-200">
                                  <SelectValue placeholder="Select size" />
                                </SelectTrigger>
                                <SelectContent className="bg-gray-800 border-gray-700">
                                  {[12, 14, 16, 18, 20].map(size => (
                                    <SelectItem key={size} value={size.toString()}>
                                      {size}px
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label className="text-xs text-gray-400">Tab Size</Label>
                              <Select 
                                value={tabSize.toString()}
                                onValueChange={(value) => setTabSize(parseInt(value))}
                              >
                                <SelectTrigger className="w-full bg-gray-900/50 border-gray-700 text-gray-200">
                                  <SelectValue placeholder="Select size" />
                                </SelectTrigger>
                                <SelectContent className="bg-gray-800 border-gray-700">
                                  {[2, 4, 8].map(size => (
                                    <SelectItem key={size} value={size.toString()}>
                                      {size} spaces
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="editor-container flex-1">
            <div className="h-full [&_.monaco-editor-background]:!bg-transparent [&_.monaco-editor]:outline-none [&_.monaco-editor]:!border-0 [&_.monaco-editor]:focus:!border-0 [&_.monaco-editor]:focus:!outline-none">
              <CodeEditor 
                code={code} 
                setCode={(value) => {
                  if (!value) return;
                  setCode(value);
                }}
                language={selectedLanguage}
                theme={theme}
                fontSize={fontSize}
                tabSize={tabSize}
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 p-4 border-t border-gray-800 flex-none">
            <Button
              variant="outline"
              onClick={async () => {
                if (!test || !test.problems[currentIndex]) return;
                
                setIsRunning(true);
                setTestResults([]);
                setCurrentTab('test');
                setShowHiddenResults(false);

                try {
                  const problem = test.problems[currentIndex];
                  const sampleTestCases = Array.isArray(problem.samples) 
                    ? problem.samples 
                    : [problem.samples];
                  
                  const results = await Promise.all(
                    sampleTestCases.map(async (testCase) => {
                      const response = await fetch('/api/run-code', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          code,
                          input: testCase.input,
                          expected_output: testCase.output,
                          languageId: getLanguageId(selectedLanguage)
                        })
                      });
                      return response.json();
                    })
                  );
                  
                  setTestResults(results);
                } catch (error) {
                  console.error('Error running code:', error);
                } finally {
                  setIsRunning(false);
                }
              }}
              disabled={isRunning}
              className={`flex items-center gap-2 bg-blue-600/20 text-blue-400 border-blue-500/30 hover:bg-blue-600/30 hover:text-blue-300 transition-all ${
                isRunning ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <Play className="w-4 h-4" />
              {isRunning ? 'Running...' : 'Run Sample Cases'}
            </Button>
            <Button
              variant="default"
              onClick={async () => {
                if (!test || !test.problems[currentIndex]) return;
                
                setIsRunning(true);
                setTestResults([]);
                setCurrentTab('test');
                setShowHiddenResults(true);

                try {
                  const problem = test.problems[currentIndex];
                  
                  // Get sample test cases
                  const sampleTestCases = Array.isArray(problem.samples) 
                    ? problem.samples 
                    : [problem.samples];
                  
                  // Get hidden test cases
                  const hiddenTestCases = problem.hiddenTestCases || [];
                  
                  // Combine all test cases
                  const allTestCases = [...sampleTestCases, ...hiddenTestCases];
                  
                  const results = await Promise.all(
                    allTestCases.map(async (testCase, index) => {
                      const response = await fetch('/api/run-code', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          code,
                          input: testCase.input,
                          expected_output: testCase.output,
                          languageId: getLanguageId(selectedLanguage)
                        })
                      });
                      
                      if (!response.ok) {
                        throw new Error('Failed to run code');
                      }
                      
                      const result = await response.json();
                      return {
                        ...result,
                        isHidden: index >= sampleTestCases.length
                      };
                    })
                  );
                  
                  setTestResults(results);
                  
                  // Check if all test cases passed
                  const allPassed = results.every(r => r.status.id === 3);
                  if (allPassed) {
                    // Update the answer in the state
                    const newAnswers = { ...answers };
                    const problemKey = `problem_${problem.id}`;
                    newAnswers[problemKey] = code;
                    setAnswers(newAnswers);
                  }
                } catch (error) {
                  console.error('Error submitting code:', error);
                } finally {
                  setIsRunning(false);
                }
              }}
              disabled={isRunning}
              className={`flex items-center gap-2 bg-green-600 text-white hover:bg-green-500 transition-all ${
                isRunning ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isRunning ? 'Submitting...' : 'Submit All Cases'}
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
} 