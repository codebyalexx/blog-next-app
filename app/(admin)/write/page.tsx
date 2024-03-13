import { TooltipProvider } from "@/components/plate-ui/tooltip";
import { getAuthSession } from "@/lib/auth";
import { PostEditor } from "@/src/features/write/PostEditor";

const Page = async () => {
  const session = await getAuthSession();

  return (
    <div className="w-full max-w-[1336px] space-y-4">
      <TooltipProvider
        disableHoverableContent
        delayDuration={500}
        skipDelayDuration={0}
      >
        <PostEditor session={session} />
      </TooltipProvider>
    </div>
  );
};

export default Page;
