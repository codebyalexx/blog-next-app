"use server";

import { prisma } from "@/lib/prisma";

export const getLatestPostId = async () => {
  const res = await prisma.post.findFirst({
    select: {
      id: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return res?.id || null;
};

export const getRandomPostId = async () => {
  const posts = await getPostsFeed();
  const index = Math.round(Math.random() * (posts.length - 1));
  return posts[index]?.id || null;
};

export const getPostsFeed = async () => {
  const res = await prisma?.post.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      userId: true,
      releasedAt: true,
      duration: true,
      tags: true,
      imageURL: true,
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
