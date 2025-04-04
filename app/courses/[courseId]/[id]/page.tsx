"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Course } from "@/app/types/course";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  PersonIcon,
  ClockIcon,
  StarIcon,
  CheckCircledIcon,
} from "@radix-ui/react-icons";
import Navbar from "@/app/components/Navbar";

interface Submodule {
  id: string;
  title: string;
  type: string;
  questions: number;
}

interface Module {
  id: string;
  title: string;
  description: string;
  type: string;
  order: number;
  isLocked: boolean;
  submodules: Submodule[];
}

export default function CourseShowPage({ params }: { params: { courseId: string } }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState<Course | null>(null);
  const [modules, setModules] = useState<Module[]>([]);
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
      return;
    }

    const fetchCourseData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch course details
        const response = await fetch(`/api/courses/${params.courseId}`, {
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error("Failed to fetch course details");
        }

        const data = await response.json();
        setCourse(data.course);
        setModules(data.modules);
      } catch (error) {
        console.error("Error fetching course:", error);
        setError(error instanceof Error ? error.message : "Failed to fetch course");
      } finally {
        setLoading(false);
      }
    };

    if (status === "authenticated") {
      fetchCourseData();
    }
  }, [status, params.courseId, router]);

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev => {
      const next = new Set(prev);
      if (next.has(moduleId)) {
        next.delete(moduleId);
      } else {
        next.add(moduleId);
      }
      return next;
    });
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50">
          <div className="container mx-auto px-4 py-8">
            <Skeleton className="h-8 w-64 mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <Skeleton className="h-40 w-full mb-6" />
                <div className="space-y-4">
                  {[...Array(4)].map((_, i) => (
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

  if (error || !course) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex flex-col items-center justify-center gap-4">
          <h1 className="text-2xl font-bold text-red-600">Error</h1>
          <p className="text-gray-600 mb-4">{error || "Course not found"}</p>
          <Button onClick={() => router.back()} variant="default" size="lg">
            Go Back
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          {/* Course Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            <div>
              <Badge variant="secondary" className="mb-2">{course.category}</Badge>
              <h1 className="text-2xl font-bold text-gray-900">{course.title}</h1>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="md:col-span-2">
              {/* Course Stats */}
              <Card className="mb-8">
                <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Progress</p>
                    <p className="text-2xl font-bold">{course.progress}%</p>
                    <Progress value={course.progress} className="mt-2" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <div className="flex items-center gap-2">
                      <ClockIcon className="h-4 w-4 text-muted-foreground" />
                      <p className="text-2xl font-bold">{course.duration}h</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Students</p>
                    <div className="flex items-center gap-2">
                      <PersonIcon className="h-4 w-4 text-muted-foreground" />
                      <p className="text-2xl font-bold">{course.students}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Rating</p>
                    <div className="flex items-center gap-2">
                      <StarIcon className="h-4 w-4 text-yellow-500" />
                      <p className="text-2xl font-bold">{course.rating}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Course Modules */}
              <div className="space-y-4">
                {modules.map((module) => (
                  <Card key={module.id} className="overflow-hidden">
                    <button
                      className="w-full text-left p-4 flex items-center justify-between hover:bg-gray-50"
                      onClick={() => toggleModule(module.id)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0">
                          {module.isLocked ? (
                            <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center">
                              <span className="text-gray-500">🔒</span>
                            </div>
                          ) : (
                            <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                              <span className="text-blue-600">{module.order}</span>
                            </div>
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium">{module.title}</h3>
                          <p className="text-sm text-muted-foreground">{module.description}</p>
                        </div>
                      </div>
                      <ChevronDownIcon
                        className={`h-5 w-5 text-gray-500 transition-transform ${
                          expandedModules.has(module.id) ? "transform rotate-180" : ""
                        }`}
                      />
                    </button>
                    {expandedModules.has(module.id) && module.submodules && (
                      <div className="border-t">
                        {module.submodules.map((submodule) => (
                          <button
                            key={submodule.id}
                            className="w-full text-left p-4 hover:bg-gray-50 flex items-center justify-between"
                            onClick={() => router.push(`/courses/${course.id}/modules/${module.id}/${submodule.id}`)}
                          >
                            <div className="flex items-center gap-3 pl-9">
                              <div>
                                <h4 className="font-medium">{submodule.title}</h4>
                                <p className="text-sm text-muted-foreground">
                                  {submodule.questions} Programming Questions
                                </p>
                              </div>
                            </div>
                            <ChevronRightIcon className="h-5 w-5 text-gray-500" />
                          </button>
                        ))}
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={course.instructor.image || ''} />
                      <AvatarFallback>{course.instructor.name?.[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{course.instructor.name}</p>
                      <p className="text-sm text-muted-foreground">Instructor</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Course Level</p>
                      <p className="font-medium">{course.level}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Start Date</p>
                      <p className="font-medium">
                        {new Date(course.startDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">End Date</p>
                      <p className="font-medium">
                        {new Date(course.endDate).toLocaleDateString()}
                      </p>
                    </div>
                    {course.deadline && (
                      <div>
                        <p className="text-sm text-muted-foreground">Deadline</p>
                        <p className="font-medium">
                          {new Date(course.deadline).toLocaleDateString()}
                        </p>
                      </div>
                    )}
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