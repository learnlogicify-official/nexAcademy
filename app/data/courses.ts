import { Course } from '../types/course';

export const courses: Course[] = [
  {
    id: '1',
    title: 'Python Programming for Beginners',
    instructor: {
      name: 'John Doe',
      image: '/instructors/john-doe.jpg',
      bio: 'Senior Software Engineer with 10+ years of experience in Python development'
    },
    description: 'Learn Python from scratch with this comprehensive course. Master the fundamentals and build real-world applications.',
    image: '/courses/python-beginners.jpg',
    price: 49.99,
    isEnrolled: false,
    level: 'Beginner',
    duration: '8 weeks',
    lessons: 40,
    rating: 4.8,
    students: 1200,
    category: 'Programming',
    tags: ['Python', 'Programming', 'Beginner']
  },
  {
    id: '2',
    title: 'Advanced Data Structures and Algorithms',
    instructor: {
      name: 'Jane Smith',
      image: '/instructors/jane-smith.jpg',
      bio: 'Computer Science Professor specializing in Algorithms and Data Structures'
    },
    description: 'Master advanced data structures and algorithms to ace technical interviews and build efficient applications.',
    image: '/courses/dsa-advanced.jpg',
    price: 79.99,
    isEnrolled: true,
    level: 'Advanced',
    duration: '12 weeks',
    lessons: 60,
    rating: 4.9,
    students: 800,
    category: 'Computer Science',
    tags: ['Algorithms', 'Data Structures', 'Interview Preparation']
  },
  {
    id: '3',
    title: 'Web Development Bootcamp',
    instructor: {
      name: 'Mike Johnson',
      image: '/instructors/mike-johnson.jpg',
      bio: 'Full-stack developer and tech educator with 8 years of experience'
    },
    description: 'Become a full-stack web developer. Learn HTML, CSS, JavaScript, React, and Node.js.',
    image: '/courses/web-dev-bootcamp.jpg',
    price: 99.99,
    isEnrolled: false,
    level: 'Intermediate',
    duration: '16 weeks',
    lessons: 80,
    rating: 4.7,
    students: 2500,
    category: 'Web Development',
    tags: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js']
  }
]; 