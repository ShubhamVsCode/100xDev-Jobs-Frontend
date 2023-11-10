"use client";

import { useState } from "react";
import Image from "next/image";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import FormWrapper from "./FormWrapper";
import { FormItems } from "@/app/(main)/profile/page";
import {
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
  UserIcon,
  YoutubeIcon,
} from "lucide-react";
import { Input } from "../ui/input";
import { InputWithText } from "../ui/input-with-text";

type stepProps = FormItems & {
  updateForm: (fieldToUpdate: Partial<FormItems>) => void;
};

type Plan = "arcade" | "advanced" | "pro";

const PlanForm = ({ updateForm, plan, yearly }: stepProps) => {
  const [yearlyUpdated, setYearlyUpdated] = useState(yearly);
  const [planSelected, setPlanSelected] = useState<Plan>(plan);

  const handleCheckedChange = (yearlyUpdated: boolean) => {
    setYearlyUpdated((prev) => !prev);
    updateForm({ yearly: yearlyUpdated });
  };

  const handleValueChange = (planSelected: Plan) => {
    if (planSelected) {
      setPlanSelected(planSelected);
      updateForm({ plan: planSelected });
    }
  };

  return (
    <FormWrapper
      title="Fill your social presence"
      description="You can add your social media accounts to your profile."
    >
      <div className=" flex justify-between items-center gap-3">
        <UserIcon />
        <Input className="w-full " placeholder="https://portfolio.com" />
      </div>
      <div className=" flex justify-between items-center gap-3">
        <GithubIcon />
        <Input className="w-full " placeholder="https://github.com/username" />
      </div>
      <div className=" flex justify-between items-center gap-3">
        <LinkedinIcon />
        <Input
          className="w-full "
          placeholder="https://linkedin.com/in/username"
        />
      </div>
      <div className=" flex justify-between items-center gap-3">
        <YoutubeIcon />
        <Input
          className="w-full "
          placeholder="https://youtube.com/c/username"
        />
      </div>
      <div className=" flex justify-between items-center gap-3">
        <TwitterIcon />
        <Input className="w-full " placeholder="https://twitter.com/username" />
      </div>
    </FormWrapper>
  );
};

export default PlanForm;
