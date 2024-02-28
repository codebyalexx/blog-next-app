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
