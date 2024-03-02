"use server";

import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Writers } from "../../lib/utils";
import { COMMENT_SELECT } from "../features/comments/comment-utils";
import { getFeatureFlag } from "../features/features-flag/features-utils";

interface IAddComments {
  postId: string;
  userId: string;
  message: string;
}

export const addComment = async ({ postId, userId, message }: IAddComments) => {
  /* Checking feature flag */
  const commentFeatureFlag = await getFeatureFlag("comments");
  if (!commentFeatureFlag.enabled)
    return {
      success: false,
      message: "Comments feature is currently disabled!",
    };

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

export const deleteComment = async (commentId: string) => {
  /* Checking feature flag */
  const commentFeatureFlag = await getFeatureFlag("comments");
  if (!commentFeatureFlag.enabled)
    return {
      success: false,
      message: "Comments feature is currently disabled!",
    };

  /* Retrieving comment */
  const comment = await prisma.comment.findFirst({
    where: {
      id: commentId,
    },
  });

  if (!comment)
    return {
      success: false,
      message: "The target comment cannot be found",
    };

  /* Checking session */
  const session = await getAuthSession();

  if (!session)
    return {
      success: false,
      message: "Unauthorized",
    };

  const isWriter = Writers.includes(session?.user?.email || "");
  const isAuthor = comment.userId === session?.user?.id;

  if (!isWriter || (!isWriter && !isAuthor))
    return {
      success: false,
      message: "Unauthorized",
    };

  /* deleting comment */
  await prisma.comment.delete({
    where: {
      id: commentId,
    },
  });

  return {
    success: true,
  };
};
