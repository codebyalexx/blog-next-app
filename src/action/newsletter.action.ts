"use server";
import { prisma } from "@/lib/prisma";
import { getFeatureFlag } from "../features/features-flag/features-utils";

async function isInNewsletter({ email, id }: { email?: string; id?: string }) {
  /* It's checking if the mail is in the newsletter */
  if (email) {
    const res = await prisma.newsletterUser.findFirst({
      where: {
        email,
      },
    });

    if (!res) return false;
    return true;
  }

  /* It's checking if the id is in the newsletter */
  if (id) {
    const res = await prisma.newsletterUser.findFirst({
      where: {
        id,
      },
    });

    if (!res) return false;
    return true;
  }

  /* Returns false if nothing was provided */
  return false;
}

export async function registerToNewsletter(email: string) {
  /* Checking feature flag */
  const newsletterFeatureFlag = await getFeatureFlag("newsletter");
  if (!newsletterFeatureFlag.enabled)
    return {
      success: false,
      message: "Newsletter feature is currently disabled!",
    };

  const isRegistered = await isInNewsletter({ email });

  if (isRegistered)
    return {
      success: false,
      message: "You have already joined my newsletter!",
    };

  try {
    await prisma.newsletterUser.create({
      data: {
        email,
      },
    });
  } catch (e) {
    console.log(e);
    return {
      success: false,
      message: "An error has occurred while adding you to newsletter!",
    };
  }

  return {
    success: true,
  };
}

export async function unregisterFromNewsletter(id: string) {
  const isRegistered = await isInNewsletter({ id });
  if (!isRegistered)
    return {
      success: false,
      message: "You're not registered to newsletter",
    };

  try {
    await prisma.newsletterUser.deleteMany({
      where: {
        id,
      },
    });
  } catch (e) {
    console.log(e);
    return {
      success: false,
      message: "An error has occurred while removing you from newsletter!",
    };
  }

  return {
    success: true,
  };
}
