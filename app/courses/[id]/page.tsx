'use client';

import { useState } from 'react';
import Image from 'next/image';
import { courses } from '../../data/courses';
import { Course } from '../../types/course';

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  const course = courses.find(c => c.id === params.id);

  if (!course) {
    return <div>Course not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative h-64">
            <Image
              src={course.image}
              alt={course.title}
              fill
              className="object-cover"
            />
            {course.isEnrolled && (
              <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg">
                Enrolled
              </div>
            )}
          </div>

          <div className="p-8">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
                <div className="flex items-center mb-6">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src={course.instructor.image}
                      alt={course.instructor.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Instructor</p>
                    <p className="font-medium">{course.instructor.name}</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-6">{course.description}</p>
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center">
                    <span className="text-yellow-500 mr-1">★</span>
                    <span className="text-gray-700">{course.rating}</span>
                    <span className="text-gray-500 ml-2">({course.students} students)</span>
                  </div>
                  <div className="text-gray-600">{course.duration}</div>
                  <div className="text-gray-600">{course.lessons} lessons</div>
                  <div className="text-gray-600">Level: {course.level}</div>
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {course.tags.map(tag => (
                    <span key={tag} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="w-full md:w-80">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="text-3xl font-bold mb-4">${course.price}</div>
                  <button
                    className={`w-full px-4 py-3 rounded-lg mb-4 ${
                      course.isEnrolled
                        ? 'bg-gray-200 text-gray-700'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {course.isEnrolled ? 'Continue Learning' : 'Enroll Now'}
                  </button>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration</span>
                      <span className="font-medium">{course.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Lessons</span>
                      <span className="font-medium">{course.lessons}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Level</span>
                      <span className="font-medium">{course.level}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Category</span>
                      <span className="font-medium">{course.category}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">About the Instructor</h2>
              <div className="flex items-start">
                <div className="relative w-20 h-20 rounded-full overflow-hidden mr-6">
                  <Image
                    src={course.instructor.image}
                    alt={course.instructor.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{course.instructor.name}</h3>
                  <p className="text-gray-600">{course.instructor.bio}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 