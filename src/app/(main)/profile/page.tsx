"use client";

import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { useMultiplestepForm } from "@/hooks/useMultiStepForm";
import { AnimatePresence, motion } from "framer-motion";
import UserInfoForm from "@/components/profile/UserInfoForm";
import PlanForm from "@/components/profile/PlanForm";
import AddonsForm from "@/components/profile/AddonsForm";
import FinalStep from "@/components/profile/FinalStep";
import SuccessMessage from "@/components/profile/SuccessMessage";
import SideBar from "@/components/profile/SideBar";
import useUserStore from "@/store/user-store";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileSchema, ProfileType } from "@/lib/validations/auth";
import { toast } from "@/components/ui/use-toast";
import ProfileAPI from "@/api/profile";

export default function ProfilePage() {
  const { user } = useUserStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ProfileType>({
    resolver: zodResolver(ProfileSchema),
  });

  const {
    previousStep,
    nextStep,
    currentStepIndex,
    isFirstStep,
    isLastStep,
    steps,
    goTo,
    showSuccessMsg,
  } = useMultiplestepForm(3, () => {
    onFinish();
  });

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    nextStep();
  };

  const onFinish = () => {
    if (Object.keys(errors).length > 0) {
      return toast({
        title: "Error",
        description: JSON.stringify(errors, null, 2),
        variant: "destructive",
      });
    }
    handleSubmit(async (data) => {
      await ProfileAPI.updateProfile(data);

      toast({
        title: "Success",
        description: "Your profile has been updated.",
      });
    })();
  };

  const calculateWidth = useCallback(() => {
    switch (currentStepIndex) {
      case 0:
        return "33%";
      case 1:
        return "66%";
      default:
        return "100%";
    }
  }, [currentStepIndex]);

  return (
    <section className="">
      <div
        className={`flex overflow-hidden relative justify-between ${
          currentStepIndex === 1 ? "h-[700px]" : "h-[700px]"
        } rounded-lg border p-4`}
      >
        <motion.div
          className={cn(
            "absolute h-2 bg-gradient-to-r from-purple-700 to-purple-400 rounded-full -top-1 z-10 left-0"
          )}
          style={{
            width: calculateWidth(),
          }}
          initial={{ width: "0%" }}
          animate={{ width: calculateWidth() }}
          transition={{
            duration: 0.4,
            type: "spring",
            stiffness: 500,
            damping: 25,
          }}
        />

        {!showSuccessMsg ? (
          <SideBar currentStepIndex={currentStepIndex} goTo={goTo} />
        ) : (
          ""
        )}
        <main
          className={`${
            showSuccessMsg ? "w-full" : "w-full md:mt-5 md:w-[65%]"
          }`}
        >
          {showSuccessMsg ? (
            <AnimatePresence mode="wait">
              <SuccessMessage />
            </AnimatePresence>
          ) : (
            <form
              onSubmit={handleOnSubmit}
              className="w-full flex flex-col justify-between h-full"
            >
              <AnimatePresence mode="wait">
                {currentStepIndex === 0 && (
                  <UserInfoForm key="step1" updateForm={setValue} />
                )}
                {currentStepIndex === 1 && (
                  <PlanForm key="step2" register={register} />
                )}
                {currentStepIndex === 2 && (
                  <AddonsForm key="step3" updateForm={setValue} />
                )}
              </AnimatePresence>
              <div className="w-full items-center flex justify-between">
                <div className="">
                  {!isFirstStep && (
                    <Button
                      onClick={previousStep}
                      type="button"
                      variant="ghost"
                    >
                      Go Back
                    </Button>
                  )}
                </div>
                <div className="flex items-center">
                  <div className="relative after:pointer-events-none after:absolute after:inset-px after:rounded-[11px] after:shadow-highlight after:shadow-white/10 focus-within:after:shadow-[#77f6aa] after:transition">
                    <Button type="submit">
                      {isLastStep ? "Confirm" : "Next Step"}
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          )}
        </main>
      </div>
    </section>
  );
}
