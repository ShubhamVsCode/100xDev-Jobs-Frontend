import Projects from "./projects";
import Sidebar from "./sidebar";
import { UserWithProfileType } from "@/types/user";

const UserPublicProfile = ({
  userWithProfile,
}: {
  userWithProfile: UserWithProfileType;
}) => {
  return (
    <div className="grid grid-cols-4 h-[86vh]">
      <Sidebar userWithProfile={userWithProfile} />
      <Projects />
    </div>
  );
};

export default UserPublicProfile;
