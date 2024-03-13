import { TooltipProvider } from "@/components/plate-ui/tooltip";
import { getAuthSession } from "@/lib/auth";
import { PostEditor } from "@/src/features/write/PostEditor";
import { getPostData } from "@/src/query/post.query";

const Page = async ({ params }: { params: { postId: string } }) => {
  const session = await getAuthSession();

  const postData = await getPostData(params.postId);

  return (
    <div className="w-full max-w-[1336px] space-y-4">
      <TooltipProvider
        disableHoverableContent
        delayDuration={500}
        skipDelayDuration={0}
      >
        <PostEditor session={session} data={postData} />
      </TooltipProvider>
    </div>
  );
};

export default Page;
