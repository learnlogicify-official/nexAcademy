"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TestPopup } from "@/components/test-popup";
import { Book, Video, Code, FileText, Trophy } from "lucide-react";

interface ModuleContent {
  id: string;
  type: "video" | "reading" | "code" | "test";
  title: string;
  duration: string;
  completed: boolean;
}

export default function ModulePage({ params }: { params: { courseId: string; moduleId: string } }) {
  const router = useRouter();
  const [showTestPopup, setShowTestPopup] = useState(false);

  // Mock module data - replace with actual API call
  const moduleContents: ModuleContent[] = [
    {
      id: "1",
      type: "video",
      title: "Introduction to Module",
      duration: "15 min",
      completed: true
    },
    {
      id: "2",
      type: "reading",
      title: "Core Concepts",
      duration: "20 min",
      completed: true
    },
    {
      id: "3",
      type: "code",
      title: "Practice Exercise",
      duration: "30 min",
      completed: true
    },
    {
      id: "4",
      type: "test",
      title: "Module Assessment",
      duration: "30 min",
      completed: false
    }
  ];

  const getContentIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="h-5 w-5" />;
      case "reading":
        return <Book className="h-5 w-5" />;
      case "code":
        return <Code className="h-5 w-5" />;
      case "test":
        return <Trophy className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const handleContentClick = (content: ModuleContent) => {
    if (content.type === "test") {
      setShowTestPopup(true);
    } else {
      // Navigate to the specific content
      router.push(`/course/${params.courseId}/module/${params.moduleId}/content/${content.id}`);
    }
  };

  const handleStartTest = () => {
    setShowTestPopup(false);
    router.push(`/test/${params.moduleId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Module Title</h1>
          <p className="text-gray-600 dark:text-gray-300">
            This module covers the fundamental concepts and practical applications.
          </p>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Module Progress</span>
            <span className="text-sm text-gray-500">75%</span>
          </div>
          <Progress value={75} className="h-2" />
        </div>

        <div className="space-y-4">
          {moduleContents.map((content) => (
            <Card 
              key={content.id}
              className={`cursor-pointer transition-colors ${
                content.completed ? "border-green-500" : ""
              }`}
              onClick={() => handleContentClick(content)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-full ${
                      content.completed ? "bg-green-100 dark:bg-green-900" : "bg-gray-100 dark:bg-gray-800"
                    }`}>
                      {getContentIcon(content.type)}
                    </div>
                    <div>
                      <h3 className="font-medium">{content.title}</h3>
                      <p className="text-sm text-gray-500">{content.duration}</p>
                    </div>
                  </div>
                  {content.completed && (
                    <span className="text-green-500 text-sm">Completed</span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <TestPopup
        isOpen={showTestPopup}
        onClose={() => setShowTestPopup(false)}
        onStart={handleStartTest}
        testDetails={{
          title: "Module Assessment",
          duration: 30,
          totalQuestions: 10,
          passingScore: 70,
          instructions: [
            "You have 30 minutes to complete the test",
            "The test contains 10 multiple-choice questions",
            "You need to score at least 70% to pass",
            "You cannot go back to previous questions once answered",
            "The test will auto-submit when time runs out"
          ]
        }}
      />
    </div>
  );
} 