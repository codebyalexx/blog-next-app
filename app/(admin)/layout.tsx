import { getAuthSession } from "@/lib/auth";
import { Writers } from "@/lib/utils";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const Page = async ({ children }: { children: ReactNode }) => {
  const session = await getAuthSession();
  if (!session || !Writers.includes(session?.user?.email || "")) redirect("/");
  return <>{children}</>;
};

export default Page;
