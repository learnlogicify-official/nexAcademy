"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookOpen, CheckCircle2, Clock } from 'lucide-react';

interface Problem {
  id: string;
  title: string;
  description: string;
  createdAt: string;
}

export default function ProblemsPage() {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await fetch('/api/problems');
        if (!response.ok) {
          throw new Error('Failed to fetch problems');
        }
        const data = await response.json();
        setProblems(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProblems();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading problems...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-red-500">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Problems</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center text-gray-500">
            <BookOpen className="w-5 h-5 mr-2" />
            <span>{problems.length} Problems</span>
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        {problems.map((problem) => (
          <Link
            key={problem.id}
            href={`/problems/${problem.id}`}
            className="block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-semibold mb-2">{problem.title}</h2>
                <p className="text-gray-600 line-clamp-2">{problem.description}</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-gray-500">
                  <Clock className="w-4 h-4 mr-1" />
                  <span className="text-sm">
                    {new Date(problem.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center text-green-500">
                  <CheckCircle2 className="w-4 h-4 mr-1" />
                  <span className="text-sm">0%</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
} 