"use client";

import { Toaster } from "@/components/ui/toaster";

const ClientProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Toaster />
      {children}
    </>
  );
};

export default ClientProvider;
