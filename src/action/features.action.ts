"use server";

import { getAuthSession } from "@/lib/auth";
import { Writers } from "@/lib/utils";
import {
  getFeaturesData,
  saveFeaturesData,
} from "../features/features-flag/features-utils";

export const toggleFeature = async (feature: string) => {
  /* It's checking session */
  const session = await getAuthSession();

  if (!session || !Writers.includes(session?.user?.email || ""))
    return {
      success: false,
      message: "Unauthorized",
    };

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

  /* It's checking that features exists */
  const valid = Object.keys(features).includes(feature.toLowerCase());
  if (!valid)
    return {
      success: false,
      message: "This feature does not exists",
    };

  /* It's toggling feature and returning */
  try {
    await saveFeaturesData({
      ...features,
      [feature.toLowerCase()]: !features[feature.toLowerCase()],
    });
    return {
      success: true,
    };
  } catch (e) {
    console.log(e);
    return {
      success: false,
      message: "An error has occurred while saving features configuration",
    };
  }
};
