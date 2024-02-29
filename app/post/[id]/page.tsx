import { Separator } from "@/components/ui/separator";
import { getAuthSession } from "@/lib/auth";
import { getPostComments } from "@/src/query/comment.query";
import { getPostData } from "@/src/query/post.query";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { PostInteractionItems } from "./PostInteractionItems";
import { PostReader } from "./PostReader";

const Page = async ({ params }: { params: { id: string } }) => {
  const postData = await getPostData(params.id);
  if (!postData) redirect("/");

  const session = await getAuthSession();
  const postComments = await getPostComments({ postId: params.id });

  return (
    <div className="w-full max-w-2xl space-y-6 py-4 flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl space-y-8">
        <Image
          width={1400}
          height={180}
          alt="Post banner image"
          src={postData.imageURL}
          className="w-full h-full max-h-[180px] rounded-lg object-cover"
        />
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">{postData.title}</h1>
          <p className="text-muted-foreground">{postData.description}</p>
        </div>

        <div className="space-y-3">
          <Separator />
          <PostInteractionItems
            postId={params.id}
            defaultComments={postComments}
            session={session}
          />
          <Separator />
        </div>

        <PostReader data={postData.contents} />

        <div className="py-16 space-y-8">
          <div className="flex items-center gap-3">
            {postData.tags.split(";").map((tag) => (
              <Link
                key={tag}
                className="text-gray-500 bg-gray-200 dark:text-white dark:bg-black rounded-full text-sm p-2 px-4 w-fit capitalize cursor-pointer"
                href={`/tag/${tag}`}
              >
                {tag}
              </Link>
            ))}
          </div>
          <PostInteractionItems
            postId={params.id}
            defaultComments={postComments}
            session={session}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
