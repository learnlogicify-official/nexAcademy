"use client";

import { useEffect, useState } from "react";
import { Course } from "@/app/types/course";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { 
  MagnifyingGlassIcon, 
  GridIcon, 
  ListBulletIcon, 
  LayoutIcon, 
  ClockIcon, 
  ActivityLogIcon, 
  CalendarIcon,
  StarIcon,
  CheckCircledIcon,
  CircleIcon,
  PersonIcon
} from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import Navbar from "../components/Navbar";

type ViewMode = "grid" | "list" | "card";
type CourseTab = "all" | "in-progress" | "future" | "past" | "starred" | "removed";

interface Tab {
  id: CourseTab;
  label: string;
}

const tabs: Tab[] = [
  { id: "all", label: "All Courses" },
  { id: "in-progress", label: "In Progress" },
  { id: "future", label: "Future" },
  { id: "past", label: "Past" },
  { id: "starred", label: "Starred" },
  { id: "removed", label: "Removed" }
];

export default function CoursesPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState<Course[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [selectedTab, setSelectedTab] = useState<CourseTab>("all");
  const [sortBy, setSortBy] = useState("lastAccessed");
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [allCourses, setAllCourses] = useState<Course[]>([]);

  const fetchCourses = async (tab: CourseTab, sort: string) => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();
      if (tab !== "all") params.append("status", tab);
      if (sort) params.append("sortBy", sort);

      const response = await fetch(`/api/courses/enrolled?${params.toString()}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch courses");
      }

      const data = await response.json();
      setAllCourses(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
      setError(error instanceof Error ? error.message : "Failed to fetch courses");
    } finally {
      setLoading(false);
    }
  };

  // Filter courses based on search term
  const filteredCourses = allCourses.filter(course => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      course.title.toLowerCase().includes(searchLower) ||
      course.instructor.name?.toLowerCase().includes(searchLower) ||
      course.category.toLowerCase().includes(searchLower)
    );
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      console.log('User is not authenticated, redirecting to login');
      router.push("/auth/login");
      return;
    }

    if (status === "authenticated" && session?.user?.id) {
      console.log('User is authenticated with ID:', session.user.id);
      fetchCourses(selectedTab, sortBy);
    }
  }, [status, session, router, selectedTab, sortBy]);

  if (status === "loading" || loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50">
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              {[...Array(4)].map((_, i) => (
                <Card key={i}>
                  <CardContent className="pt-6">
                    <Skeleton className="h-4 w-24 mb-2" />
                    <Skeleton className="h-8 w-16 mb-3" />
                    <Skeleton className="h-2 w-full" />
                    <Skeleton className="h-4 w-32 mt-2" />
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i}>
                  <CardHeader className="p-4">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div>
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-3 w-16 mt-1" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <Skeleton className="h-5 w-3/4 mb-4" />
                    <Skeleton className="h-2 w-full mb-2" />
                    <Skeleton className="h-8 w-full mt-4" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }

  if (status === "unauthenticated") {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex flex-col items-center justify-center gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Please Sign In</h1>
          <p className="text-gray-600 mb-4">You need to be signed in to view your courses.</p>
          <Button 
            onClick={() => router.push("/auth/login")}
            variant="default"
            size="lg"
          >
            Sign In
          </Button>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex flex-col items-center justify-center gap-4">
          <h1 className="text-2xl font-bold text-red-600">Error</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button 
            onClick={() => fetchCourses(selectedTab, sortBy)}
            variant="default"
            size="lg"
          >
            Try Again
          </Button>
        </div>
      </>
    );
  }

  const stats = {
    inProgress: filteredCourses.filter(c => c.progress > 0 && c.progress < 100).length,
    completed: filteredCourses.filter(c => c.progress === 100).length,
    notStarted: filteredCourses.filter(c => c.progress === 0).length,
    totalHours: filteredCourses.reduce((acc, curr) => acc + parseInt(curr.duration), 0),
    totalCourses: filteredCourses.length,
    starred: filteredCourses.filter(c => c.isStarred).length,
    averageProgress: filteredCourses.reduce((acc, curr) => acc + curr.progress, 0) / filteredCourses.length || 0,
    totalStudents: filteredCourses.reduce((acc, curr) => acc + curr.students, 0),
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-purple-50 to-pink-50 pt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-indigo-900">My Learning Journey</h1>
            <div className="flex items-center gap-4">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px] bg-white/80 backdrop-blur-sm border-indigo-200">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lastAccessed">Last Accessed</SelectItem>
                  <SelectItem value="title">Title</SelectItem>
                  <SelectItem value="progress">Progress</SelectItem>
                  <SelectItem value="deadline">Deadline</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  className={viewMode === "grid" ? "bg-indigo-600 hover:bg-indigo-700" : "hover:bg-indigo-100"}
                >
                  <GridIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                  className={viewMode === "list" ? "bg-indigo-600 hover:bg-indigo-700" : "hover:bg-indigo-100"}
                >
                  <ListBulletIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "card" ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("card")}
                  className={viewMode === "card" ? "bg-indigo-600 hover:bg-indigo-700" : "hover:bg-indigo-100"}
                >
                  <LayoutIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Status Tabs */}
          <div className="flex space-x-4 mb-6">
            <Button
              variant={selectedTab === "all" ? "default" : "outline"}
              onClick={() => setSelectedTab("all")}
              className={`text-sm font-medium ${
                selectedTab === "all" 
                  ? "bg-indigo-600 hover:bg-indigo-700" 
                  : "border-indigo-200 text-indigo-600 hover:bg-indigo-50"
              }`}
            >
              All Courses
            </Button>
            <Button
              variant={selectedTab === "in-progress" ? "default" : "outline"}
              onClick={() => setSelectedTab("in-progress")}
              className={`text-sm font-medium ${
                selectedTab === "in-progress" 
                  ? "bg-purple-600 hover:bg-purple-700" 
                  : "border-purple-200 text-purple-600 hover:bg-purple-50"
              }`}
            >
              In Progress
            </Button>
            <Button
              variant={selectedTab === "future" ? "default" : "outline"}
              onClick={() => setSelectedTab("future")}
              className={`text-sm font-medium ${
                selectedTab === "future" 
                  ? "bg-pink-600 hover:bg-pink-700" 
                  : "border-pink-200 text-pink-600 hover:bg-pink-50"
              }`}
            >
              Future
            </Button>
            <Button
              variant={selectedTab === "past" ? "default" : "outline"}
              onClick={() => setSelectedTab("past")}
              className={`text-sm font-medium ${
                selectedTab === "past" 
                  ? "bg-emerald-600 hover:bg-emerald-700" 
                  : "border-emerald-200 text-emerald-600 hover:bg-emerald-50"
              }`}
            >
              Past
            </Button>
            <Button
              variant={selectedTab === "starred" ? "default" : "outline"}
              onClick={() => setSelectedTab("starred")}
              className={`text-sm font-medium ${
                selectedTab === "starred" 
                  ? "bg-amber-600 hover:bg-amber-700" 
                  : "border-amber-200 text-amber-600 hover:bg-amber-50"
              }`}
            >
              Starred
            </Button>
            <Button
              variant={selectedTab === "removed" ? "default" : "outline"}
              onClick={() => setSelectedTab("removed")}
              className={`text-sm font-medium ${
                selectedTab === "removed" 
                  ? "bg-red-600 hover:bg-red-700" 
                  : "border-red-200 text-red-600 hover:bg-red-50"
              }`}
            >
              Removed
            </Button>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between space-y-0 pb-2">
                  <p className="text-sm font-medium text-indigo-600">In Progress</p>
                  <CircleIcon className="h-4 w-4 text-indigo-400" />
                </div>
                <div className="text-2xl font-bold text-indigo-900">{stats.inProgress}</div>
                <Progress 
                  value={(stats.inProgress / stats.totalCourses) * 100}
                  className="mt-3 bg-indigo-100"
                />
                <p className="text-xs text-indigo-500 mt-2">
                  {((stats.inProgress / stats.totalCourses) * 100 || 0).toFixed(0)}% of courses
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between space-y-0 pb-2">
                  <p className="text-sm font-medium text-purple-600">Completed</p>
                  <CheckCircledIcon className="h-4 w-4 text-purple-400" />
                </div>
                <div className="text-2xl font-bold text-purple-900">{stats.completed}</div>
                <Progress 
                  value={(stats.completed / stats.totalCourses) * 100}
                  className="mt-3 bg-purple-100"
                />
                <p className="text-xs text-purple-500 mt-2">
                  {((stats.completed / stats.totalCourses) * 100 || 0).toFixed(0)}% of courses
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-pink-50 to-rose-50 border-pink-200">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between space-y-0 pb-2">
                  <p className="text-sm font-medium text-pink-600">Total Hours</p>
                  <ClockIcon className="h-4 w-4 text-pink-400" />
                </div>
                <div className="text-2xl font-bold text-pink-900">{stats.totalHours}h</div>
                <p className="text-xs text-pink-500 mt-2">
                  Across {stats.totalCourses} courses
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-rose-50 to-orange-50 border-rose-200">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between space-y-0 pb-2">
                  <p className="text-sm font-medium text-rose-600">Total Students</p>
                  <PersonIcon className="h-4 w-4 text-rose-400" />
                </div>
                <div className="text-2xl font-bold text-rose-900">{stats.totalStudents}</div>
                <p className="text-xs text-rose-500 mt-2">
                  Average {Math.round(stats.totalStudents / stats.totalCourses) || 0} per course
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filter */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-indigo-400" />
              <Input
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/80 backdrop-blur-sm border-indigo-200 focus:border-indigo-400 focus:ring-indigo-400"
              />
            </div>
          </div>

          {/* Course Grid */}
          <div className={cn(
            "grid gap-6",
            viewMode === "grid" && "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
            viewMode === "list" && "grid-cols-1",
            viewMode === "card" && "grid-cols-1 md:grid-cols-2"
          )}>
            {filteredCourses.map((course) => (
              <Card key={course.id} className="hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm border-indigo-200">
                <CardHeader className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="border-2 border-indigo-200">
                        <AvatarImage src={course.instructor.image || ''} />
                        <AvatarFallback className="bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-600">
                          {course.instructor.name?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium text-indigo-900">{course.instructor.name}</p>
                        <p className="text-xs text-indigo-500">{course.category}</p>
                      </div>
                    </div>
                    {course.isStarred && (
                      <StarIcon className="h-4 w-4 text-amber-500" />
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2 text-indigo-900">{course.title}</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-indigo-500">Progress</span>
                      <span className="font-medium text-indigo-900">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2 bg-indigo-100" />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-indigo-500">Duration</span>
                      <span className="font-medium text-indigo-900">{course.duration}h</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-indigo-500">Students</span>
                      <span className="font-medium text-indigo-900">{course.students}</span>
                    </div>
                    {course.deadline && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-indigo-500">Deadline</span>
                        <span className="font-medium text-indigo-900">
                          {new Date(course.deadline).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>
                  <Button
                    className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700"
                    onClick={() => router.push(`/courses/${course.id}`)}
                  >
                    Continue Learning
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}