"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Loader } from "@/components/ui/loader";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Writers, cn } from "@/lib/utils";
import { addComment, deleteComment } from "@/src/action/comment.action";
import { toggleUserRestriction } from "@/src/action/moderation.action";
import {
  FlagIcon,
  MoreVerticalIcon,
  ShieldAlertIcon,
  ShieldIcon,
  TrashIcon,
} from "lucide-react";
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
            if (!session || !session.user) return signIn();

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
              if (!session || !session.user) return signIn();
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
  session,
  className,
  onCommentRemove,
  onUserRestrict,
}: {
  comment: any;
  session: Session | null;
  className?: string;
  onCommentRemove: (commentId: string) => void;
  onUserRestrict: (userId: string) => void;
}) => {
  const [deleteLoading, startDeleteTransition] = useTransition();
  const handleDeleteComment = async () => {
    startDeleteTransition(async () => {
      const res = await deleteComment(comment.id);

      if (res.success) {
        toast.success("Successfully deleted comment!");
        onCommentRemove(comment.id);
      } else {
        toast.error(res.message);
      }
    });
  };

  const [restrictLoading, startRestrictTransition] = useTransition();
  const handleUserRestrict = async () => {
    startRestrictTransition(async () => {
      const res = await toggleUserRestriction(comment.userId);

      if (res.success) {
        toast.success("Successfully restricted user!");
        onUserRestrict(comment.userId);
      } else {
        toast.error(res.message);
      }
    });
  };

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
          <Popover>
            <PopoverTrigger asChild>
              <Button variant={"link"}>
                <MoreVerticalIcon className="w-4 h-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-fit p-2">
              {comment.userId === session?.user?.id && (
                <Button
                  variant={"ghost"}
                  className="flex items-center gap-2 w-full"
                  disabled={deleteLoading}
                  onClick={handleDeleteComment}
                >
                  {deleteLoading ? (
                    <Loader />
                  ) : (
                    <>
                      <TrashIcon className="w-4 h-4" /> Delete
                    </>
                  )}
                </Button>
              )}
              <Button
                variant={"ghost"}
                className="flex items-center gap-2 w-full"
                disabled
              >
                <FlagIcon className="w-4 h-4" /> Report comment
              </Button>
              {Writers.includes(session?.user?.email) && (
                <>
                  <Separator className="my-2" />
                  <Button
                    variant={"ghost"}
                    className="flex items-center gap-2 w-full"
                    disabled={deleteLoading}
                    onClick={handleDeleteComment}
                  >
                    {deleteLoading ? (
                      <Loader />
                    ) : (
                      <>
                        <ShieldAlertIcon className="w-4 h-4" /> Delete comment
                      </>
                    )}
                  </Button>
                  <Button
                    variant={"ghost"}
                    className="flex items-center gap-2 w-full"
                    disabled={restrictLoading}
                    onClick={handleUserRestrict}
                  >
                    {deleteLoading ? (
                      <Loader />
                    ) : (
                      <>
                        <ShieldIcon className="w-4 h-4" /> Restrict user
                      </>
                    )}
                  </Button>
                </>
              )}
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <p>{comment.message}</p>
    </div>
  );
};
