import { TooltipProvider } from "@/components/plate-ui/tooltip";
import { getAuthSession } from "@/lib/auth";
import WritePage from "./page";

export default async function layout() {
  const session = await getAuthSession();

  return (
    <div className="w-full max-w-[1336px] space-y-4">
      <TooltipProvider
        disableHoverableContent
        delayDuration={500}
        skipDelayDuration={0}
      >
        <WritePage session={session} />
      </TooltipProvider>
    </div>
  );
}
