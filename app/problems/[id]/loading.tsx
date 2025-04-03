import React from "react";
import Navbar from "@/app/components/Navbar";

export default function Loading() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Problem Header Skeleton */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 animate-pulse">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="h-8 w-64 bg-gray-200 rounded"></div>
              <div className="h-4 w-32 bg-gray-200 rounded mt-2"></div>
            </div>
            <div className="h-4 w-20 bg-gray-200 rounded"></div>
          </div>

          {/* Problem Description Skeleton */}
          <div className="space-y-4">
            <div className="h-4 w-48 bg-gray-200 rounded"></div>
            <div className="h-4 w-full bg-gray-200 rounded"></div>
            <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
            <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
          </div>
        </div>

        {/* Code Editor and Test Cases Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Code Editor Skeleton */}
          <div className="bg-white rounded-lg shadow-sm animate-pulse">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <div className="h-4 w-20 bg-gray-200 rounded"></div>
                <div className="flex space-x-2">
                  <div className="h-8 w-16 bg-gray-200 rounded"></div>
                  <div className="h-8 w-16 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
            <div className="p-4">
              <div className="h-[400px] bg-gray-200 rounded"></div>
            </div>
          </div>

          {/* Test Cases Skeleton */}
          <div className="bg-white rounded-lg shadow-sm animate-pulse">
            <div className="p-4 border-b">
              <div className="h-6 w-24 bg-gray-200 rounded"></div>
            </div>
            <div className="p-4 space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="p-4 bg-gray-50 rounded-md">
                  <div className="flex items-center justify-between mb-2">
                    <div className="h-4 w-16 bg-gray-200 rounded"></div>
                    <div className="h-4 w-16 bg-gray-200 rounded"></div>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <div className="h-4 w-12 bg-gray-200 rounded mb-1"></div>
                      <div className="h-8 bg-gray-200 rounded"></div>
                    </div>
                    <div>
                      <div className="h-4 w-24 bg-gray-200 rounded mb-1"></div>
                      <div className="h-8 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Skeleton */}
        <div className="mt-6 flex justify-between">
          <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    </main>
  );
} 