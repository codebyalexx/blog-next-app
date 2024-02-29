"use server";

import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Writers } from "@/lib/utils";

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

export const getAllPosts = async () => {
  /* Checking auth session */
  const session = await getAuthSession();

  if (!session || !session?.user)
    return {
      success: false,
      message: "Unauthorized1",
    };

  if (!Writers.includes(session?.user?.email || ""))
    return {
      success: false,
      message: "Unauthorized2",
    };

  /* getting posts */
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
    orderBy: {
      releasedAt: "desc",
    },
  });
  return {
    success: true,
    data: res,
  };
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
    orderBy: {
      releasedAt: "desc",
    },
  });
  return res.filter((post) => new Date() >= post.releasedAt);
};

export const getPostData = async (id: string) => {
  const res = await prisma?.post.findFirst({
    where: {
      id,
    },
  });

  return res;
};
