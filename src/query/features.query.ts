"use server";

import { getFeaturesData } from "../features/features-flag/features-utils";

export const getFeatures = async () => {
  /* It's getting file json */
  let features;
  try {
    features = await getFeaturesData();
  } catch (e) {
    console.error(e);
    return {
      success: false,
      message: "An error has occurred while trying to retrieve config file",
    };
  }

  /* It's returning configuration file data */
  return {
    success: true,
    data: features,
  };
};
