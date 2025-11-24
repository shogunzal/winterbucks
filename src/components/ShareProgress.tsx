
import { Button } from "@/components/ui/button";
import { SurveyContainer } from "@/components/ui/survey-container";
import { Share2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ShareProgressProps {
  required: number;
  current: number;
  onShare: () => void;
}

export const ShareProgress = ({ required, current, onShare }: ShareProgressProps) => {
  const [copied, setCopied] = useState(false);

  const shareText =
    "Hey! Trader Joe's is urgently looking for product reviewers, I just signed up! They're giving reviewers $500 to shop and review anything at Trader Joe's to everyone who signs up and shares the program with 5 friends. Sign up here: https://tjsummer.com 🙏";

  const handleShare = async () => {
    try {
      // Copy to clipboard
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      
      // Open messages app
      const smsUrl = `sms:?body=${encodeURIComponent(shareText)}`;
      window.location.href = smsUrl;
      
      onShare();
      toast.success("Text copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy text");
    }
  };

  return (
    <SurveyContainer variant="padded">
      <h2 className="text-3xl font-bold text-primary mb-4 text-center">
        Help Spread The Word!
      </h2>
      <p className="text-gray-600 text-center mb-6">
        (Must send to {required} real phone numbers to claim your $500 Trader Joe's reward!)
      </p>
      <div className="mb-6">
        <div className="text-center mb-4 text-gray-700">
          {current}/{required} friends shared
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg mb-6 border border-gray-200">
        <p className="text-gray-700 text-sm">{shareText}</p>
      </div>
      <Button
        onClick={handleShare}
        variant="survey-action"
      >
        <Share2 className="mr-2 h-5 w-5" />
        Copy & Share ({required - current} remaining)
      </Button>
    </SurveyContainer>
  );
};
