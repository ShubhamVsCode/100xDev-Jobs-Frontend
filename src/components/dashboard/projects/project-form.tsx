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
import { toast } from "@/components/ui/use-toast";
import { useParams } from "next/navigation";
import PublicProjectAPI from "@/api/project";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });
type OnChange = (
  value?: string,
  event?: React.ChangeEvent<HTMLTextAreaElement>,
  state?: ContextStore
) => void;

const ProjectForm = () => {
  const { projectId } = useParams();

  const [description, setDescription] = useState("");
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
    getValues,
    watch,
    setValue,
  } = useForm<ProjectType>({
    resolver: zodResolver(ProjectSchema),
  });

  const { thumbnails, setCurrentThumbnails, currentThumbnails } =
    useProjectStore();

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
      const response: any = await ProfileAPI.addProject(data);
      console.log(response);
      toast({
        title: response?.message,
      });
    })();
  };

  useEffect(() => {
    setValue("description", description);
  }, [description, setValue]);

  const getReadMeFile = async () => {
    if (!getValues("githubLink")) return;
    const readmeContent = await ProfileAPI.getReadme(getValues("githubLink"));
    setDescription(readmeContent);
  };

  const getCurrentProject = async () => {
    if (!projectId) return;

    const response = await PublicProjectAPI.getProjectById(projectId as string);

    if (response) {
      setValue("name", response.name);
      setValue("githubLink", response.githubLink);
      setValue("deployedLink", response.deployedLink);
      // setValue("description", response.description);
      setDescription(response.description);
      setValue("tags", response.tags);
      // setValue("images", response.images);
      setCurrentThumbnails(response.images!);
    }
  };

  useEffect(() => {
    if (projectId) {
      getCurrentProject();
    }
  }, [projectId]);

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
        <div className="flex justify-between items-center">
          <Label htmlFor="project-description">Project Description</Label>
          {watch("githubLink") && (
            <Button onClick={getReadMeFile} variant={"outline"} type="button">
              Get Github Readme
            </Button>
          )}
        </div>
        <MDEditor
          style={{ width: "100%" }}
          value={description}
          onChange={onChange}
          height={"300px"}
          preview={"edit"}
        />
      </div>
      <Button>{projectId ? "Update" : "Create"} Project</Button>
    </form>
  );
};

export default ProjectForm;
