export interface Course {
  id: string;
  title: string;
  instructor: {
    name: string;
    image: string;
    bio: string;
  };
  description: string;
  image: string;
  price: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  lessons: number;
  rating: number;
  students: number;
  category: string;
  tags: string[];
  startDate: string;
  endDate: string;
  enrollmentStatus: 'not_enrolled' | 'enrolled' | 'completed';
  progress: number;
  lastAccessed?: string;
  status: 'not_started' | 'in_progress' | 'completed';
  completedLessons: number[];
  enrolledAt: string;
  isStarred?: boolean;
  isRemoved?: boolean;
  deadline?: string;
}

export interface EnrolledCourse extends Course {
  userId: string;
} 