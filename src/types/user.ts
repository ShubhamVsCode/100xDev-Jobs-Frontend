import { z } from "zod";
import { ProfileSchema } from "@/lib/validations/auth";

export const UserWithProfileSchema = z.object({
  _id: z.string().optional(),
  name: z.string(),
  username: z
    .string()
    .min(4, "Username must be at least 4 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Invalid username format"),
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  profile: ProfileSchema.optional(),
});

export type UserWithProfileType = z.infer<typeof UserWithProfileSchema>;
