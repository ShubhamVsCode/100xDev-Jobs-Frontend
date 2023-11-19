import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid lg:grid-cols-6 min-h-[calc(100vh-65px)]">
      <DashboardSidebar className="hidden lg:block" />
      <div className="col-span-3 lg:col-span-5 lg:border-l px-10 py-6">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
