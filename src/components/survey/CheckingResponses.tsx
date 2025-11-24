
import { SurveyContainer } from "@/components/ui/survey-container";
import { useAutoAdvance } from "@/hooks/use-auto-advance";

interface CheckingResponsesProps {
  onComplete: () => void;
}

export const CheckingResponses = ({ onComplete }: CheckingResponsesProps) => {
  useAutoAdvance(onComplete, 1500);

  return (
    <SurveyContainer variant="centered">
      <div className="mb-8">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
      </div>
      <h2 className="text-3xl font-bold text-primary mb-4">
        Checking your responses to see if you qualify...
      </h2>
    </SurveyContainer>
  );
};
