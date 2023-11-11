"use client";

import { useState } from "react";
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

export type FormItems = {
  name: string;
  email: string;
  username: string;
  profilePicture: string;
  github: string;
  linkedin: string;
  youtube: string;
  twitter: string;
  portfolio: string;
};

const initialValues: FormItems = {
  name: "",
  email: "",
  username: "",
  profilePicture: "",
  github: "",
  linkedin: "",
  youtube: "",
  twitter: "",
  portfolio: "",
};

export default function ProfilePage() {
  const { user } = useUserStore();

  const [formData, setFormData] = useState({ ...initialValues, ...user });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const {
    previousStep,
    nextStep,
    currentStepIndex,
    isFirstStep,
    isLastStep,
    steps,
    goTo,
    showSuccessMsg,
  } = useMultiplestepForm(4);

  function updateForm(fieldToUpdate: Partial<FormItems>) {
    const { name, email, username } = fieldToUpdate;

    if (name && name.trim().length < 3) {
      setErrors((prevState) => ({
        ...prevState,
        name: "Name should be at least 3 characters long",
      }));
    } else if (name && name.trim().length > 15) {
      setErrors((prevState) => ({
        ...prevState,
        name: "Name should be no longer than 15 characters",
      }));
    } else {
      setErrors((prevState) => ({
        ...prevState,
        name: "",
      }));
    }

    if (email && !/\S+@\S+\.\S+/.test(email)) {
      setErrors((prevState) => ({
        ...prevState,
        email: "Please enter a valid email address",
      }));
    } else {
      setErrors((prevState) => ({
        ...prevState,
        email: "",
      }));
    }

    setFormData({ ...formData, ...fieldToUpdate });
  }

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.values(errors).some((error) => error)) {
      return;
    }
    nextStep();
  };

  const calculateWidth = () => {
    switch (currentStepIndex) {
      case 0:
        return "25%";
      case 1:
        return "50%";
      case 2:
        return "75%";
      default:
        return "100%";
    }
  };

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
                  <UserInfoForm
                    key="step1"
                    {...formData}
                    updateForm={updateForm}
                    errors={errors}
                  />
                )}
                {currentStepIndex === 1 && (
                  <PlanForm key="step2" {...formData} updateForm={updateForm} />
                )}
                {currentStepIndex === 2 && (
                  <AddonsForm
                    key="step3"
                    {...formData}
                    updateForm={updateForm}
                  />
                )}
                {currentStepIndex === 3 && (
                  <FinalStep key="step4" {...formData} goTo={goTo} />
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
