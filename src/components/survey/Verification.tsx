import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { SurveyContainer } from "@/components/ui/survey-container";

interface VerificationProps {
  verificationChecks: {
    sentMessages: boolean;
    validRecipients: boolean;
  };
  onVerificationChange: (checks: { sentMessages: boolean; validRecipients: boolean }) => void;
  onVerify: () => void;
}

export const Verification = ({ verificationChecks, onVerificationChange, onVerify }: VerificationProps) => {
  return (
    <SurveyContainer variant="padded" className="p-4">
      <h2 className="text-2xl font-bold text-primary mb-4 text-center">
        Confirm Your Messages
      </h2>
      <p className="text-gray-600 text-center mb-6">
        Check both boxes and then press continue to claim your $750 Trader Joe's reward
      </p>
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <Checkbox
            id="messages"
            checked={verificationChecks.sentMessages}
            onCheckedChange={(checked) =>
              onVerificationChange({
                ...verificationChecks,
                sentMessages: checked as boolean,
              })
            }
          />
          <label
            htmlFor="messages"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I confirm I sent all 2 messages
          </label>
        </div>
        <div className="flex items-start space-x-3">
          <Checkbox
            id="recipients"
            checked={verificationChecks.validRecipients}
            onCheckedChange={(checked) =>
              onVerificationChange({
                ...verificationChecks,
                validRecipients: checked as boolean,
              })
            }
          />
          <label
            htmlFor="recipients"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I confirm all recipients are 18+ and located in the USA, Canada, Australia, or UK
          </label>
        </div>
        <Button
          onClick={onVerify}
          variant="survey-action"
          className="mt-4"
          disabled={!verificationChecks.sentMessages || !verificationChecks.validRecipients}
        >
          Continue
        </Button>
      </div>
    </SurveyContainer>
  );
};