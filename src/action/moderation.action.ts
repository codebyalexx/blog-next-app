"use server";

import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Writers } from "@/lib/utils";

export const getUsers = async () => {
  /* It's checking session */

  const session = await getAuthSession();

  if (!session || !Writers.includes(session?.user?.email || ""))
    return {
      success: false,
      message: "Unauthorized",
    };

  /* It's retrieving data */
  const res = await prisma.user.findMany();
  return {
    success: true,
    data: res,
  };
};

export const deleteUser = async (userId: string) => {
  /* It's checking session */

  const session = await getAuthSession();

  if (!session || !Writers.includes(session?.user?.email || ""))
    return {
      success: false,
      message: "Unauthorized",
    };

  /* It's retrieving user data */
  const user = await prisma.user.findFirst({
    where: { id: userId },
  });

  if (!user)
    return {
      success: false,
      message: "User not found on the database",
    };

  /* Cancel if user is a writer */
  if (Writers.includes(user.email || ""))
    return {
      success: false,
      message: "Cannot delete a Writer account manually!",
    };

  /* Deleting user and returning */
  await prisma.user.delete({ where: { id: userId } });
  return {
    success: true,
  };
};

export const toggleUserRestriction = async (
  userId: string,
  reason?: string
) => {
  /* It's checking session */
  const session = await getAuthSession();

  if (!session || !Writers.includes(session?.user?.email || ""))
    return {
      success: false,
      message: "Unauthorized",
    };

  /* It's fetching user on db */
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });

  if (!user)
    return {
      success: false,
      message: "The user cannot be found",
    };

  /* Cancel if user is a writer */
  if (Writers.includes(user.email || ""))
    return {
      success: false,
      message: "Cannot restrict a Writer account manually!",
    };

  /* It's deleting user comments */
  await prisma.comment.deleteMany({
    where: {
      userId,
    },
  });

  /* It's toggling restriction */
  const update = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      restricted: !user.restricted,
    },
  });

  /* TODO : send mail to user */

  /* return success */
  return {
    success: true,
    restricted: update.restricted,
  };
};
