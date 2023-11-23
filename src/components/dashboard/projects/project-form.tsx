"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TagInput from "./tags-input";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import type { ContextStore } from "@uiw/react-md-editor";
import { useForm } from "react-hook-form";
import { ProjectSchema, ProjectType } from "@/lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import useProjectStore from "@/store/project-store";
import UploadAPI from "@/api/upload";
import ProfileAPI from "@/api/profile";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });
type OnChange = (
  value?: string,
  event?: React.ChangeEvent<HTMLTextAreaElement>,
  state?: ContextStore
) => void;

const ProjectForm = () => {
  const [description, setDescription] = useState("");
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
    setValue,
  } = useForm<ProjectType>({
    resolver: zodResolver(ProjectSchema),
  });

  const { thumbnails } = useProjectStore();

  const onChange = useCallback<OnChange>((val) => {
    setDescription(val || "");
  }, []);

  const uploadImages = useCallback(async () => {
    if (!thumbnails?.length) return;

    let imagesKeys: string[] = [];

    await Promise.all(
      thumbnails.map(async (file) => {
        try {
          const { objectKey, url } = await UploadAPI.uploadFile(
            file.name,
            "projects"
          );
          await UploadAPI.uploadOnS3(url, file);
          imagesKeys.push(objectKey);
        } catch (error) {
          console.log(error);
        }
      })
    );

    setValue("images", imagesKeys);
  }, [thumbnails]);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Upload Thumbnails and Set keys in form
    await uploadImages();

    await handleSubmit(async (data) => {
      const response = await ProfileAPI.addProject(data);
      console.log(response);
    })();
  };

  useEffect(() => {
    setValue("description", description);
  }, [description, setValue]);

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div className="space-y-1">
        <Label htmlFor="project-title">Project Title</Label>
        <Input
          id="project-title"
          type="text"
          placeholder="Enter your project title"
          {...register("name")}
        />
        {errors.name?.message && (
          <p className="text-red-500 text-sm">{errors.name?.message}</p>
        )}
      </div>
      <div className="space-y-1">
        <Label htmlFor="github-link">Github Link</Label>
        <Input
          id="github-link"
          type="text"
          placeholder="Enter your github repo link"
          {...register("githubLink")}
        />
        {errors.githubLink?.message && (
          <p className="text-red-500 text-sm">{errors.githubLink?.message}</p>
        )}
      </div>
      <div className="space-y-1">
        <Label htmlFor="deployed-link">Deployed Link</Label>
        <Input
          id="deployed-link"
          type="text"
          placeholder="Enter your deployed link"
          {...register("deployedLink")}
        />
        {errors.deployedLink?.message && (
          <p className="text-red-500 text-sm">{errors.deployedLink?.message}</p>
        )}
      </div>
      <div className="space-y-1">
        <Label htmlFor="tags">Tags</Label>
        <TagInput setValue={setValue} />
        {errors.tags?.message && (
          <p className="text-red-500 text-sm">{errors.tags?.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="project-description">Project Description</Label>
        <MDEditor
          style={{ width: "100%" }}
          value={description}
          onChange={onChange}
          height={"300px"}
          preview={"edit"}
        />
      </div>
      <Button>Create Project</Button>
    </form>
  );
};

export default ProjectForm;
