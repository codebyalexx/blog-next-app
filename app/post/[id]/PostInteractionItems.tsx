"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { toggleLike } from "@/src/action/likes.action";
import { CommentSpace } from "@/src/features/comments/comment-space";
import {
  CopyIcon,
  HeartIcon,
  MessageCircleIcon,
  ShareIcon,
} from "lucide-react";
import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";

export const PostInteractionItems = ({
  postId,
  defaultComments,
  defaultLikes,
  session,
}: {
  postId: string;
  defaultComments: any[];
  defaultLikes: any[];
  session: Session | null;
}) => {
  const [comments, setComments] = useState(defaultComments);
  const handleCommentAdd = (comment: any) =>
    setComments([comment, ...comments]);

  const [likes, setLikes] = useState(defaultLikes);
  const [liked, setLiked] = useState(
    defaultLikes.some((like: any) => like.userId === session?.user?.id) || false
  );

  const handleLike = async () => {
    if (!session || !session.user) return signIn();

    const res = await toggleLike(postId, session?.user?.id);

    if (res.success) {
      const newLiked = res.liked || false;
      setLiked(newLiked);

      if (newLiked) setLikes([...likes, res.data]);
      if (!newLiked)
        setLikes(
          likes.filter((like: any) => like.userId !== session?.user?.id)
        );
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className="flex items-center justify-between text-muted-foreground">
      <div className="flex items-center gap-4">
        <div
          className={cn(
            "flex items-center gap-2 hover:text-foreground cursor-pointer",
            liked ? "text-red-500 hover:text-red-600" : ""
          )}
          onClick={handleLike}
        >
          <HeartIcon className="w-5 h-5" strokeWidth={liked ? 2.5 : 2} />{" "}
          {likes.length}
        </div>
        <CommentSpace
          comments={comments}
          onCommentAdd={handleCommentAdd}
          postId={postId}
          session={session}
        >
          <div className="flex items-center gap-2 hover:text-foreground cursor-pointer">
            <MessageCircleIcon className="w-5 h-5" /> {comments.length}
          </div>
        </CommentSpace>
      </div>
      <div>
        <Popover>
          <PopoverTrigger asChild>
            <div className="flex items-center gap-2 hover:text-foreground cursor-pointer">
              <ShareIcon className="w-5" />
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-fit p-2">
            <Button
              variant={"link"}
              onClick={() => {
                toast.success("Link copied to clipboard!");
                navigator.clipboard.writeText(
                  `https://adventuresbyalexx.com/post/${postId}`
                );
              }}
              className="flex items-center gap-2 outline-none"
            >
              <CopyIcon className="w-4 h-4" /> Copy link
            </Button>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
