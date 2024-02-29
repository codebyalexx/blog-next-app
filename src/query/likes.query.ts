"use server";

import { prisma } from "@/lib/prisma";

export const getPostLikes = async (postId: string) => {
  const res = await prisma.like.findMany({
    where: {
      postId,
    },
  });

  return res;
};
