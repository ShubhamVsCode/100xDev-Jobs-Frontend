import PublicUserAPI from "@/api/public/user";

const UsernamePage = async ({ params }: { params: { username: string } }) => {
  const user = await PublicUserAPI.getUserByUsername(params.username);

  return (
    <div>
      <h1>{user.username}</h1>
    </div>
  );
};

export default UsernamePage;
