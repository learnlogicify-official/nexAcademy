import React from "react";
import Link from "next/link";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="relative">
        {/* Hero section */}
        <div className="relative bg-gradient-to-r from-indigo-500 to-purple-600">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Practice Coding Problems
            </h1>
            <p className="mt-6 text-xl text-white max-w-3xl">
              Improve your coding skills with our collection of programming problems. 
              Get instant feedback and track your progress.
            </p>
            <div className="mt-10 flex space-x-4">
              <Link
                href="/problems"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
              >
                Start Practicing
              </Link>
              <Link
                href="/auth/register"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>

        {/* Featured Problems section */}
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Featured Problems
            </h2>
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Problem cards */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="px-6 py-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Two Sum
                  </h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Easy
                  </span>
                </div>
                <div className="px-6 py-4 bg-gray-50">
                  <p className="text-sm text-gray-500">
                    Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
                  </p>
                </div>
                <div className="px-6 py-4">
                  <Link
                    href="/problems/two-sum"
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Try it now →
                  </Link>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="px-6 py-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Reverse Linked List
                  </h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    Medium
                  </span>
                </div>
                <div className="px-6 py-4 bg-gray-50">
                  <p className="text-sm text-gray-500">
                    Reverse a singly linked list.
                  </p>
                </div>
                <div className="px-6 py-4">
                  <Link
                    href="/problems/reverse-linked-list"
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Try it now →
                  </Link>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="px-6 py-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Binary Tree Level Order Traversal
                  </h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    Hard
                  </span>
                </div>
                <div className="px-6 py-4 bg-gray-50">
                  <p className="text-sm text-gray-500">
                    Given the root of a binary tree, return the level order traversal of its nodes' values.
                  </p>
                </div>
                <div className="px-6 py-4">
                  <Link
                    href="/problems/binary-tree-level-order"
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Try it now →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 