import { ProfileType, SkillType, UserType } from "@/lib/validations/auth";
import { get, post, put } from "./index";

class ProfileAPI {
  static async addSkills(data: SkillType) {
    return await post("/profile/skills/add", { skills: data });
  }
  static async getAllSkills() {
    return await get("/profile/skills/all");
  }

  static async updateProfile(data: ProfileType) {
    return await put("/profile/update", data);
  }
}

export default ProfileAPI;
