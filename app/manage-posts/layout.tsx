import { getAuthSession } from "@/lib/auth";
import { Writers } from "@/lib/utils";
import { getPostsFeed } from "@/src/query/post.query";
import { redirect } from "next/navigation";
import Page from "./page";

export const dynamic = "force-dynamic";

export default async function layout() {
  const session = await getAuthSession();

  if (!session || !Writers.includes(session?.user?.email || "")) redirect("/");

  const posts = await getPostsFeed();

  return <Page session={session} posts={posts} />;
}
