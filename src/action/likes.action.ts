"use server";

import { prisma } from "@/lib/prisma";
import { getAuthSession } from "../../lib/auth";

export const toggleLike = async (postId: string, userId: string) => {
  /* checking session */
  const session = await getAuthSession();
  if (!session || userId !== session?.user?.id)
    return {
      success: false,
      message: "Unauthorized",
    };

  /* checking if already liked */
  let res;
  try {
    res = await prisma.like.findMany({
      where: {
        postId,
        userId: session?.user?.id,
      },
    });
  } catch (e) {
    console.error(e);
    return {
      success: false,
      message: "An error has occurred while trying to perform your request",
    };
  }

  try {
    /* unlike */
    if (res.length > 0) {
      await prisma.like.deleteMany({
        where: {
          postId,
          userId: session?.user?.id,
        },
      });
      return {
        success: true,
        liked: false,
      };
    } else {
      /* like */
      const res = await prisma.like.create({
        data: {
          postId,
          userId: session?.user?.id,
        },
      });
      return {
        success: true,
        liked: true,
        data: res,
      };
    }
  } catch (e) {
    console.error(e);
    return {
      success: false,
      message: "An error has occurred while trying to perform your request",
    };
  }
};
