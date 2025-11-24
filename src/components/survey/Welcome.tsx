
import { Button } from "@/components/ui/button";
import { getBrandConfig } from "@/config/brand";

interface WelcomeProps {
  onStart: () => void;
}

export const Welcome = ({ onStart }: WelcomeProps) => {
  const brand = getBrandConfig();

  return (
    <div className="text-center animate-fadeIn">
      <img
        src={brand.logoPath}
        alt={brand.name}
        className="h-12 mx-auto mb-6"
      />
      <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
        Starbucks Winter Quiz
      </h1>
      <p className="mb-6 text-gray-700 max-w-md mx-auto">
        Answer a few quick questions about your favorite winter drinks and Starbucks moments
        for a chance to unlock an exclusive {brand.settlementAmount} reward.
      </p>
      <Button
        onClick={onStart}
        variant="survey-action"
        className="max-w-xs"
      >
        Start the Quiz
      </Button>
    </div>
  );
};
