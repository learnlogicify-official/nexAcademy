"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Course } from "@/app/types/course";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  PersonIcon,
  ClockIcon,
  StarIcon,
  CheckCircledIcon,
  LockClosedIcon,
  PlayIcon,
  ClipboardIcon,
} from "@radix-ui/react-icons";
import Navbar from "@/app/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface Submodule {
  id: string;
  title: string;
  description: string | null;
  order: number;
  moduleId: string;
  createdAt: string;
  updatedAt: string;
}

interface Module {
  id: string;
  title: string;
  description: string;
  type: string;
  order: number;
  isLocked: boolean;
  submodules: Submodule[];
  tests: {
    id: string;
    title: string;
    description: string | null;
    duration: number;
    passingScore: number;
    createdAt: string;
    updatedAt: string;
  }[];
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
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch course details");
        }

        const data = await response.json();
        
        // Add debug logging
        console.log('Raw course data:', data);

        // Validate the data structure
        if (!data || !data.course || !Array.isArray(data.modules)) {
          throw new Error("Invalid course data structure");
        }

        // Process modules to ensure tests and submodules arrays exist
        const processedModules = data.modules.map((module: Module) => ({
          ...module,
          tests: Array.isArray(module.tests) ? module.tests : [],
          submodules: Array.isArray(module.submodules) ? module.submodules : [],
        }));

        // Add debug logging for processed data
        console.log('Processed course data:', {
          courseId: params.courseId,
          courseTitle: data.course.title,
          modulesCount: processedModules.length,
          modules: processedModules.map((module: Module) => ({
            id: module.id,
            title: module.title,
            submodulesCount: module.submodules.length,
            testsCount: module.tests.length,
          }))
        });

        setCourse(data.course);
        setModules(processedModules);
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

  // Add debug logging for modules
  useEffect(() => {
    console.log('Current modules state:', JSON.stringify(modules, null, 2));
  }, [modules]);

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
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4 py-8">
            <Skeleton className="h-8 w-64 mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <Skeleton className="h-40 w-full mb-6 rounded-lg" />
                <div className="space-y-4">
                  {[...Array(4)].map((_, i) => (
                    <Skeleton key={i} className="h-16 w-full rounded-lg" />
                  ))}
                </div>
              </div>
              <div>
                <Skeleton className="h-64 w-full rounded-lg" />
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
        <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gradient-to-b from-gray-50 to-white">
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
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-purple-50 to-pink-50">
        {/* Hero Section */}
        <div className="relative h-64 bg-gradient-to-r from-indigo-600 to-purple-600">
          <div className="absolute inset-0 bg-black/20" />
          <div className="container mx-auto px-4 h-full flex items-center relative">
            <div className="max-w-2xl">
              <Badge variant="secondary" className="mb-4 bg-white/20 text-white hover:bg-white/30">
                {course.category}
              </Badge>
              <h1 className="text-4xl font-bold text-white mb-2">{course.title}</h1>
              <p className="text-indigo-100">{course.description}</p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8 -mt-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="md:col-span-2">
              {/* Course Stats */}
              <Card className="mb-8 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100 cursor-help">
                          <p className="text-sm text-blue-600 font-medium">Progress</p>
                          <p className="text-2xl font-bold text-blue-900">{course.progress}%</p>
                          <Progress value={course.progress} className="mt-2 bg-blue-100" />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Your current progress in the course</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-100 cursor-help">
                          <p className="text-sm text-purple-600 font-medium">Duration</p>
                          <div className="flex items-center gap-2">
                            <ClockIcon className="h-4 w-4 text-purple-600" />
                            <p className="text-2xl font-bold text-purple-900">{course.duration}h</p>
                          </div>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Total course duration</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg border border-green-100 cursor-help">
                          <p className="text-sm text-green-600 font-medium">Students</p>
                          <div className="flex items-center gap-2">
                            <PersonIcon className="h-4 w-4 text-green-600" />
                            <p className="text-2xl font-bold text-green-900">{course.students}</p>
                          </div>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Total enrolled students</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="bg-gradient-to-br from-yellow-50 to-amber-50 p-4 rounded-lg border border-yellow-100 cursor-help">
                          <p className="text-sm text-yellow-600 font-medium">Rating</p>
                          <div className="flex items-center gap-2">
                            <StarIcon className="h-4 w-4 text-yellow-500" />
                            <p className="text-2xl font-bold text-yellow-900">{course.rating}</p>
                          </div>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Course rating out of 5</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </CardContent>
              </Card>

              {/* Course Modules */}
              <Tabs defaultValue="modules" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="modules" className="data-[state=active]:bg-indigo-100 data-[state=active]:text-indigo-900">
                    Course Modules
                  </TabsTrigger>
                  <TabsTrigger value="resources" className="data-[state=active]:bg-indigo-100 data-[state=active]:text-indigo-900">
                    Resources
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="modules">
                  <ScrollArea className="h-[600px] pr-4">
                    <div className="space-y-4">
                      {modules.map((module) => (
                        <Card key={module.id} className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm">
                          <button
                            className="w-full text-left p-6 flex items-center justify-between hover:bg-indigo-50/50 transition-colors"
                            onClick={() => toggleModule(module.id)}
                          >
                            <div className="flex items-center gap-4">
                              <div className="flex-shrink-0">
                                {module.isLocked ? (
                                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center border border-gray-200">
                                    <LockClosedIcon className="h-4 w-4 text-gray-500" />
                                  </div>
                                ) : (
                                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center border border-blue-200">
                                    <span className="text-blue-600 font-semibold">{module.order}</span>
                                  </div>
                                )}
                              </div>
                              <div>
                                <h3 className="font-semibold text-lg text-gray-900">{module.title}</h3>
                                <p className="text-sm text-gray-600">{module.description}</p>
                              </div>
                            </div>
                            <ChevronDownIcon
                              className={`h-5 w-5 text-indigo-600 transition-transform ${
                                expandedModules.has(module.id) ? "transform rotate-180" : ""
                              }`}
                            />
                          </button>
                          {expandedModules.has(module.id) && (
                            <div className="border-t">
                              {/* Submodules */}
                              {module.submodules && module.submodules.length > 0 && (
                                <div className="border-b border-gray-100">
                                  {module.submodules.map((submodule) => (
                                    <button
                                      key={submodule.id}
                                      className="w-full text-left p-4 hover:bg-gray-50 flex items-center justify-between"
                                      onClick={() => router.push(`/courses/${course.id}/modules/${module.id}/${submodule.id}`)}
                                    >
                                      <div className="flex items-center gap-3 pl-9">
                                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center border border-green-200">
                                          <PlayIcon className="h-4 w-4 text-green-600" />
                                        </div>
                                        <div>
                                          <h4 className="font-medium text-gray-900">{submodule.title}</h4>
                                          <p className="text-sm text-gray-600">
                                            {submodule.description || 'No description available'}
                                          </p>
                                        </div>
                                      </div>
                                      <ChevronRightIcon className="h-5 w-5 text-indigo-600" />
                                    </button>
                                  ))}
                                </div>
                              )}

                              {/* Tests */}
                              {module.tests && module.tests.length > 0 && (
                                <div>
                                  {module.tests.map((test) => (
                                    <button
                                      key={test.id}
                                      className="w-full text-left p-4 hover:bg-gray-50 flex items-center justify-between"
                                      onClick={() => router.push(`/courses/${course.id}/tests/${test.id}`)}
                                    >
                                      <div className="flex items-center gap-3 pl-9">
                                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center border border-blue-200">
                                          <ClipboardIcon className="h-4 w-4 text-blue-600" />
                                        </div>
                                        <div>
                                          <h4 className="font-medium text-gray-900">{test.title}</h4>
                                          <p className="text-sm text-gray-600">
                                            {test.duration} minutes • Passing Score: {test.passingScore}%
                                          </p>
                                        </div>
                                      </div>
                                      <ChevronRightIcon className="h-5 w-5 text-indigo-600" />
                                    </button>
                                  ))}
                                </div>
                              )}

                              {/* Show message if no content */}
                              {(!module.submodules || module.submodules.length === 0) && 
                               (!module.tests || module.tests.length === 0) && (
                                <div className="p-4 text-center text-gray-500">
                                  No content available in this module yet.
                                </div>
                              )}
                            </div>
                          )}
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
                <TabsContent value="resources">
                  <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <p className="text-gray-600">Course resources will be available here.</p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-t-lg">
                  <CardTitle className="text-xl text-white">Course Instructor</CardTitle>
                  <CardDescription className="text-indigo-100">Meet your instructor</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16 border-2 border-indigo-200">
                      <AvatarImage src={course.instructor?.image || ""} alt={course.instructor?.name || ""} />
                      <AvatarFallback className="bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-600">
                        {course.instructor?.name?.charAt(0) || "I"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-gray-900">{course.instructor?.name}</h3>
                      <p className="text-sm text-indigo-600">Instructor</p>
                    </div>
                  </div>
                  <Separator className="my-4 bg-indigo-100" />
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">{course.instructor?.bio}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Course Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Level</p>
                    <p className="font-medium">{course.level}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Start Date</p>
                    <p className="font-medium">{new Date(course.startDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">End Date</p>
                    <p className="font-medium">{new Date(course.endDate).toLocaleDateString()}</p>
                  </div>
                  {course.deadline && (
                    <div>
                      <p className="text-sm text-gray-500">Deadline</p>
                      <p className="font-medium">{new Date(course.deadline).toLocaleDateString()}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 