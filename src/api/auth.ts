import {
  LoginCredentials,
  RegisterCredentials,
  UserType,
} from "@/lib/validations/auth";
import { get, post } from "./index";

type UserWithToken = { user: UserType } & { token: string };

class AuthAPI {
  static async login(data: LoginCredentials): Promise<UserWithToken> {
    return await post("/auth/login", data);
  }

  static async register(data: RegisterCredentials): Promise<UserWithToken> {
    return await post("/auth/register", data);
  }

  static async me(): Promise<{ user: UserType }> {
    return await get("/auth/me");
  }
}

export default AuthAPI;
