"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ClockIcon,
  CheckCircledIcon,
  StarIcon,
  TimerIcon,
  PlayIcon,
  ChevronLeftIcon,
} from "@radix-ui/react-icons";
import Navbar from "@/app/components/Navbar";

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface Test {
  id: string;
  title: string;
  description: string;
  duration: number;
  passingScore: number;
  questions: Question[];
}

interface TestAttempt {
  id: string;
  score: number;
  status: string;
  createdAt: string;
}

export default function TestPage({ params }: { params: { courseId: string; testId: string } }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [test, setTest] = useState<Test | null>(null);
  const [attempts, setAttempts] = useState<TestAttempt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTestData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/courses/${params.courseId}/tests/${params.testId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch test data');
        }
        
        const data = await response.json();
        console.log('Received test data:', data);

        if (!data.test || !Array.isArray(data.test.questions)) {
          throw new Error('Invalid test data structure');
        }

        setTest(data.test);
        setAttempts(data.attempts || []);
      } catch (error) {
        console.error('Error fetching test:', error);
        setError(error instanceof Error ? error.message : 'Failed to fetch test data');
      } finally {
        setLoading(false);
      }
    };

    fetchTestData();
  }, [params.courseId, params.testId]);

  const handleStartTest = () => {
    if (!test || !test.questions || test.questions.length === 0) {
      setError('This test has no questions');
      return;
    }
    router.push(`/courses/${params.courseId}/tests/${params.testId}/attempt`);
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-purple-50 to-pink-50 pt-24">
          <div className="container mx-auto px-4 py-8">
            <Skeleton className="h-8 w-64 mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <Skeleton className="h-40 w-full mb-6" />
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} className="h-16 w-full" />
                  ))}
                </div>
              </div>
              <div>
                <Skeleton className="h-64 w-full" />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error || !test) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gradient-to-b from-indigo-50 via-purple-50 to-pink-50 pt-24">
          <h1 className="text-2xl font-bold text-red-600">Error</h1>
          <p className="text-gray-600 mb-4">{error || "Test not found"}</p>
          <Button onClick={() => router.back()} variant="default" size="lg">
            Go Back
          </Button>
        </div>
      </>
    );
  }

  const bestAttempt = attempts.reduce((best, current) => {
    if (!best || current.score > best.score) return current;
    return best;
  }, null as TestAttempt | null);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-purple-50 to-pink-50 pt-24">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{test.title}</h1>
              <p className="text-gray-600">{test.description}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="md:col-span-2">
              {/* Test Stats */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Test Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <ClockIcon className="h-5 w-5 text-indigo-600" />
                      <div>
                        <p className="text-sm text-gray-500">Duration</p>
                        <p className="font-medium">{test.duration} minutes</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircledIcon className="h-5 w-5 text-indigo-600" />
                      <div>
                        <p className="text-sm text-gray-500">Passing Score</p>
                        <p className="font-medium">{test.passingScore}%</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <StarIcon className="h-5 w-5 text-indigo-600" />
                      <div>
                        <p className="text-sm text-gray-500">Questions</p>
                        <p className="font-medium">{test.questions?.length || 0}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <TimerIcon className="h-5 w-5 text-indigo-600" />
                      <div>
                        <p className="text-sm text-gray-500">Best Score</p>
                        <p className="font-medium">{bestAttempt ? `${bestAttempt.score}%` : 'N/A'}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Previous Attempts */}
              {attempts.length > 0 && (
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle>Previous Attempts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {attempts.map((attempt) => (
                        <div key={attempt.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium">Score: {attempt.score}%</p>
                            <p className="text-sm text-gray-500">
                              {new Date(attempt.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <Badge variant={attempt.score >= test.passingScore ? "default" : "destructive"}>
                            {attempt.score >= test.passingScore ? "Passed" : "Failed"}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Start Test Button */}
              <Button
                size="lg"
                className="w-full"
                onClick={handleStartTest}
              >
                <PlayIcon className="h-5 w-5 mr-2" />
                Start Test
              </Button>
            </div>

            {/* Sidebar */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Test Guidelines</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Before you begin:</h3>
                    <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
                      <li>Ensure you have a stable internet connection</li>
                      <li>You have {test.duration} minutes to complete the test</li>
                      <li>You need to score at least {test.passingScore}% to pass</li>
                      <li>Answer all questions to complete the test</li>
                      <li>You can't pause or resume the test once started</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 