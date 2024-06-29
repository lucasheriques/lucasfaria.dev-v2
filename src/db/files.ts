import fs from "fs/promises";
import path from "path";
import "server-only";

export async function getFile(file: string) {
  const filePath = path.join(process.cwd(), file);
  const fileContents = await fs.readFile(filePath, "utf8");

  return fileContents;
}

export async function getFilesInDirectory(folder: string) {
  const directory = path.join(process.cwd(), folder);
  const files = await fs.readdir(directory);
  return files;
}
