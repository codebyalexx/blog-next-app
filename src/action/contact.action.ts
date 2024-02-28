"use server";

import { prisma } from "@/lib/prisma";

interface IProps {
  name: string;
  email: string;
  message: string;
}

export const sendContactMessage = async (data: IProps) => {
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
