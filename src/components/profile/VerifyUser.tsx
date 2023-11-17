"use client";
import FormWrapper from "./FormWrapper";
import { UseFormGetValues, UseFormSetValue } from "react-hook-form";
import { ProfileType, SkillType, UserType } from "@/lib/validations/auth";
import { useEffect, useState } from "react";
import ProfileAPI from "@/api/profile";
import SelectableSkillsCard from "./SelectableSkillsCard";
import { Button } from "../ui/button";
import { toast } from "@/components/ui/use-toast";
import { AxiosError } from "axios";

const VerifyForm = ({ isVerified }: { isVerified?: boolean }) => {
  const [verified, setVerified] = useState(isVerified || false);

  const verifyHandler = async () => {
    try {
      const res = (await ProfileAPI.verifyMe()) as {
        status?: boolean;
        user?: UserType;
        message?: string;
        error?: {
          message?: string;
        };
      };

      if (res?.error?.message) {
        toast({
          title: "Verification Failed",
          description: res?.error?.message,
          variant: "destructive",
        });
      }

      if (res?.status) {
        setVerified(true);
        toast({
          title: "Verified",
          description: "You are verified. Welcome to 100xDev",
        });
      }
    } catch (error: any) {
      if (error?.error?.message) {
        toast({
          title: "Verification Failed",
          description: error?.error?.message || "",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <FormWrapper
      title="Verify yourself with 100xDev Cohort"
      description="This is the final step. Please verify yourself with 100xDev Cohort."
    >
      <div>
        <Button type="button" onClick={verifyHandler}>
          {isVerified || verified ? "Verified" : "Verify"}
        </Button>
      </div>
    </FormWrapper>
  );
};

export default VerifyForm;
