"use client";

import { Session } from "next-auth";
import { useState } from "react";
import { CommentBox, CommentPostBox } from "./comment-box";

export const CommentSpace = ({
  defaultComments,
  postId,
  session,
}: {
  defaultComments: any[];
  postId: string;
  session: Session | null;
}) => {
  const [comments, setComments] = useState(defaultComments);
  const handleCommentAdd = (comment: any) =>
    setComments([...comments, comment]);

  return (
    <>
      <h2 className="text-3xl font-bold">Comments</h2>

      <CommentPostBox
        session={session}
        postId={postId}
        onCommentAdd={handleCommentAdd}
      />

      {comments.length === 0 && (
        <p className="italic">There is no comments at the moment...</p>
      )}

      {comments.map((comment: any) => (
        <CommentBox key={comment.id} comment={comment} />
      ))}
    </>
  );
};
