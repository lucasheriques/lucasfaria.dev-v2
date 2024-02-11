import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

export async function getBlogPostList() {
  const directory = path.join(process.cwd(), "content");
  const files = await fs.readdir(directory);
  const blogPosts = await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(directory, file);
      const fileContents = await fs.readFile(filePath, "utf8");
      const { data } = matter(fileContents);
      return data;
    })
  );
  return blogPosts;
}
