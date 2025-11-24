import { useState } from "react";
import { SurveyProgress } from "@/components/SurveyProgress";
import { SurveyQuestion } from "@/components/SurveyQuestion";
import { Completion } from "@/components/survey/Completion";
import { CheckingResponses } from "@/components/survey/CheckingResponses";
import { EligibilityConfirmation } from "@/components/survey/EligibilityConfirmation";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { getBrandConfig } from "@/config/brand";

const Index = () => {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  const brand = getBrandConfig();
  const questions = brand.questions;
  
  const totalSteps = questions.length + 2;

  const handleAnswer = (answer: string) => {
    if (step <= questions.length) {
      const currentQuestion = questions[step - 1];
      
      if (currentQuestion.question === "Are you currently 18 years or older?") {
        if (answer === "No, I am under 18") {
          toast({
            title: "Age Requirement",
            description: "You must be 18 or older to participate in this Starbucks Winter Quiz.",
            variant: "default",
            duration: 5000,
          });
          setAnswers(prev => ({
            ...prev,
            [currentQuestion.question]: answer
          }));
          return;
        }
      }
      
      setAnswers(prev => ({
        ...prev,
        [currentQuestion.question]: answer
      }));
      setStep((prev) => prev + 1);
    }
  };

  const isCompletionPage = step > questions.length + 2;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {!isCompletionPage && (
        <div
          className="sticky top-0 z-10 py-2 px-4"
          style={{ backgroundColor: brand.primaryColor }}
        >
          <div className="text-center">
            <span className="text-white text-sm font-medium">
              ❄️ Starbucks Winter Quiz 2025 - Limited Time ❄️
            </span>
          </div>
        </div>
      )}
      
      <div className="container max-w-2xl mx-auto px-4 py-6 flex-grow">
        <div className="w-full">
          <img
            src={brand.logoPath}
            alt={brand.name}
            className="h-16 mx-auto mb-8"
          />
          {!isCompletionPage && <SurveyProgress currentStep={step} totalSteps={totalSteps} />}
          {step <= questions.length ? (
            questions[step - 1] && (
              <SurveyQuestion
                question={questions[step - 1].question}
                options={questions[step - 1].options}
                onAnswer={handleAnswer}
                className="mt-4"
                showTimer={step === 1}
              />
            )
          ) : step === questions.length + 1 ? (
            <CheckingResponses onComplete={() => setStep(prev => prev + 1)} />
          ) : step === questions.length + 2 ? (
            <EligibilityConfirmation onComplete={() => setStep(prev => prev + 1)} />
          ) : (
            <Completion />
          )}
        </div>
      </div>

      <footer className="bg-gray-100 py-4 border-t border-gray-200 text-xs md:text-sm mt-auto">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col space-y-2">
            {brand.additionalFooterText && (
              <p className="text-gray-600">
                More ways to enjoy {brand.name} this winter: <a href={brand.appDownloadUrl} className="hover:underline" style={{color: `hsl(var(--brand-link))`}}>Download the {brand.name} app</a> or <a href={brand.findStoresUrl} className="hover:underline" style={{color: `hsl(var(--brand-link))`}}>find stores near you</a>. 
                Or call <a href={`tel:${brand.phoneNumber}`} className="hover:underline" style={{color: `hsl(var(--brand-link))`}}>{brand.phoneNumber}</a>.
              </p>
            )}
            
            <p className="text-gray-600">{brand.region}</p>
            
            <div className={`flex ${isMobile ? 'flex-col space-y-1' : 'items-center justify-between'}`}>
              <p className="text-gray-600">Copyright © {new Date().getFullYear()} {brand.copyrightText}</p>
              
              <div className="flex flex-wrap gap-x-3">
                <a href={brand.privacyPolicyUrl} className="text-gray-600 hover:underline">
                  Privacy Policy
                </a>
                <a href={brand.termsOfServiceUrl} className="text-gray-600 hover:underline">
                  Terms of Service
                </a>
                <a href={brand.helpCenterUrl} className="text-gray-600 hover:underline">
                  Help Center
                </a>
                <a href={brand.aboutUrl} className="text-gray-600 hover:underline">
                  About
                </a>
                <a href={brand.orderNowUrl} className="text-gray-600 hover:underline">
                  Shop Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
