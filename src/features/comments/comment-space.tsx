"use client";

import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Session } from "next-auth";
import { ReactNode, useState } from "react";
import { CommentBox, CommentPostBox } from "./comment-box";

export const CommentSpace = ({
  children,
  defaultComments,
  postId,
  session,
}: {
  children: ReactNode;
  defaultComments: any[];
  postId: string;
  session: Session | null;
}) => {
  const [comments, setComments] = useState(defaultComments);
  const handleCommentAdd = (comment: any) =>
    setComments([...comments, comment]);

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="p-0">
        <SheetHeader className="p-4">
          <SheetTitle>Comments ({comments.length})</SheetTitle>
        </SheetHeader>
        <div className="">
          <div className="p-4 py-8">
            <CommentPostBox
              session={session}
              postId={postId}
              onCommentAdd={handleCommentAdd}
            />
          </div>

          <Separator />

          <div className="p-4">
            {comments.length === 0 && (
              <p className="italic">There is no comments at the moment...</p>
            )}

            {comments.map((comment: any) => (
              <CommentBox
                key={comment.id}
                comment={comment}
                className={
                  comments.indexOf(comment) === comments.length - 1
                    ? ""
                    : "border-b border-b-border"
                }
              />
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
