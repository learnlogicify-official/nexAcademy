import React from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";

export default function ProblemsPage() {
  return (
    <main>
      <Navbar />
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Coding Problems
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Browse through our collection of coding problems. Filter by difficulty
            and start solving!
          </p>
        </div>

        {/* Problems list */}
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:mt-10 lg:max-w-none lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((problem) => (
            <article
              key={problem}
              className="flex flex-col items-start justify-between"
            >
              <div className="relative w-full">
                <div className="flex items-center gap-x-4 text-xs">
                  <span className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600">
                    Easy
                  </span>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <Link href={`/problems/${problem}`}>
                      <span className="absolute inset-0" />
                      Two Sum
                    </Link>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                    Given an array of integers nums and an integer target, return
                    indices of the two numbers such that they add up to target.
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
} 