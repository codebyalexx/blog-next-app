import { getAuthSession } from "@/lib/auth";
import { getUsers } from "@/src/action/moderation.action";
import { getAllComments } from "@/src/query/comment.query";
import { getFeatures } from "@/src/query/features.query";
import { CommentsTab } from "./_/CommentsTab";
import { FeaturesTab } from "./_/FeaturesTab";
import { OverviewTab } from "./_/OverviewTab";
import { UsersTab } from "./_/UsersTab";

export const dynamic = "force-dynamic";

const Page = async () => {
  const session = await getAuthSession();
  const users = await getUsers();
  const comments = await getAllComments();
  const features = await getFeatures();

  return (
    <>
      <OverviewTab comments={comments} />
      <UsersTab defaultUsers={users} />
      <CommentsTab defaultComments={comments} session={session} />
      <FeaturesTab features={features} />
    </>
  );
};
export default Page;
