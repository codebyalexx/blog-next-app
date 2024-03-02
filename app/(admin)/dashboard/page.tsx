import { getAuthSession } from "@/lib/auth";
import { getUsers } from "@/src/action/moderation.action";
import { getAllComments } from "@/src/query/comment.query";
import { CommentsTab } from "./_/CommentsTab";
import { OverviewTab } from "./_/OverviewTab";
import { UsersTab } from "./_/UsersTab";

const Page = async () => {
  const session = await getAuthSession();
  const users = await getUsers();
  const comments = await getAllComments();

  return (
    <>
      <OverviewTab comments={comments} />
      <UsersTab defaultUsers={users} />
      <CommentsTab defaultComments={comments} session={session} />
    </>
  );
};
export default Page;
