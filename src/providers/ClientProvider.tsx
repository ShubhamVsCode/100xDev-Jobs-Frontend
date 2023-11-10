"use client";

import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

const ClientProvider = ({ children, ...props }: ThemeProviderProps) => {
  return (
    <>
      <ThemeProvider {...props}>
        <Toaster />
        {children}
      </ThemeProvider>
    </>
  );
};

export default ClientProvider;
