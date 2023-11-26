import PublicProjectAPI from "@/api/project";
import ProjectCarousel from "@/components/dashboard/projects/project-carousel";
import { Button, LinkButton } from "@/components/ui/button";
import { GithubIcon, HeartIcon, LinkIcon, Share2Icon } from "lucide-react";
import Link from "next/link";
import Markdown from "react-markdown";

const ProjectShowcase = async ({
  projectId,
  isUpdatingProject,
}: {
  projectId: string;
  isUpdatingProject?: boolean;
}) => {
  const project = await PublicProjectAPI.getProjectById(projectId);
  const images = project.images;

  return (
    <main>
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-semibold">{project.name}</h1>
        {isUpdatingProject && (
          <LinkButton
            href={`/dashboard/projects/${projectId}/update`}
            variant={"secondary"}
          >
            Update Project
          </LinkButton>
        )}
      </div>

      <section className="grid md:grid-cols-2 gap-5">
        <div>
          <ProjectCarousel
            images={images}
            height="lg"
            showThumbs={images?.length && images?.length > 1 ? true : false}
            fullWidth
          />

          <div className="mt-5 flex justify-between">
            <div className="space-x-2">
              <Button variant={"outline"}>
                <HeartIcon className="mr-2 h-4 w-4" />
                {Number(project.likes || 0)}
              </Button>
              <Button variant={"outline"}>
                <Share2Icon className="mr-2 h-4 w-4" />
                Share
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

          {project.userId?.username && (
            <div className="mt-5">
              <Link href={`/user/${project.userId?.username}`}>
                Built By:{" "}
                <span className="underline text-blue-400">
                  {project.userId?.username}
                </span>
              </Link>
            </div>
          )}
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

export default ProjectShowcase;
