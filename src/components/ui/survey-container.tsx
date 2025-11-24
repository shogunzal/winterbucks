import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SurveyContainerProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "padded" | "centered";
}

export function SurveyContainer({ 
  children, 
  className, 
  variant = "default" 
}: SurveyContainerProps) {
  const variants = {
    default: "w-full max-w-lg mx-auto animate-fadeIn",
    padded: "w-full max-w-lg mx-auto p-6 bg-gray-50 rounded-lg shadow-sm animate-fadeIn",
    centered: "w-full max-w-lg mx-auto text-center animate-fadeIn"
  };

  return (
    <div className={cn(variants[variant], className)}>
      {children}
    </div>
  );
}