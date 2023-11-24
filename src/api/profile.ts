import {
  ProfileType,
  ProjectType,
  SkillType,
  UserType,
} from "@/lib/validations/auth";
import { get, post, put } from "./index";

class ProfileAPI {
  static async addProject(data: ProjectType) {
    return await post("/profile/project/add", data);
  }

  static async getProjects() {
    return await get("/profile/projects");
  }

  static async addSkills(data: SkillType) {
    return await post("/profile/skills/add", { skills: data });
  }
  static async getAllSkills() {
    return await get("/profile/skills/all");
  }

  static async updateProfile(data: ProfileType) {
    return await put("/profile/update", data);
  }
  static async getProfile() {
    return await get("/profile");
  }

  static async verifyMe() {
    return await get("/profile/verify");
  }
}

export default ProfileAPI;
