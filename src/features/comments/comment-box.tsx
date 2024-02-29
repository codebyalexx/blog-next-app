"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { addComment } from "@/src/action/comment.action";
import { MoreVerticalIcon } from "lucide-react";
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
  const [focused, setFocused] = useState(false);

  return (
    <Card className="">
      <CardHeader
        className={cn(
          "hidden flex-row items-center gap-2 p-3 scale-0 transition-all",
          focused ? "flex scale-100" : ""
        )}
      >
        <Avatar className="h-8 w-8">
          <AvatarImage
            src={session?.user?.image || ""}
            alt={session?.user?.name || "Empty avatar"}
          />
          <AvatarFallback>{session?.user?.name || "A"}</AvatarFallback>
        </Avatar>
        {session?.user?.name?.split(" ")[0] || "Unknown"}
      </CardHeader>
      <CardContent className="p-3">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            if (!session || !session.user) signIn();

            startTransition(async () => {
              const res = await addComment({
                postId,
                userId: session?.user?.id || "0",
                message: comment,
              });

              if (res.success) {
                setComment("");
                setFocused(false);
                toast.success("Thanks for your comment! 🤗");
                onCommentAdd(res.data);
              } else {
                toast.error(res.message);
              }
            });
          }}
          className="space-y-2"
        >
          <Textarea
            className="w-full border-none"
            placeholder="Comment..."
            rows={3}
            value={comment}
            onChange={(e) => {
              if (!session || !session.user) signIn();
              setComment(e.target.value);
            }}
            onClick={() => {
              if (!session || !session.user) signIn();
            }}
            onFocus={() => setFocused(true)}
          />
          <div
            className={cn(
              "hidden items-center justify-end gap-2 scale-0 transition-all",
              focused ? "flex scale-100" : ""
            )}
          >
            <Button
              type="button"
              variant={"link"}
              onClick={() => setFocused((v) => !v)}
            >
              Cancel
            </Button>
            <Button disabled={comment.length === 0 || loading} type="submit">
              Comment
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export const CommentBox = ({
  comment,
  className,
}: {
  comment: any;
  className?: string;
}) => {
  return (
    <div className={cn("py-10 space-y-2", className)}>
      <div key={comment.id} className="flex items-center space-x-2">
        <Avatar className="w-8 h-8">
          <AvatarImage src={comment.user.image} alt={comment.user.name} />
          <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col">
            {comment.user.name}{" "}
            <span className="text-sm text-muted-foreground/80 hover:underline cursor-pointer">
              {moment(comment.createdAt).fromNow()}
            </span>
          </div>
          <Button variant={"link"}>
            <MoreVerticalIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <p>{comment.message}</p>
    </div>
  );
};
