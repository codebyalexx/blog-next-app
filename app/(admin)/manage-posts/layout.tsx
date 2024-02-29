import { getAuthSession } from "@/lib/auth";
import { getPostsFeed } from "@/src/query/post.query";
import Page from "./page";

export const dynamic = "force-dynamic";

export default async function layout() {
  const session = await getAuthSession();

  const posts = await getPostsFeed();

  return <Page session={session} posts={posts} />;
}
