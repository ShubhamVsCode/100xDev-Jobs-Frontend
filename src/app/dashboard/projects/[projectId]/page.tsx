import ProjectShowcase from "@/components/dashboard/projects/project-showcase";

const UpdatePage = ({ params }: { params: { projectId: string } }) => {
  return <ProjectShowcase projectId={params.projectId} isUpdatingProject />;
};

export default UpdatePage;
