"use client";
import FormWrapper from "./FormWrapper";
import {
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
  UserIcon,
  YoutubeIcon,
} from "lucide-react";
import { Input } from "../ui/input";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { ProfileType } from "@/lib/validations/auth";

type stepProps = {
  register: UseFormRegister<ProfileType>;
};

const SocialForm = ({ register }: stepProps) => {
  return (
    <FormWrapper
      title="Fill your social presence"
      description="You can add your social media accounts to your profile."
    >
      <div className=" flex justify-between items-center gap-3">
        <UserIcon />
        <Input
          className="w-full "
          placeholder="https://portfolio.com"
          {...register("social.portfolio")}
        />
      </div>
      <div className=" flex justify-between items-center gap-3">
        <GithubIcon />
        <Input
          className="w-full "
          placeholder="https://github.com/username"
          {...register("social.github")}
        />
      </div>
      <div className=" flex justify-between items-center gap-3">
        <LinkedinIcon />
        <Input
          className="w-full "
          placeholder="https://linkedin.com/in/username"
          {...register("social.linkedin")}
        />
      </div>
      <div className=" flex justify-between items-center gap-3">
        <YoutubeIcon />
        <Input
          className="w-full "
          placeholder="https://youtube.com/c/username"
          {...register("social.youtube")}
        />
      </div>
      <div className=" flex justify-between items-center gap-3">
        <TwitterIcon />
        <Input
          className="w-full "
          placeholder="https://twitter.com/username"
          {...register("social.twitter")}
        />
      </div>
    </FormWrapper>
  );
};

export default SocialForm;
