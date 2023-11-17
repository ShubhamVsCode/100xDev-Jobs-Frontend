"use client";
import FormWrapper from "./FormWrapper";
import { UserType } from "@/lib/validations/auth";
import { useState } from "react";
import ProfileAPI from "@/api/profile";
import { Button } from "../ui/button";
import { toast } from "@/components/ui/use-toast";

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
      <div className="verify-form mt-10">
        <div className="verify-button-container">
          <button className="verify" onClick={verifyHandler} type="button">
            <span className="circle" aria-hidden="true">
              <span className="icon arrow"></span>
            </span>
            <span className="button-text">
              {isVerified || verified ? "Verified" : "Verify"}
            </span>
          </button>
        </div>
      </div>
    </FormWrapper>
  );
};

export default VerifyForm;
