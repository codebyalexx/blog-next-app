"use server";

import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Writers } from "@/lib/utils";

interface CreatePostProps {
  userId: string;
  title: string;
  description: string;
  imageURL: string;
  tags: string;
  contents: string;
  duration?: number;
  releasedAt: Date;
}

export const createPost = async (data: CreatePostProps) => {
  const session = await getAuthSession();

  /* Auth check */

  if (!session)
    return {
      success: false,
      message: "Unauthorized",
    };

  if (!Writers.includes(session?.user?.email || ""))
    return {
      success: false,
      message: "Unauthorized",
    };

  if (data.userId !== session?.user?.id)
    return {
      success: false,
      message: "Unauthorized",
    };

  /* Data validation */
  // TODO : here!!!!

  /* Insert */
  try {
    const insert = await prisma.post.create({
      data,
    });
    return {
      success: true,
      postId: insert.id,
    };
  } catch (e) {
    console.log(e);
    return {
      success: false,
      message: "An unknown error has happened!",
    };
  }
};

export const editPost = async (postId: string, data: CreatePostProps) => {
  const session = await getAuthSession();

  /* Auth check */

  if (!session)
    return {
      success: false,
      message: "Unauthorized",
    };

  if (!Writers.includes(session?.user?.email || ""))
    return {
      success: false,
      message: "Unauthorized",
    };

  if (data.userId !== session?.user?.id)
    return {
      success: false,
      message: "Unauthorized",
    };

  /* Check that post exists */
  try {
    const existsReq = await prisma.post.findFirst({
      where: { id: postId },
    });

    if (!existsReq)
      return {
        success: false,
        message: "The target posts cannot be found in the database!",
      };
  } catch (e) {
    console.error(e);
    return {
      success: false,
      message: "An error has occurred while trying to retrieve post data!",
    };
  }

  /* It's editing the post */
  try {
    await prisma.post.update({
      where: {
        id: postId,
      },
      data,
    });

    return { success: true };
  } catch (e) {
    console.error(e);
    return {
      success: false,
      message:
        "An error has occurred while trying to edit post in the database!",
    };
  }
};

export const deletePost = async (postId: string) => {
  const session = await getAuthSession();

  /* Auth check */

  if (!session)
    return {
      success: false,
      message: "Unauthorized",
    };

  if (!Writers.includes(session?.user?.email || ""))
    return {
      success: false,
      message: "Unauthorized",
    };

  /* Deletion */
  try {
    await prisma.post.delete({
      where: {
        id: postId,
      },
    });

    return {
      success: true,
    };
  } catch (e) {
    console.error(e);
    return {
      success: false,
      message:
        "An unknown error has occurred while trying to perform your request!",
    };
  }
};
