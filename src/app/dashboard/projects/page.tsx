import ProjectsListing from "@/components/dashboard/projects/projects-listing";
import { LinkButton } from "@/components/ui/button";
import React from "react";

const ProjectPage = () => {
  return (
    <section>
      <header className="flex justify-between items-center">
        <h1 className="font-bold text-2xl">Projects</h1>
        <LinkButton href="/dashboard/projects/add">Add New Project</LinkButton>
      </header>
      <main className="mt-2">
        <ProjectsListing />
      </main>
    </section>
  );
};

export default ProjectPage;
