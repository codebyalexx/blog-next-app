"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addComment } from "@/src/action/comment.action";
import moment from "moment";
import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

export const CommentPostBox = ({
  session,
  postId,
  onCommentAdd,
}: {
  session: Session | null;
  postId: string;
  onCommentAdd: (commentData: any) => void;
}) => {
  const [comment, setComment] = useState("");
  const [loading, startTransition] = useTransition();

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();

        startTransition(async () => {
          const res = await addComment({
            postId,
            userId: session?.user?.id || "0",
            message: comment,
          });

          if (res.success) {
            setComment("");
            toast.success("Thanks for your comment! 🤗");
            onCommentAdd(res.data);
          } else {
            toast.error(res.message);
          }
        });
      }}
      className="flex items-center gap-2"
    >
      <Avatar>
        <AvatarImage
          src={session?.user?.image || ""}
          alt={session?.user?.name || "Empty avatar"}
        />
        <AvatarFallback>{session?.user?.name || "A"}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col items-end w-full space-y-1">
        <Input
          className="w-full"
          placeholder="Comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onClick={() => {
            if (!session || !session.user) signIn();
          }}
        />
      </div>
      <Button variant={"outline"} disabled={comment.length === 0 || loading}>
        Comment
      </Button>
    </form>
  );
};

export const CommentBox = ({ comment }: { comment: any }) => {
  return (
    <div
      key={comment.id}
      className="flex items-center space-x-2 pb-2 border-b border-b-border"
    >
      <Avatar>
        <AvatarImage src={comment.user.image} alt={comment.user.name} />
        <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <p className="">
          {comment.user.name}{" "}
          <span className="text-sm text-muted-foreground/80">
            • {moment(comment.createdAt).format("D MMMM - kk:mm:ss")}
          </span>
        </p>
        <p className="text-muted-foreground text-sm">{comment.message}</p>
      </div>
    </div>
  );
};
