import {
  ProfileType,
  ProjectType,
  SkillType,
  UserType,
} from "@/lib/validations/auth";
import { get, post, put } from "./index";
import { publicGet } from "./public";
import { Octokit } from "@octokit/core";

class ProfileAPI {
  // Projects
  static async addProject(data: ProjectType) {
    return await post("/profile/project/add", data);
  }

  static async getProjects() {
    return await get("/profile/projects");
  }

  // Skills
  static async addSkills(data: SkillType) {
    return await post("/profile/skills/add", { skills: data });
  }
  static async getAllSkills() {
    return await get("/profile/skills/all");
  }

  // Profile
  static async updateProfile(data: ProfileType) {
    return await put("/profile/update", data);
  }
  static async getProfile() {
    return await get("/profile");
  }

  static async verifyMe() {
    return await get("/profile/verify");
  }

  // Readme
  static async getReadme(githubUrl: string): Promise<string> {
    const octokit = new Octokit({ auth: "" });

    const urlParts = githubUrl.replace("https://github.com/", "").split("/");
    const owner = urlParts[0];
    const repo = urlParts[1];

    const response = await octokit.request("GET /repos/{owner}/{repo}/readme", {
      owner,
      repo,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });
    // Decode the base64-encoded content
    const readmeContentBase64 = response.data.content;
    const decodedReadmeContent = Buffer.from(
      readmeContentBase64,
      "base64"
    ).toString("utf-8");

    // Return the decoded README content
    return decodedReadmeContent;
  }
}

export default ProfileAPI;
