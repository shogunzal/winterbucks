
import { Button } from "@/components/ui/button";
import { SurveyContainer } from "@/components/ui/survey-container";
import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";

interface SurveyQuestionProps {
  question: string;
  options: string[];
  onAnswer: (answer: string) => void;
  className?: string;
  showTimer?: boolean;
}

export const SurveyQuestion = ({
  question,
  options,
  onAnswer,
  className,
  showTimer = false,
}: SurveyQuestionProps) => {
  return (
    <SurveyContainer className={className}>
      {showTimer && (
        <div className="flex items-center justify-center mb-4 text-gray-600 text-sm bg-gray-100 py-2 px-4 rounded-full w-fit mx-auto">
          <Clock size={16} className="mr-1" />
          <span>Takes 1-2 minutes</span>
        </div>
      )}
      <h2 className="text-3xl font-bold text-primary mb-8 text-center">
        {question}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {options.map((option) => (
          <Button
            key={option}
            onClick={() => onAnswer(option)}
            variant="survey"
            className="whitespace-normal break-words text-center leading-snug text-base md:text-lg px-4"
          >
            {option}
          </Button>
        ))}
      </div>
    </SurveyContainer>
  );
};
