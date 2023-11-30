import PublicUserAPI from "@/api/public/user";
import UserPublicProfile from "@/components/user-public-profile";

const UsernamePage = async ({ params }: { params: { username: string } }) => {
  const user = await PublicUserAPI.getUserByUsername(params.username);
  return <UserPublicProfile userWithProfile={user} />;
};

export default UsernamePage;
