import { publicGet } from ".";
import { UserWithProfileType } from "@/types/user";

class PublicUserAPI {
  static async getUserByUsername(
    username: string
  ): Promise<UserWithProfileType> {
    return await publicGet(`/user/${username}`);
  }
}

export default PublicUserAPI;
