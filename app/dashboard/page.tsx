"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  BellIcon,
  MoonIcon,
  SunIcon,
  MagnifyingGlassIcon,
  PersonIcon,
  BookmarkIcon,
  TimerIcon,
  StarIcon,
  PlayIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  GearIcon,
  ExitIcon
} from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Navbar from "@/app/components/Navbar";

interface DashboardStats {
  activeCourses: number;
  pendingAssignments: number;
  certificates: number;
  rank: number;
  progress: number;
}

interface RecentCourse {
  id: string;
  title: string;
  instructor: string;
  progress: number;
  lastAccessed: string;
  imageUrl: string;
  category: string;
  duration: string;
  rating: number;
  enrolledStudents: number;
  lessonsCompleted: number;
  totalLessons: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  nextLesson: string;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats>({
    activeCourses: 0,
    pendingAssignments: 0,
    certificates: 0,
    rank: 0,
    progress: 0,
  });
  const [recentCourses, setRecentCourses] = useState<RecentCourse[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
      return;
    }

    // Mock data - replace with actual API calls
    setStats({
      activeCourses: 5,
      pendingAssignments: 3,
      certificates: 2,
      rank: 42,
      progress: 75,
    });

    setRecentCourses([
      {
        id: "1",
        title: "Advanced JavaScript Concepts",
        instructor: "John Doe",
        progress: 75,
        lastAccessed: "2 hours ago",
        imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fHx8fHx8fDE3MTE2MjY0MDN8&auto=format&fit=crop&w=1470&q=80",
        category: "Programming",
        duration: "8 hours",
        rating: 4.8,
        enrolledStudents: 1250,
        lessonsCompleted: 12,
        totalLessons: 16,
        difficulty: "Advanced",
        nextLesson: "Async/Await Patterns"
      },
      {
        id: "2",
        title: "React Hooks Masterclass",
        instructor: "Jane Smith",
        progress: 45,
        lastAccessed: "1 day ago",
        imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fHx8fHx8fDE3MTE2MjY0MDN8&auto=format&fit=crop&w=1470&q=80",
        category: "Web Development",
        duration: "6 hours",
        rating: 4.9,
        enrolledStudents: 980,
        lessonsCompleted: 6,
        totalLessons: 14,
        difficulty: "Intermediate",
        nextLesson: "Custom Hooks"
      },
      {
        id: "3",
        title: "TypeScript Fundamentals",
        instructor: "Mike Johnson",
        progress: 90,
        lastAccessed: "3 days ago",
        imageUrl: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fHx8fHx8fDE3MTE2MjY0MDN8&auto=format&fit=crop&w=1470&q=80",
        category: "Programming",
        duration: "5 hours",
        rating: 4.7,
        enrolledStudents: 1500,
        lessonsCompleted: 8,
        totalLessons: 9,
        difficulty: "Intermediate",
        nextLesson: "Generics"
      },
      {
        id: "4",
        title: "Node.js Backend Development",
        instructor: "Sarah Wilson",
        progress: 30,
        lastAccessed: "4 days ago",
        imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fHx8fHx8fDE3MTE2MjY0MDN8&auto=format&fit=crop&w=1470&q=80",
        category: "Backend",
        duration: "10 hours",
        rating: 4.6,
        enrolledStudents: 850,
        lessonsCompleted: 4,
        totalLessons: 12,
        difficulty: "Advanced",
        nextLesson: "Express Middleware"
      },
      {
        id: "5",
        title: "Python Data Science",
        instructor: "Alex Brown",
        progress: 60,
        lastAccessed: "5 days ago",
        imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fHx8fHx8fDE3MTE2MjY0MDN8&auto=format&fit=crop&w=1470&q=80",
        category: "Data Science",
        duration: "12 hours",
        rating: 4.9,
        enrolledStudents: 2100,
        lessonsCompleted: 8,
        totalLessons: 14,
        difficulty: "Advanced",
        nextLesson: "Machine Learning Basics"
      }
    ]);
  }, [status, router]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans">
      <Navbar />
      
      {/* Main Content */}
      <div className="container mx-auto px-4 pt-24">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
            Welcome back, {session?.user?.name}!
          </h1>
          <p className="text-base text-gray-600 dark:text-gray-300 mt-2 font-medium">
            Keep up the great work! You're making excellent progress in your learning journey.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 tracking-wide">Active Courses</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stats.activeCourses}</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <BookmarkIcon className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 tracking-wide">Pending Assignments</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stats.pendingAssignments}</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center">
                  <StarIcon className="h-5 w-5 text-yellow-600 dark:text-yellow-300" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 tracking-wide">Certificates</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stats.certificates}</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                  <StarIcon className="h-5 w-5 text-green-600 dark:text-green-300" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 tracking-wide">Your Rank</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">#{stats.rank}</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                  <PersonIcon className="h-5 w-5 text-purple-600 dark:text-purple-300" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recently Accessed Courses */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recently Accessed Courses</h2>
          </div>
          
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
            }}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            pagination={{ 
              clickable: true,
              dynamicBullets: true
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            className="relative"
          >
            {recentCourses.map((course) => (
              <SwiperSlide key={course.id}>
                <Card 
                  className="h-auto w-[280px] overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                  onClick={() => router.push(`/courses/${course.id}`)}
                >
                  <div className="relative h-48">
                    <img
                      src={course.imageUrl}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/20 to-transparent p-4">
                      <Badge variant="secondary" className="bg-white/90 text-gray-900">
                        {course.category}
                      </Badge>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <h3 className="text-white font-semibold text-lg">{course.title}</h3>
                      <p className="text-white/80 text-sm">{course.instructor}</p>
                    </div>
                  </div>
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                          <StarIcon className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium ml-1">{course.rating}</span>
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">•</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{course.duration}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {course.difficulty}
                      </Badge>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                        <span>Progress</span>
                        <span className="font-medium">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                        <span>{course.lessonsCompleted} of {course.totalLessons} lessons</span>
                        <span>{course.enrolledStudents.toLocaleString()} students</span>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <TimerIcon className="h-4 w-4 mr-2" />
                        Last accessed {course.lastAccessed}
                      </div>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <PlayIcon className="h-4 w-4 mr-2" />
                        Next: {course.nextLesson}
                      </div>
                    </div>

                    <Button 
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/courses/${course.id}`);
                      }}
                    >
                      Continue Learning
                    </Button>
                  </CardContent>
                </Card>
              </SwiperSlide>
            ))}
            
            <div className="swiper-button-prev !text-gray-900 dark:!text-white !w-10 !h-10 !bg-white dark:!bg-gray-800 !rounded-full !shadow-lg after:!text-sm"></div>
            <div className="swiper-button-next !text-gray-900 dark:!text-white !w-10 !h-10 !bg-white dark:!bg-gray-800 !rounded-full !shadow-lg after:!text-sm"></div>
          </Swiper>
        </div>
      </div>
    </div>
  );
} 