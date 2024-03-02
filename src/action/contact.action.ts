"use server";

import { prisma } from "@/lib/prisma";
import { getFeatureFlag } from "../features/features-flag/features-utils";

interface IProps {
  name: string;
  email: string;
  message: string;
}

export const sendContactMessage = async (data: IProps) => {
  /* Checking feature flag */
  const contactFeatureFlag = await getFeatureFlag("contact");
  if (!contactFeatureFlag.enabled)
    return {
      success: false,
      message: "Contact form feature is currently disabled!",
    };

  try {
    await prisma.contactMessage.create({
      data,
    });
    return {
      success: true,
    };
  } catch (e) {
    console.error(e);
    return {
      success: false,
      message: "An unknown error has occurred while perfoming your request!",
    };
  }
};
