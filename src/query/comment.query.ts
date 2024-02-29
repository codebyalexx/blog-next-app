"use server";

import { prisma } from "@/lib/prisma";
import { COMMENT_SELECT } from "../features/comments/comment-utils";

export const getPostComments = async (postId: string) => {
  const postComments = await prisma.comment.findMany({
    where: {
      postId,
    },
    select: COMMENT_SELECT,
    orderBy: {
      createdAt: "desc",
    },
  });

  return postComments;
};
