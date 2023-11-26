import { ProjectType } from "@/lib/validations/auth";
import { publicGet } from "./public";

class PublicProjectAPI {
  static async getProjectById(projectId: string): Promise<ProjectType> {
    return await publicGet("/project/" + projectId);
  }
}

export default PublicProjectAPI;
