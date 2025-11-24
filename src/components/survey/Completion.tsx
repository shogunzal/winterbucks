
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SurveyContainer } from "@/components/ui/survey-container";
import { useEffect, useState } from "react";
import { getBrandConfig } from "@/config/brand";

export const Completion = () => {
  const brand = getBrandConfig();
  const [targetUrl, setTargetUrl] = useState(brand.targetUrl);
  
  // Dynamic language based on campaign type
  const isGiftCard = brand.campaignType === "gift-card" || brand.campaignType === "sweepstakes";
  const title = isGiftCard ? "Finish Your Starbucks Winter Quiz" : "Complete Your Claim Form";
  const description = isGiftCard 
    ? `Follow these steps to unlock your ${brand.settlementAmount}:`
    : `Follow these steps up to ${brand.settlementAmount} ${brand.name} Settlement:`;
  const finalStep = isGiftCard 
    ? `Enjoy your ${brand.settlementAmount}!`
    : `Receive your ${brand.name} Settlement payment!`;
  
  return (
    <SurveyContainer>
      <div className="p-6 bg-gray-50 rounded-lg shadow-sm mb-8">
        <h2 className="text-3xl font-bold text-primary mb-4 text-center">
          {title}
        </h2>
        <p className="text-gray-600 text-center mb-6">
          <span className="font-bold">{description}</span>
        </p>
        
        <ol className="text-left space-y-3 list-decimal list-inside mb-8">
          <li>Click on <span className="font-bold">"Claim Now"</span></li>
          <li>Enter your <span className="font-bold">email</span> and <span className="font-bold">basic info</span></li>
          <li>Complete <span className="font-bold">{isGiftCard ? "3-5" : "2-5"} sponsored deals</span></li>
          <li>{finalStep}</li>
        </ol>
        
        <Button
          variant="survey-action"
          className="rounded-lg font-bold"
          onClick={() => targetUrl && (window.location.href = targetUrl)}
        >
          CLAIM NOW
        </Button>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-bold text-center mb-4">Frequently Asked Questions:</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="deals-1">
            <AccordionTrigger className="text-left font-semibold">
              {isGiftCard ? "How do the deals affect my reward amount?" : "How do the deals affect my settlement amount?"}
            </AccordionTrigger>
            <AccordionContent>
              <p className="mb-2"><strong>Each deal you complete directly increases your {isGiftCard ? "reward" : "payout"} amount</strong>, up to the maximum of {brand.settlementAmount}.</p>
              <p>The more verification deals you complete, the higher your final {isGiftCard ? "gift card value" : "settlement"} will be. This is why we strongly recommend completing all available deals to receive your maximum eligible {isGiftCard ? "reward" : "compensation"}.</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="deals-2">
            <AccordionTrigger className="text-left font-semibold">
              What are deals?
            </AccordionTrigger>
            <AccordionContent>
              The verification deals are simple offers that help confirm your eligibility. These may include free trials, surveys, or other promotional offers from our partners. All deals are legitimate and help fund the {isGiftCard ? "reward" : "settlement"} process.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="deals-3">
            <AccordionTrigger className="text-left font-semibold">
              Are these deals safe to complete?
            </AccordionTrigger>
            <AccordionContent>
              Yes, all verification deals are carefully selected from reputable partners. They involve completing simple tasks like signing up for free trials, taking surveys, or exploring new services. Your personal information is protected, and there's no financial risk involved.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </SurveyContainer>
  );
};
