import ProjectShowcase from "@/components/dashboard/projects/project-showcase";

const ProjectPage = ({ params }: { params: { projectId: string } }) => {
  return <ProjectShowcase projectId={params.projectId} />;
};

export default ProjectPage;
