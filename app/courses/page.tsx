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
  CalendarIcon 
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
  const [sortBy, setSortBy] = useState("last-accessed");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // If not authenticated, redirect to login
    if (status === "unauthenticated") {
      router.push("/auth/login");
      return;
    }

    // Only fetch courses if authenticated
    if (status === "authenticated") {
      const fetchCourses = async () => {
        try {
          const response = await fetch("/api/courses/enrolled");
          if (!response.ok) throw new Error("Failed to fetch courses");
          const data = await response.json();
          setCourses(data);
        } catch (error) {
          console.error("Error fetching courses:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchCourses();
    }
  }, [status, router]);

  // Show loading state while checking authentication
  if (status === "loading" || (status === "unauthenticated" && loading)) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="space-y-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </>
    );
  }

  // Show login prompt if not authenticated
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

  const filteredCourses = courses.filter(course => {
    if (selectedTab === "all") return true;
    if (selectedTab === "in-progress") return course.progress > 0 && course.progress < 100;
    if (selectedTab === "future") return course.progress === 0;
    if (selectedTab === "past") return course.progress === 100;
    if (selectedTab === "starred") return course.isStarred ?? false;
    if (selectedTab === "removed") return course.isRemoved ?? false;
    return true;
  }).filter(course => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.instructor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.category.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => {
    if (sortBy === "title") return a.title.localeCompare(b.title);
    if (sortBy === "progress") return b.progress - a.progress;
    if (sortBy === "deadline") {
      const aDate = a.deadline ? new Date(a.deadline).getTime() : 0;
      const bDate = b.deadline ? new Date(b.deadline).getTime() : 0;
      return aDate - bDate;
    }
    // default: last-accessed
    const aDate = a.lastAccessed ? new Date(a.lastAccessed).getTime() : 0;
    const bDate = b.lastAccessed ? new Date(b.lastAccessed).getTime() : 0;
    return bDate - aDate;
  });

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between space-y-0 pb-2">
                  <p className="text-sm font-medium">In Progress</p>
                  <Badge variant="secondary">{courses.filter(c => c.progress > 0 && c.progress < 100).length}</Badge>
                </div>
                <div className="text-2xl font-bold">
                  {((courses.filter(c => c.progress > 0 && c.progress < 100).length / courses.length) * 100).toFixed(0)}%
                </div>
                <Progress 
                  value={(courses.filter(c => c.progress > 0 && c.progress < 100).length / courses.length) * 100}
                  className="mt-3"
                />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between space-y-0 pb-2">
                  <p className="text-sm font-medium">Completed</p>
                  <Badge variant="secondary">{courses.filter(c => c.progress === 100).length}</Badge>
                </div>
                <div className="text-2xl font-bold">
                  {((courses.filter(c => c.progress === 100).length / courses.length) * 100).toFixed(0)}%
                </div>
                <Progress 
                  value={(courses.filter(c => c.progress === 100).length / courses.length) * 100}
                  className="mt-3"
                />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between space-y-0 pb-2">
                  <p className="text-sm font-medium">Not Started</p>
                  <Badge variant="secondary">{courses.filter(c => c.progress === 0).length}</Badge>
                </div>
                <div className="text-2xl font-bold">
                  {((courses.filter(c => c.progress === 0).length / courses.length) * 100).toFixed(0)}%
                </div>
                <Progress 
                  value={(courses.filter(c => c.progress === 0).length / courses.length) * 100}
                  className="mt-3"
                />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between space-y-0 pb-2">
                  <p className="text-sm font-medium">Total Hours</p>
                  <ClockIcon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="text-2xl font-bold">
                  {courses.reduce((acc, curr) => acc + parseInt(curr.duration), 0)}h
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  Across {courses.length} courses
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">My Learning Journey</h1>
          </div>

          {/* Course Overview Section */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Course overview</h2>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarIcon className="h-4 w-4" />
                <span>Last updated: {new Date().toLocaleDateString()}</span>
              </div>
            </div>
            
            {/* Tabs */}
            <Tabs value={selectedTab} onValueChange={(value) => setSelectedTab(value as CourseTab)} className="mb-6">
              <TabsList className="grid grid-cols-3 lg:grid-cols-6 gap-4">
                {tabs.map((tab) => {
                  const count = (() => {
                    switch (tab.id) {
                      case "in-progress":
                        return courses.filter(c => c.progress > 0 && c.progress < 100).length;
                      case "future":
                        return courses.filter(c => c.progress === 0).length;
                      case "past":
                        return courses.filter(c => c.progress === 100).length;
                      case "starred":
                        return courses.filter(c => c.isStarred ?? false).length;
                      case "removed":
                        return courses.filter(c => c.isRemoved ?? false).length;
                      default:
                        return courses.length;
                    }
                  })();

                  return (
                    <TabsTrigger 
                      key={tab.id} 
                      value={tab.id}
                      className="relative"
                    >
                      {tab.label}
                      {count > 0 && (
                        <Badge 
                          variant="secondary" 
                          className="ml-2 absolute -top-1 -right-1"
                        >
                          {count}
                        </Badge>
                      )}
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </Tabs>

            {/* Controls */}
            <div className="flex flex-wrap gap-4 mb-6">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last-accessed">Sort by last accessed</SelectItem>
                  <SelectItem value="title">Sort by title</SelectItem>
                  <SelectItem value="progress">Sort by progress</SelectItem>
                  <SelectItem value="deadline">Sort by deadline</SelectItem>
                </SelectContent>
              </Select>

              <div className="relative flex-1 max-w-sm">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  className={cn(
                    viewMode === "grid" && "bg-secondary text-secondary-foreground"
                  )}
                >
                  <GridIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setViewMode("list")}
                  className={cn(
                    viewMode === "list" && "bg-secondary text-secondary-foreground"
                  )}
                >
                  <ListBulletIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setViewMode("card")}
                  className={cn(
                    viewMode === "card" && "bg-secondary text-secondary-foreground"
                  )}
                >
                  <LayoutIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Course Grid */}
            <div className={cn(
              "grid gap-6",
              viewMode === "grid" && "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
              viewMode === "list" && "grid-cols-1",
              viewMode === "card" && "grid-cols-1 md:grid-cols-2 gap-4"
            )}>
              {filteredCourses.map((course) => (
                <Card
                  key={course.id}
                  className={cn(
                    "group overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer",
                    viewMode === "list" ? "flex" : "flex flex-col h-[400px]"
                  )}
                  onClick={() => router.push(`/courses/${course.id}`)}
                >
                  <div className={cn(
                    "relative",
                    viewMode === "list" ? "w-48 h-full" : "h-40 w-full"
                  )}>
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge
                      variant="secondary"
                      className="absolute top-2 right-2"
                    >
                      {course.category}
                    </Badge>
                    {course.progress > 0 && (
                      <Progress 
                        value={course.progress}
                        className="absolute bottom-0 left-0 right-0"
                      />
                    )}
                  </div>
                  <CardContent className={cn(
                    "flex flex-col flex-1 p-4",
                    viewMode === "list" ? "w-full" : ""
                  )}>
                    <div className="h-12 mb-2">
                      <h3 className="text-lg font-semibold line-clamp-2 group-hover:text-primary">
                        {course.title}
                      </h3>
                    </div>

                    <div className="h-10 mb-3">
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {course.description}
                      </p>
                    </div>

                    <div className="h-8 flex items-center gap-2 mb-4">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={course.instructor.image} alt={course.instructor.name} />
                        <AvatarFallback>{course.instructor.name[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-muted-foreground line-clamp-1">
                        {course.instructor.name}
                      </span>
                    </div>

                    <div className="mt-auto space-y-3">
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <ClockIcon className="h-4 w-4" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <ActivityLogIcon className="h-4 w-4" />
                          <span>{course.level}</span>
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>{course.completedLessons?.length || 0} of {course.lessons} completed</span>
                          <span>{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}