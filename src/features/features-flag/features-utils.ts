import { readFile, writeFile } from "fs/promises";
import path from "path";

export const getFeaturesFilePath = () => {
  return path.join(
    process.cwd(),
    "src/features/features-flag/",
    "features.json"
  );
};

export const getFeaturesData = async () => {
  const buffer = await readFile(getFeaturesFilePath());
  return JSON.parse(buffer.toString());
};

export const saveFeaturesData = async (data: any) => {
  await writeFile(getFeaturesFilePath(), JSON.stringify(data));
};
