import { getAuthSession } from "@/lib/auth";
import { getAllPosts } from "@/src/query/post.query";
import Page from "./page";

export const dynamic = "force-dynamic";

export default async function layout() {
  const session = await getAuthSession();

  const posts = await getAllPosts();

  console.log(posts);

  return <Page session={session} posts={posts.data || []} />;
}
