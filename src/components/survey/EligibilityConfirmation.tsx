
import { SurveyContainer } from "@/components/ui/survey-container";
import { useAutoAdvance } from "@/hooks/use-auto-advance";

interface EligibilityConfirmationProps {
  onComplete: () => void;
}

export const EligibilityConfirmation = ({ onComplete }: EligibilityConfirmationProps) => {
  useAutoAdvance(onComplete, 2000);

  return (
    <SurveyContainer variant="centered" className="pt-8">
      <h2 className="text-4xl font-bold text-primary mb-6">
        Congratulations!
      </h2>
      <p className="text-2xl text-gray-700">
        Based on your responses, you are eligible!
      </p>
    </SurveyContainer>
  );
};
