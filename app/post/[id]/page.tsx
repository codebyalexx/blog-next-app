import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getAuthSession } from "@/lib/auth";
import { CommentSpace } from "@/src/features/comments/comment-space";
import { getPostComments } from "@/src/query/comment.query";
import { getPostData } from "@/src/query/post.query";
import Image from "next/image";
import { redirect } from "next/navigation";
import { PostReader } from "./PostReader";

const Page = async ({ params }: { params: { id: string } }) => {
  const postData = await getPostData(params.id);
  if (!postData) redirect("/");

  const session = await getAuthSession();
  const postComments = await getPostComments({ postId: params.id });

  return (
    <div className="py-4 space-y-4 w-full flex flex-col items-center justify-center">
      <div className="w-full max-w-6xl">
        <Image
          width={1400}
          height={220}
          alt="Post banner image"
          src={postData.imageURL}
          className="w-full h-full max-h-[220px] rounded-lg object-cover"
        />
      </div>
      <div className="w-full max-w-5xl space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">{postData.title}</h1>
          <p className="text-muted-foreground">{postData.description}</p>
          <div className="flex items-center gap-2">
            {postData.tags.split(";").map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
        </div>
        <Separator />
        <div>
          <PostReader data={postData.contents} />
        </div>
      </div>
      <div className="w-full max-w-5xl space-y-4">
        <Separator />

        <CommentSpace
          session={session}
          defaultComments={postComments}
          postId={params.id}
        />

        <Separator />

        <Image
          width={1400}
          height={220}
          alt="Post banner image"
          src={postData.imageURL}
          className="w-full h-[220px] rounded-lg object-cover"
        />
        <p className="text-sm text-muted-foreground italic py-2 text-center">
          Post image
        </p>
      </div>
    </div>
  );
};

export default Page;
