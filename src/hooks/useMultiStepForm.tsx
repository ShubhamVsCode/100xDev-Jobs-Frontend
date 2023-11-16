"use client";

import { useState } from "react";

export function useMultiplestepForm(steps: number, onFinish?: () => void) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);

  const nextStep = () => {
    if (currentStepIndex < steps - 1) {
      setCurrentStepIndex((i) => i + 1);
    }
    if (currentStepIndex === steps - 1) {
      if (onFinish) {
        onFinish();
      }
      setShowSuccessMsg(true);
    }
  };

  const previousStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((i) => i - 1);
    }
  };

  const goTo = (index: number) => {
    setCurrentStepIndex(index);
  };

  return {
    currentStepIndex,
    steps,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps - 1,
    showSuccessMsg,
    goTo,
    nextStep,
    previousStep,
  };
}
