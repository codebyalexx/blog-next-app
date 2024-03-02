"use client";

import { TabsContent } from "@/components/ui/tabs";
import { CommentBox } from "@/src/features/comments/comment-box";
import { Session } from "next-auth";
import { useState } from "react";

export const CommentsTab = ({
  defaultComments,
  session,
}: {
  defaultComments: any;
  session: Session | null;
}) => {
  const [comments, setComments] = useState<any[]>(defaultComments);
  const handleCommentRemove = (commentId: string) =>
    setComments(comments.filter((comment: any) => comment.id !== commentId));
  const handleUserRestrict = (userId: string) =>
    setComments(comments.filter((comment: any) => comment.userId !== userId));

  return (
    <TabsContent value="comments">
      <ul>
        {comments.map((comment: any) => (
          <li key={comment.id}>
            <CommentBox
              session={session}
              comment={comment}
              onCommentRemove={handleCommentRemove}
              onUserRestrict={handleUserRestrict}
            />
          </li>
        ))}
      </ul>
    </TabsContent>
  );
};
