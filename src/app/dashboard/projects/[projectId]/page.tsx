import PublicProjectAPI from "@/api/project";
import ProjectCarousel from "@/components/dashboard/projects/project-carousel";
import { Button, LinkButton } from "@/components/ui/button";
import { GithubIcon, HeartIcon, LinkIcon } from "lucide-react";
import Link from "next/link";
import Markdown from "react-markdown";

const UpdatePage = async ({ params }: { params: { projectId: string } }) => {
  const project = await PublicProjectAPI.getProjectById(params.projectId);
  const images = project.images;

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold mb-2">{project.name}</h1>
        <LinkButton
          href={`/dashboard/projects/${params.projectId}/update`}
          variant={"secondary"}
        >
          Update Project
        </LinkButton>
      </div>

      <section className="grid grid-cols-2 gap-5">
        <div>
          <ProjectCarousel images={images} height="lg" />

          <div className="mt-5 flex justify-between">
            <div>
              <Button variant={"outline"}>
                <HeartIcon className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-x-2">
              {project.githubLink && (
                <Link href={project.githubLink} target="_blank">
                  <Button variant={"outline"}>
                    <GithubIcon className="mr-2 h-4 w-4" />
                    View on Github
                  </Button>
                </Link>
              )}

              {project.deployedLink && (
                <Link
                  href={project.deployedLink}
                  target="_blank"
                  className="mt-2"
                >
                  <Button variant={"outline"}>
                    <LinkIcon className="mr-2 h-4 w-4" />
                    View Deployed
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>

        <div>
          <Markdown className={"prose dark:prose-invert"}>
            {project.description}
          </Markdown>
        </div>
      </section>
    </main>
  );
};

export default UpdatePage;
