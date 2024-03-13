import { getAllPosts } from "@/src/query/post.query";
import { PostManager } from "./PostManager";

export default async function Page() {
  const posts = await getAllPosts();

  return (
    <>
      <PostManager posts={posts.data || []} />
    </>
  );
}
