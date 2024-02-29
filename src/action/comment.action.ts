"use server";

import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { COMMENT_SELECT } from "../features/comments/comment-utils";

interface IAddComments {
  postId: string;
  userId: string;
  message: string;
}

export const addComment = async ({ postId, userId, message }: IAddComments) => {
  /* Checking auth session */
  const session = await getAuthSession();

  if (!session || !session?.user)
    return {
      success: false,
      message: "You musts be logged in to post comments",
    };

  if (session?.user.id !== userId)
    return {
      success: false,
      message: "Unauthorized",
    };

  /* Checking post exists */
  const postExists = await prisma.post.findFirst({
    where: {
      id: postId,
    },
    select: {
      id: true,
    },
  });

  if (!postExists)
    return {
      success: false,
      message: "The target post doesn't exist on the database",
    };

  /* insert in db */
  try {
    const res = await prisma.comment.create({
      data: {
        postId,
        userId,
        message,
      },
      select: COMMENT_SELECT,
    });
    return {
      success: true,
      data: res,
    };
  } catch (e) {
    console.error(e);
    return {
      success: false,
      message: "An error has occurred while trying to add your comment",
    };
  }
};
