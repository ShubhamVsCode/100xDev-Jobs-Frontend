"use client";

import { useState, useEffect } from "react";
import FormWrapper from "./FormWrapper";
import { Separator } from "@/components/ui/separator";
import { FormItems } from "@/app/(main)/profile/page";

type StepProps = FormItems & {
  goTo: (index: number) => void;
};

const FinalStep = ({ yearly, plan, addOns, goTo }: StepProps) => {
  let planPrice = 0;
  switch (plan) {
    case "arcade":
      planPrice = 9;
      break;
    case "advanced":
      planPrice = 12;
      break;
    case "pro":
      planPrice = 15;
      break;
    default:
      planPrice = 0;
      break;
  }

  const filteredAddOns = addOns.filter((addOn) => addOn.checked === true);

  const totalAddOnsPrice = filteredAddOns?.reduce(
    (acc, obj) => acc + obj.price,
    0
  );
  console.log(totalAddOnsPrice);

  return (
    <FormWrapper title="Profile Picture" description="Add a profile picture">
      Profile Picture
    </FormWrapper>
  );
};

export default FinalStep;
