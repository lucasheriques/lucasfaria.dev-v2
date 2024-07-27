import { Metadata } from "next";

import PageWrapper from "@/components/page-wrapper";
import PostList from "@/components/post-list";
import { Title } from "@/components/ui/typography";
import { SITE_TITLE } from "@/helpers/constants";
import { getBlogPostList, getBytesList } from "@/helpers/file-helpers";

export const metadata: Metadata = {
  title: `Bytes | ${SITE_TITLE}`,
  description:
    "Brief notes on code, tools, and tips. Quick insights from my daily tech encounters.",
};

export default async function WritingPage() {
  const ideas = await getBlogPostList();
  const bytes = await getBytesList();
  return (
    <PageWrapper>
      <section>
        <Title as="h1">ideas 💡</Title>
        <p className="pb-4">
          Longer reflections on software engineering, product management, and
          personal growth. A personal exploration of the subjects {"I'm"}{" "}
          passionate about.
        </p>
        <PostList posts={ideas} />
      </section>
      <section>
        <Title as="h1">bytes ⚡</Title>
        <p className="pb-4">
          Brief notes on code, tools, and tips. Quick insights from my daily
          tech encounters.
        </p>
        <PostList posts={bytes} />
      </section>
    </PageWrapper>
  );
}
