import { TooltipProvider } from "@/components/plate-ui/tooltip";
import { getAuthSession } from "@/lib/auth";
import { Writers } from "@/lib/utils";
import { redirect } from "next/navigation";
import WritePage from "./page";

export default async function layout() {
  const session = await getAuthSession();

  if (!session || !Writers.includes(session?.user?.email || "")) redirect("/");

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
