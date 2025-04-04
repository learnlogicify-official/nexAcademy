import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';

interface TestPopupProps {
  isOpen: boolean;
  onClose: () => void;
  test: {
    id: string;
    title: string;
    description: string;
    duration: number;
    passingScore: number;
    questions: Array<{
      id: string;
      question: string;
      options: string[];
      correctAnswer: number;
    }>;
  };
  courseId: string;
  moduleId: string;
}

export function TestPopup({ isOpen, onClose, test, courseId, moduleId }: TestPopupProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleStartTest = () => {
    setIsLoading(true);
    router.push(`/courses/${courseId}/tests/${test.id}/attempt`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{test.title}</DialogTitle>
          <DialogDescription>
            {test.description}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Duration</p>
              <p className="text-sm">{test.duration} minutes</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Passing Score</p>
              <p className="text-sm">{test.passingScore}%</p>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Number of Questions</p>
            <p className="text-sm">{test.questions.length}</p>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleStartTest} disabled={isLoading}>
            {isLoading ? 'Starting...' : 'Start Test'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 