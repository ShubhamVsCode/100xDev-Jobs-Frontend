"use client";
import FormWrapper from "./FormWrapper";
import { UseFormSetValue } from "react-hook-form";
import { ProfileType, SkillType } from "@/lib/validations/auth";
import { useEffect, useState } from "react";
import ProfileAPI from "@/api/profile";
import SelectableSkillsCard from "./SelectableSkillsCard";

type stepProps = {
  updateForm: UseFormSetValue<ProfileType>;
};

const AddonsForm = ({ updateForm }: stepProps) => {
  const [skills, setSkills] = useState<SkillType[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<SkillType[]>([]);

  const getAllSkills = async () => {
    const response = await ProfileAPI.getAllSkills();
    const skills = response?.skills;

    setSkills(skills as SkillType[]);
  };

  useEffect(() => {
    getAllSkills();
  }, []);

  const onClickHandler = (skill: SkillType) => {
    if (selectedSkills?.findIndex((s) => s._id === skill._id) !== -1) {
      setSelectedSkills((prev) => prev?.filter((s) => s._id !== skill._id));
    } else {
      setSelectedSkills((prev) => [...prev, skill]);
    }
  };

  useEffect(() => {
    updateForm(
      "skills",
      selectedSkills.map((s) => s?._id || "")
    );
  }, [selectedSkills]);

  return (
    <FormWrapper
      title="Showcase your skills"
      description="Add skills you have experience with."
    >
      <div className="grid grid-cols-3 gap-3">
        {skills?.map((skill) => {
          return (
            <SelectableSkillsCard {...skill} onClickHandler={onClickHandler} />
          );
        })}
      </div>
    </FormWrapper>
  );
};

export default AddonsForm;
