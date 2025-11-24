import { useEffect } from "react";

export const useAutoAdvance = (onComplete: () => void, delay: number) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, delay);
    return () => clearTimeout(timer);
  }, [onComplete, delay]);
};