import { cn } from "@/lib/utils";
import { FileCode2, GitBranchPlus } from "lucide-react";
import SidebarLink from "./dashboard-sidebar-links";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DashboardSidebar({ className }: SidebarProps) {
  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Account
          </h2>
          <div className="space-y-1 gap-2">
            <SidebarLink
              href="/dashboard/projects"
              Icon={<FileCode2 className="w-4 h-4" />}
              label={"Projects"}
            />
            <SidebarLink
              href="/dashboard/skills"
              Icon={<GitBranchPlus className="w-4 h-4" />}
              label={"Skills"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
