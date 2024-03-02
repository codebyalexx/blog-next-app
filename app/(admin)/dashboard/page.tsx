import { getUsers } from "@/src/action/moderation.action";
import { OverviewTab } from "./_/OverviewTab";
import { UsersTab } from "./_/UsersTab";

const Page = async () => {
  const users = await getUsers();

  return (
    <>
      <OverviewTab />
      <UsersTab defaultUsers={users} />
    </>
  );
};
export default Page;
