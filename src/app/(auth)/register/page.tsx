import { Metadata } from "next";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import UserRegiserForm from "@/components/user-register-form";

export const metadata: Metadata = {
  title: "Register",
  description: "Create a new account",
};

export default function RegisterPage() {
  return (
    <div className="relative container flex h-screen w-screen flex-col items-center justify-center">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-4 top-4 md:left-8 md:top-4"
        )}
      >
        <>
          <ChevronLeftIcon className="mr-2 h-4 w-4" />
          Back
        </>
      </Link>
      <main className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px] border px-10 py-8 rounded-md">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Create an Account
          </h1>
        </div>
        <UserRegiserForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          <span>Already have an account? </span>
          <Link
            href="/login"
            className="hover:text-brand underline underline-offset-4"
          >
            Login here
          </Link>
        </p>
      </main>
    </div>
  );
}
