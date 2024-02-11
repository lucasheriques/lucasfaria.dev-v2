import { getBlogPostList } from "@/helpers/file-helpers";

export default async function Home() {
  const posts = await getBlogPostList();

  console.log({ posts });
  return <div>hello</div>;
}
