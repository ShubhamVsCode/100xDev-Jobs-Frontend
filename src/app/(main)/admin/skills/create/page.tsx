"use client";

import ProfileAPI from "@/api/profile";
import UploadAPI from "@/api/upload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { SkillSchema, SkillType } from "@/lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import slugify from "slugify";

const AdminSkillsCreate = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    setValue,
    reset,
  } = useForm<SkillType>({
    resolver: zodResolver(SkillSchema),
  });

  const onSubmit = async (data: SkillType) => {
    // console.log(data);
    try {
      const response = await ProfileAPI.addSkills(data);
      console.log(response);
      toast({
        title: "Skills Created",
        description: response?.message,
      });
      reset();
    } catch (error) {
      console.log(error);
      toast({
        title: "Skills creation failed",
        variant: "destructive",
      });
    }
  };

  const generateSlug = () => {
    const nameValue = getValues("name");
    if (nameValue) {
      const slugValue = slugify(nameValue, { lower: true });
      setValue("slug", slugValue);
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files) return;

    const file = event.target.files[0];
    const response = await UploadAPI.uploadFile(
      getValues("slug") || file.name,
      "skills"
    );
    try {
      const uploadedFile = await UploadAPI.uploadOnS3(response.url, file);
      // console.log({ uploadedFile, objectKey: response.objectKey });
      setValue("picture", response.objectKey);
    } catch (error) {
      // console.log(error);
    }
  };

  console.log(errors);

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 max-w-xl mx-auto border px-10 py-8 rounded-md mt-10 shadow-md"
      >
        <h1 className="text-2xl font-semibold">Create Skill</h1>
        <div>
          <Label htmlFor="name">Name</Label>
          <Input type="text" id="name" {...register("name")} />
        </div>
        <div>
          <Label htmlFor="slug">Slug</Label>
          <div className="flex gap-2">
            <Input type="text" id="slug" {...register("slug")} />
            <Button variant={"secondary"} type="button" onClick={generateSlug}>
              Generate
            </Button>
          </div>
        </div>
        <div>
          <Label htmlFor="level">Level</Label>
          <Input
            type="number"
            min={1}
            max={100}
            id="level"
            {...register("level", {
              valueAsNumber: true,
            })}
          />
        </div>
        <div>
          <Label htmlFor="picture">Picture</Label>
          <Input type="file" id="picture" onChange={handleFileChange} />
          <img
            src={
              "https://100xdev-jobs.s3.ap-south-1.amazonaws.com/" +
              getValues("picture")
            }
            alt=""
            width={100}
            className="mx-auto"
          />
        </div>

        <div>
          <Button type="submit" className="w-full">
            Create
          </Button>
        </div>
      </form>
    </>
  );
};

export default AdminSkillsCreate;
