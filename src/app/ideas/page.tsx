import PageWrapper from "@/components/page-wrapper";
import PostList from "@/components/post-list";
import { Title } from "@/components/typography";
import { getBlogPostList } from "@/helpers/file-helpers";

export default async function IdeasPage() {
  const posts = await getBlogPostList();
  return (
    <PageWrapper>
      <section>
        <Title as="h1">Ideas 💡</Title>
        <p>
          Longer reflections on software engineering, product management, and
          personal growth. A personal exploration of the subjects {"I'm"}{" "}
          passionate about.
        </p>
      </section>
      <section>
        <PostList posts={posts} />
      </section>
    </PageWrapper>
  );
}
