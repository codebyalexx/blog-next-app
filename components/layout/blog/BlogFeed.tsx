import { getPostsFeed } from "@/src/query/post.query";
import { BentoFeed } from "./BentoFeed";

export const BlogFeed = async () => {
  const posts = await getPostsFeed();

  return (
    <div className="w-full max-w-6xl p-4 space-y-4">
      <h2 className="text-3xl font-bold">Blog Feed</h2>
      <BentoFeed posts={posts} />
    </div>
  );
};
