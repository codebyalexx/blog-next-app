"use client";

import { Separator } from "@/components/ui/separator";
import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { PostInteractionItems } from "./PostInteractionItems";
import { PostReader } from "./PostReader";

const Page = ({ post, session }: { post: any; session: Session | null }) => {
  const [comments, setComments] = useState(post.comments);
  const handleCommentAdd = (comment: any) =>
    setComments([comment, ...comments]);

  const [likes, setLikes] = useState(post.likes);
  const handleLikeAdd = (like: any) => setLikes([like, ...likes]);
  const handleLikeRemove = (likeId: any) =>
    setLikes(likes.filter((like: any) => like.id !== likeId));

  const postInteractionsItems = (
    <PostInteractionItems
      postId={post.id}
      session={session}
      defaultComments={comments}
      defaultLikes={likes}
    />
  );

  return (
    <div className="w-full max-w-2xl space-y-6 py-4 flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl space-y-8">
        <Image
          width={1400}
          height={180}
          alt="Post banner image"
          src={post.imageURL}
          className="w-full h-full max-h-[180px] rounded-lg object-cover"
        />
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">{post.title}</h1>
          <p className="text-muted-foreground">{post.description}</p>
        </div>

        <div className="space-y-3">
          <Separator />
          {postInteractionsItems}
          <Separator />
        </div>

        <PostReader data={post.contents} />

        <div className="py-16 space-y-8">
          <div className="flex flex-wrap items-center gap-3">
            {post.tags.split(";").map((tag: any) => (
              <Link
                key={tag}
                className="text-gray-500 bg-gray-200 dark:text-white dark:bg-black rounded-full text-sm p-2 px-4 w-fit capitalize cursor-pointer"
                href={`/tag/${tag}`}
              >
                {tag}
              </Link>
            ))}
          </div>
          {postInteractionsItems}
        </div>
      </div>
    </div>
  );
};

export default Page;
