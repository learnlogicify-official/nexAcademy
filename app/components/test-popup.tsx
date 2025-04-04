import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Clock, AlertTriangle, CheckCircle } from "lucide-react";

interface TestPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onStart: () => void;
  testDetails: {
    title: string;
    duration: number;
    totalQuestions: number;
    passingScore: number;
    instructions: string[];
  };
}

export function TestPopup({
  isOpen,
  onClose,
  onStart,
  testDetails,
}: TestPopupProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{testDetails.title}</DialogTitle>
          <DialogDescription className="space-y-4">
            <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                Duration: {testDetails.duration} minutes
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2" />
                Questions: {testDetails.totalQuestions}
              </div>
              <div className="flex items-center">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Passing Score: {testDetails.passingScore}%
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900 dark:text-white">Instructions:</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-gray-600 dark:text-gray-300">
                {testDetails.instructions.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ul>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onStart} className="bg-blue-600 hover:bg-blue-700">
            Start Test
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 