import ProjectForm from "@/components/dashboard/projects/project-form";
import ThumbnailUploader from "@/components/dashboard/projects/thumbnail-uploader";

const ProjectAddPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold">Add Project</h1>
      <h3 className="text-sm mt-2 text-slate-500">
        Upload project which will boost your visibility
      </h3>
      <main className="grid grid-cols-2 pt-3 gap-5 ">
        <ProjectForm />
        <ThumbnailUploader />
      </main>
    </div>
  );
};

export default ProjectAddPage;
