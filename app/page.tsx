"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Navbar from "./components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRightIcon, CodeIcon, StarIcon, ClockIcon } from "@radix-ui/react-icons";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  // Show loading state while checking authentication
  if (status === "loading") {
    return (
      <main className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-24 sm:py-32">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </main>
    );
  }

  // If authenticated, this won't render as we redirect to dashboard
  if (status === "authenticated") {
    return null;
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-primary/90 text-primary-foreground">
        <div className="absolute inset-0 bg-black/50" />
        <div className="container relative mx-auto px-4 py-24 sm:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Master Coding Through Practice
            </h1>
            <p className="mt-6 text-xl text-primary-foreground/90">
              Sharpen your coding skills with our curated collection of programming problems. 
              Get instant feedback, track your progress, and join a community of learners.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link href="/problems">
                  Start Practicing
                  <ArrowRightIcon className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                <Link href="/auth/register">
                  Create Account
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <CodeIcon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Hands-on Learning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Practice with real coding problems and get instant feedback on your solutions.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <StarIcon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Track Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Monitor your improvement with detailed statistics and achievement tracking.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <ClockIcon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Flexible Learning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Learn at your own pace with problems ranging from beginner to advanced levels.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Problems Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">
            Featured Problems
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Problem Card 1 */}
            <Card className="group hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-semibold group-hover:text-primary transition-colors">
                    Two Sum
                  </CardTitle>
                  <Badge variant="default">Easy</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
                </p>
                <Button asChild variant="ghost" className="p-0 h-auto hover:bg-transparent">
                  <Link href="/problems/two-sum" className="text-primary hover:text-primary/80">
                    Try it now <ArrowRightIcon className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Problem Card 2 */}
            <Card className="group hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-semibold group-hover:text-primary transition-colors">
                    Reverse Linked List
                  </CardTitle>
                  <Badge variant="secondary">Medium</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Reverse a singly linked list.
                </p>
                <Button asChild variant="ghost" className="p-0 h-auto hover:bg-transparent">
                  <Link href="/problems/reverse-linked-list" className="text-primary hover:text-primary/80">
                    Try it now <ArrowRightIcon className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Problem Card 3 */}
            <Card className="group hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-semibold group-hover:text-primary transition-colors">
                    Binary Tree Level Order Traversal
                  </CardTitle>
                  <Badge variant="destructive">Hard</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Given the root of a binary tree, return the level order traversal of its nodes' values.
                </p>
                <Button asChild variant="ghost" className="p-0 h-auto hover:bg-transparent">
                  <Link href="/problems/binary-tree-level-order" className="text-primary hover:text-primary/80">
                    Try it now <ArrowRightIcon className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
} 