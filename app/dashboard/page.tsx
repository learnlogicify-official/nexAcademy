"use client";

import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Navbar from "../components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BookmarkIcon, 
  CodeIcon, 
  StarIcon, 
  ClockIcon,
  ArrowRightIcon,
  CheckCircledIcon
} from "@radix-ui/react-icons";

export default function Dashboard() {
  const { data: session } = useSession();

  // Mock data - replace with actual data from your backend
  const stats = {
    problemsSolved: 42,
    totalProblems: 100,
    coursesEnrolled: 3,
    streakDays: 7,
    recentActivity: [
      { id: 1, type: "problem", title: "Two Sum", status: "completed", time: "2h ago" },
      { id: 2, type: "course", title: "Data Structures", status: "in-progress", time: "1d ago" },
      { id: 3, type: "problem", title: "Reverse Linked List", status: "completed", time: "2d ago" },
    ],
    recommendedProblems: [
      { id: 1, title: "Binary Search", difficulty: "Easy", tags: ["Array", "Binary Search"] },
      { id: 2, title: "Merge Two Sorted Lists", difficulty: "Easy", tags: ["Linked List"] },
      { id: 3, title: "Valid Parentheses", difficulty: "Easy", tags: ["Stack", "String"] },
    ]
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {session?.user?.name}!
          </h1>
          <p className="text-gray-600 mt-2">
            Continue your learning journey today
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card className="border-0 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Problems Solved
              </CardTitle>
              <CodeIcon className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stats.problemsSolved}</div>
              <p className="text-xs text-gray-500">
                out of {stats.totalProblems} total problems
              </p>
              <Progress value={(stats.problemsSolved / stats.totalProblems) * 100} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Courses Enrolled
              </CardTitle>
              <BookmarkIcon className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stats.coursesEnrolled}</div>
              <p className="text-xs text-gray-500">
                active courses
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Current Streak
              </CardTitle>
              <StarIcon className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stats.streakDays} days</div>
              <p className="text-xs text-gray-500">
                keep it up!
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Time Spent
              </CardTitle>
              <ClockIcon className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">24h</div>
              <p className="text-xs text-gray-500">
                this week
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Recent Activity */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats.recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {activity.type === "problem" ? (
                        <CodeIcon className="h-5 w-5 text-gray-500" />
                      ) : (
                        <BookmarkIcon className="h-5 w-5 text-gray-500" />
                      )}
                      <div>
                        <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                    <Badge variant={activity.status === "completed" ? "default" : "secondary"}>
                      {activity.status === "completed" ? "Completed" : "In Progress"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recommended Problems */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">
                Recommended Problems
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats.recommendedProblems.map((problem) => (
                  <div key={problem.id} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{problem.title}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {problem.difficulty}
                        </Badge>
                        {problem.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button asChild variant="ghost" size="sm">
                      <Link href={`/problems/${problem.id}`}>
                        Try <ArrowRightIcon className="ml-1 h-3 w-3" />
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <Button asChild variant="outline" className="h-auto py-4">
              <Link href="/problems" className="flex flex-col items-center">
                <CodeIcon className="h-6 w-6 mb-2" />
                <span>Practice Problems</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-auto py-4">
              <Link href="/courses" className="flex flex-col items-center">
                <BookmarkIcon className="h-6 w-6 mb-2" />
                <span>Browse Courses</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-auto py-4">
              <Link href="/profile" className="flex flex-col items-center">
                <StarIcon className="h-6 w-6 mb-2" />
                <span>View Profile</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
} 