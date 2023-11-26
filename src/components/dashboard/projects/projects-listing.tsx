"use client";
import ProfileAPI from "@/api/profile";
import { ProjectType } from "@/lib/validations/auth";
import React, { useEffect, useState } from "react";
import Carousel from "./carousel";
import { getObjectURL } from "@/lib/utils";
import Markdown from "react-markdown";
import dynamic from "next/dynamic";
import { ArrowUpCircle } from "lucide-react";
import { LinkButton } from "@/components/ui/button";
import ProjectCarousel from "./project-carousel";
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

const ProjectsListing = () => {
  const [projects, setProjects] = useState<ProjectType[]>([]);

  useEffect(() => {
    (async () => {
      const response = (await ProfileAPI.getProjects()) as {
        projects: ProjectType[];
      };
      const projects = response?.projects;
      setProjects(projects as ProjectType[]);
    })();
  }, []);

  return (
    <div className="grid md:grid-cols-3 gap-4">
      {projects
        ?.map((project) => (
          <div
            key={project._id}
            className="space-y-4 border p-2 rounded-lg group"
          >
            <ProjectCarousel images={project.images} />
            <div className="flex justify-between">
              <h1 className="text-lg font-semibold">{project.name}</h1>
              <LinkButton
                variant={"link"}
                href={`/dashboard/projects/${project._id}`}
              >
                <ArrowUpCircle className="rotate-45 text-gray-400 group-hover:text-gray-100 duration-100" />
              </LinkButton>
            </div>

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
