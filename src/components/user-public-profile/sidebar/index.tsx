import ProfileHead from "./profile-head";
import {
  AtSignIcon,
  GithubIcon,
  InboxIcon,
  LinkedinIcon,
  TwitterIcon,
  User2Icon,
} from "lucide-react";
import { LinkButton } from "@/components/ui/button";
import { UserWithProfileType } from "@/types/user";
import { redirect } from "next/navigation";

const Sidebar = ({
  userWithProfile,
}: {
  userWithProfile: UserWithProfileType;
}) => {
  if (!userWithProfile) {
    redirect("/");
  }

  return (
    <aside className="col-span-1 rounded-lg bg-[#02060E] ">
      <ProfileHead
        name={userWithProfile?.name || ""}
        imgUrl={userWithProfile?.profile?.picture || ""}
        // designation={userWithProfile?.profile?.designation || ""}
      />
      <div className="px-8 py-8">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <InboxIcon className="w-4 h-4" />
            <span className="text-sm">{userWithProfile?.email}</span>
          </div>
          {/* <div className="flex items-center gap-4">
            <PhoneIcon className="w-4 h-4" />
            <span className="text-sm">{userWithProfile?.phone}</span>
          </div> */}
          <div className="flex items-center gap-4">
            <AtSignIcon className="w-4 h-4" />
            <span className="text-sm">{userWithProfile?.username}</span>
          </div>
        </div>

        <div className="my-6 border-t border-dashed border-white/20" />

        <div>
          <div className="grid gap-3">
            {userWithProfile?.profile?.projects?.length && (
              <p className="font-semibol flex items-center rounded-full hover:shadow-inner hover:shadow-white/10 duration-150">
                <span className="grid place-content-center text-lg shadow-inner shadow-white/10 w-12 h-12 border rounded-full animated-stats">
                  {userWithProfile?.profile?.projects?.length}
                </span>
                <span className="mt-1 ml-2 text-sm text-white/50">
                  {userWithProfile?.profile?.projects?.length > 1
                    ? "Projects"
                    : "Project"}
                </span>
              </p>
            )}
            {/* {userWithProfile?.profile?.blogs?.length && (
              <p className="font-semibol flex items-center rounded-full hover:shadow-inner hover:shadow-white/10 duration-150">
                <span className="grid place-content-center text-lg shadow-inner shadow-white/10 w-12 h-12 border rounded-full animated-stats">
                  {userWithProfile?.profile?.blogs?.length || 0}
                </span>
                <span className="mt-1 ml-2 text-sm text-white/50">Blogs</span>
              </p>
            )} */}
            {/* {userWithProfile?.profile?.contribution?.length && (
              <p className="font-semibol flex items-center rounded-full hover:shadow-inner hover:shadow-white/10 duration-150">
                <span className="grid place-content-center text-lg shadow-inner shadow-white/10 w-12 h-12 border rounded-full animated-stats">
                  {userWithProfile?.profile?.contribution?.length || 0}
                </span>
                <span className="mt-1 ml-2 text-sm text-white/50">
                  Open Source Contribution
                </span>
              </p>
            )} */}
          </div>
        </div>

        <div className="my-6 border-t border-dashed border-white/20" />

        <div className="flex items-center justify-between">
          {userWithProfile?.profile?.social?.github && (
            <LinkButton
              variant={"outline"}
              href={userWithProfile?.profile?.social?.github}
            >
              <GithubIcon />
            </LinkButton>
          )}

          {userWithProfile?.profile?.social?.linkedin && (
            <LinkButton
              variant={"outline"}
              href={userWithProfile?.profile?.social?.linkedin}
            >
              <LinkedinIcon />
            </LinkButton>
          )}

          {userWithProfile?.profile?.social?.portfolio && (
            <LinkButton
              variant={"outline"}
              href={userWithProfile?.profile?.social?.portfolio}
            >
              <User2Icon />
            </LinkButton>
          )}

          {userWithProfile?.profile?.social?.twitter && (
            <LinkButton
              variant={"outline"}
              href={userWithProfile?.profile?.social?.twitter}
            >
              <TwitterIcon />
            </LinkButton>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
