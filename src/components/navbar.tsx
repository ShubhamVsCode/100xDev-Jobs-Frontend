"use client";
import AuthAPI from "@/api/auth";
import useUserStore from "@/store/user-store";
import Link from "next/link";
import React, { useCallback, useEffect } from "react";
import { Button, buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { LogOutIcon } from "lucide-react";

const Navbar = () => {
  const { user, setUser, removeUser } = useUserStore();

  const getUser = useCallback(async () => {
    try {
      const response = await AuthAPI.me();
      if (response?.user) {
        setUser(response.user);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    removeUser();
  }, []);

  useEffect(() => {
    if (!user) {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        if (token) {
          getUser();
        }
      }
    }
  }, []);
  return (
    <nav className="flex items-center justify-between px-5 sm:px-10 md:px-20 py-3 border-b">
      <Link href="/">100xDev Jobs</Link>
      {user !== null ? (
        <div className="flex items-center gap-5">
          <Link
            href="/dashboard"
            className={cn(buttonVariants({ variant: "ghost" }))}
          >
            Dashboard
          </Link>
          <Button onClick={logout}>
            <LogOutIcon className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div>
          <Link
            href="/login"
            className={cn(buttonVariants({ variant: "ghost" }))}
          >
            Login
          </Link>
          <Link
            href="/register"
            className={cn(buttonVariants({ variant: "ghost" }))}
          >
            Register
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
