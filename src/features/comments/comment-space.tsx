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
import { ReactNode } from "react";
import { CommentBox, CommentPostBox } from "./comment-box";

export const CommentSpace = ({
  children,
  comments,
  onCommentAdd,
  onCommentRemove,
  onUserRestrict,
  postId,
  session,
}: {
  children: ReactNode;
  comments: any[];
  onCommentAdd: (comment: any) => void;
  onCommentRemove: (comment: any) => void;
  onUserRestrict: (userId: string) => void;
  postId: string;
  session: Session | null;
}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="p-0 overflow-y-scroll">
        <SheetHeader className="p-4">
          <SheetTitle>Comments ({comments.length})</SheetTitle>
        </SheetHeader>
        <div className="">
          <div className="p-4 py-8">
            <CommentPostBox
              session={session}
              postId={postId}
              onCommentAdd={onCommentAdd}
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
                session={session}
                onCommentRemove={onCommentRemove}
                onUserRestrict={onUserRestrict}
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
