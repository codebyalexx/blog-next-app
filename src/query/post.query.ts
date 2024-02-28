"use server";

import { prisma } from "@/lib/prisma";

export const getPostsFeed = async () => {
  const res = await prisma?.post.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      userId: true,
      releasedAt: true,
      duration: true,
    },
  });
  return res;
};

export const getPostData = async (id: string) => {
  const res = await prisma?.post.findFirst({
    where: {
      id,
    },
  });

  return res;
};
