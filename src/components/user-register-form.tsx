"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { registerSchema } from "@/lib/validations/auth";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Loader2Icon } from "lucide-react";
import AuthAPI from "@/api/auth";
import useUserStore from "@/store/user-store";

interface UserRegisterFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormData = z.infer<typeof registerSchema>;

export default function UserRegisterForm({
  className,
  ...props
}: UserRegisterFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(registerSchema),
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const router = useRouter();

  const { setUser } = useUserStore();

  async function onSubmit(data: FormData) {
    setIsLoading(true);

    try {
      const response = await AuthAPI.register(data);

      if (response?.token) {
        localStorage.setItem("token", response?.token);
      }

      setUser(response.user);

      router.replace("/");

      toast({
        title: "Registered Successfully",
        variant: "default",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Registration Failed",
        description:
          error?.error?.message ||
          "Your registration request failed. Please try again.",
        // description: JSON.stringify(error, null, 2),
        variant: "destructive",
      });
    }

    setIsLoading(false);
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="grid gap-1">
            <Label className="" htmlFor="name">
              Name
            </Label>
            <Input
              id="name"
              type="text"
              autoComplete="name"
              disabled={isLoading}
              {...register("name")}
            />
            {errors?.name && (
              <p className="px-1 text-xs text-red-600">{errors.name.message}</p>
            )}
          </div>
          <div className="grid gap-1">
            <Label className="" htmlFor="username">
              Username
            </Label>
            <Input
              id="username"
              type="text"
              autoComplete="username"
              disabled={isLoading}
              {...register("username")}
            />
            {errors?.username && (
              <p className="px-1 text-xs text-red-600">
                {errors.username.message}
              </p>
            )}
          </div>
          <div className="grid gap-1">
            <Label className="" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              {...register("email")}
            />
            {errors?.email && (
              <p className="px-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="grid gap-1">
            <Label className="" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              disabled={isLoading}
              {...register("password")}
            />
            {errors?.password && (
              <p className="px-1 text-xs text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>
          <button className={cn(buttonVariants())} disabled={isLoading}>
            {isLoading && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
