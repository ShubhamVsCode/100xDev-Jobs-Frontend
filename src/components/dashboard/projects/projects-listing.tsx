"use client";
import ProfileAPI from "@/api/profile";
import { ProjectType } from "@/lib/validations/auth";
import React, { useEffect, useState } from "react";
import Carousel from "./carousel";
import { getObjectURL } from "@/lib/utils";
import Markdown from "react-markdown";
import dynamic from "next/dynamic";
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

const ProjectsListing = () => {
  const [projects, setProjects] = useState<ProjectType[]>([]);

  useEffect(() => {
    (async () => {
      const response = (await ProfileAPI.getProjects()) as {
        projects: ProjectType[];
      };
      const projects = response?.projects;
      console.log(response);
      setProjects(projects as ProjectType[]);
    })();
  }, []);

  return (
    <div className="grid md:grid-cols-3 gap-4">
      {projects
        ?.map((project) => (
          <div key={project.name} className="space-y-4 border p-2 rounded-lg">
            <Carousel
              slides={Array.from(Array(project.images?.length).keys())}
              imageByIndex={(index) =>
                getObjectURL(project.images?.at(index) as string)
              }
              showArrows
              height="10"
              fullWidth
              className="!p-0"
            ></Carousel>
            <h1 className="text-xl">{project.name}</h1>

            <div>
              {project.tags?.map((tag) => (
                <span
                  key={tag}
                  className="inline-block bg-slate-200rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2"
                >
                  {tag}
                </span>
              ))}
            </div>

            <Markdown className={"truncate line-clamp-4"}>
              {project.description}
            </Markdown>
          </div>
        ))
        .reverse()}
    </div>
  );
};

export default ProjectsListing;
