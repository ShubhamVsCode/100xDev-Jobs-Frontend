"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TagInput from "./tags-input";
import dynamic from "next/dynamic";
import { useCallback, useRef, useState } from "react";
import type { ContextStore } from "@uiw/react-md-editor";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });
type OnChange = (
  value?: string,
  event?: React.ChangeEvent<HTMLTextAreaElement>,
  state?: ContextStore
) => void;

const ProjectForm = () => {
  const [value, setValue] = useState("");

  const onChange = useCallback<OnChange>((val) => {
    setValue(val || "");
  }, []);

  return (
    <section className="space-y-3">
      <div className="space-y-1">
        <Label htmlFor="project-title">Project Title</Label>
        <Input
          id="project-title"
          type="text"
          placeholder="Enter your project title"
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="github-link">Github Link</Label>
        <Input
          id="github-link"
          type="text"
          placeholder="Enter your github repo link"
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="deployed-link">Deployed Link</Label>
        <Input
          id="deployed-link"
          type="text"
          placeholder="Enter your deployed link"
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="tags">Tags</Label>
        <TagInput />
      </div>
      <div className="space-y-2">
        <Label htmlFor="project-description">Project Description</Label>
        <MDEditor
          style={{ width: "100%" }}
          value={value}
          onChange={onChange}
          height={"300px"}
          preview={"edit"}
        />
      </div>
    </section>
  );
};

export default ProjectForm;
