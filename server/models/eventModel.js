import fs from "fs-extra";
import path from "path";

const dataFilePath = path.resolve("data", "events.json");

fs.ensureFileSync(dataFilePath);

export const readEvents = async () => {
  try {
    const data = await fs.readJson(dataFilePath);
    return data;
  } catch (err) {
    return [];
  }
};

export const writeEvents = async (events) => {
  await fs.writeJson(dataFilePath, events, { spaces: 2 });
};
