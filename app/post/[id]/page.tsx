import { getAuthSession } from "@/lib/auth";
import { getPostComments } from "@/src/query/comment.query";
import { getPostLikes } from "@/src/query/likes.query";
import { getPostData } from "@/src/query/post.query";
import { redirect } from "next/navigation";
import { PostPageClientSide } from "./client-side";

export default async function Page({ params }: { params: { id: string } }) {
  const postData = await getPostData(params.id);
  if (!postData) redirect("/");

  const session = await getAuthSession();
  const postComments = await getPostComments(params.id);
  const postLikes = await getPostLikes(params.id);

  const data = {
    ...postData,
    comments: postComments,
    likes: postLikes,
  };

  return <PostPageClientSide post={data} session={session} />;
}
