
import { cn } from "@/lib/utils";

interface SurveyProgressProps {
  currentStep: number;
  totalSteps: number;
}

export const SurveyProgress = ({ currentStep, totalSteps }: SurveyProgressProps) => {
  return (
    <div className="w-full mb-8">
      <div className="flex justify-between mb-2">
        <span className="text-sm text-gray-600">Progress</span>
        <span className="text-sm font-medium text-primary">
          {currentStep}/{totalSteps}
        </span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2">
        <div
          className="bg-primary h-2 rounded-full transition-all duration-300"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>
    </div>
  );
};
