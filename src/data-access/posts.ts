import matter from "gray-matter";

import { getFile } from "@/db/files";

export async function getPost(slug: string, type: string) {
  const postContent = await getFile(`content/${type}/${slug}.mdx`);
  return matter(postContent);
}

export function getPosts(type: string) {}
