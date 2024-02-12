import PostList from "@/components/post-list";
import { Title } from "@/components/typography";
import { getBytesList } from "@/helpers/file-helpers";

export default async function BytesPage() {
  const posts = await getBytesList();
  return (
    <div className="grid gap-y-12">
      <section>
        <Title as="h1">Bytes ⚡</Title>
        <p>
          Brief notes on code, tools, and tips. Quick insights from my daily
          tech encounters.
        </p>
      </section>
      <section>
        <PostList posts={posts} />
      </section>
    </div>
  );
}
