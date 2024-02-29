"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CommentSpace } from "@/src/features/comments/comment-space";
import {
  CopyIcon,
  HeartIcon,
  MessageCircleIcon,
  ShareIcon,
} from "lucide-react";
import { Session } from "next-auth";
import { toast } from "sonner";

export const PostInteractionItems = ({
  postId,
  comments,
  onCommentAdd,
  onCommentRemove,
  likes,
  liked,
  onLike,
  session,
}: {
  postId: string;
  comments: any[];
  onCommentAdd: (comment: any) => void;
  onCommentRemove: (commentId: string) => void;
  likes: any[];
  liked: boolean;
  onLike: (e: any) => void;
  session: Session | null;
}) => {
  return (
    <div className="flex items-center justify-between text-muted-foreground">
      <div className="flex items-center gap-4">
        <div
          className={cn(
            "flex items-center gap-2 hover:text-foreground cursor-pointer",
            liked ? "text-red-500 hover:text-red-600" : ""
          )}
          onClick={onLike}
        >
          <HeartIcon className="w-5 h-5" strokeWidth={liked ? 2.5 : 2} />{" "}
          {likes.length}
        </div>
        <CommentSpace
          comments={comments}
          onCommentAdd={onCommentAdd}
          onCommentRemove={onCommentRemove}
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
