"use client";

import { useState, useEffect } from "react";
import FormWrapper from "./FormWrapper";
import { Separator } from "@/components/ui/separator";
import { FormItems } from "@/app/(main)/profile/page";

type StepProps = FormItems & {
  goTo: (index: number) => void;
};

const FinalStep = ({ goTo }: StepProps) => {
  return (
    <FormWrapper title="Profile Picture" description="Add a profile picture">
      Profile Picture
    </FormWrapper>
  );
};

export default FinalStep;
