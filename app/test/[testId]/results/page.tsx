"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { FaTrophy, FaClock, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

interface TestAttempt {
  id: string;
  score: number;
  createdAt: string;
  answers: number[];
}

export default function TestResultsPage({ params }: { params: { testId: string } }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [testAttempt, setTestAttempt] = useState<TestAttempt | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestAttempt = async () => {
      try {
        const response = await fetch(`/api/test-attempts?testId=${params.testId}`);
        if (!response.ok) throw new Error("Failed to fetch test attempt");
        const data = await response.json();
        setTestAttempt(data[0]); // Get the most recent attempt
      } catch (error) {
        console.error("Error fetching test attempt:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestAttempt();
  }, [params.testId]);

  const score = searchParams.get("score") ? parseFloat(searchParams.get("score")!) : 0;
  const isPassing = score >= 70; // Assuming passing score is 70%

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <Card className="mb-8">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              {isPassing ? (
                <FaTrophy className="h-16 w-16 text-yellow-500" />
              ) : (
                <FaTimesCircle className="h-16 w-16 text-red-500" />
              )}
            </div>
            <CardTitle className="text-3xl">
              {isPassing ? "Congratulations!" : "Keep Practicing!"}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className="space-y-2">
              <div className="text-4xl font-bold">{score.toFixed(1)}%</div>
              <div className="text-gray-500">Your Score</div>
            </div>

            <div className="flex justify-center">
              <Progress value={score} className="w-64 h-2" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <FaClock className="h-5 w-5 text-gray-500" />
                  <span className="text-gray-500">Time Taken</span>
                </div>
                <div className="text-xl font-semibold">
                  {testAttempt ? new Date(testAttempt.createdAt).toLocaleTimeString() : "N/A"}
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <FaCheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-500">Status</span>
                </div>
                <div className="text-xl font-semibold">
                  {isPassing ? "Passed" : "Failed"}
                </div>
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              <Button
                variant="outline"
                onClick={() => router.push(`/course/${params.testId.split("-")[0]}`)}
              >
                Back to Course
              </Button>
              <Button
                onClick={() => router.push(`/test/${params.testId}`)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 