import { Metadata } from "next";

import PageWrapper from "@/components/page-wrapper";
import PostList from "@/components/post-list";
import { Title } from "@/components/ui/typography";
import { SITE_TITLE } from "@/helpers/constants";
import { getBytesList } from "@/helpers/file-helpers";

export const metadata: Metadata = {
  title: `Bytes | ${SITE_TITLE}`,
  description:
    "Brief notes on code, tools, and tips. Quick insights from my daily tech encounters.",
};

export default async function BytesPage() {
  const posts = await getBytesList();
  return (
    <PageWrapper>
      <section>
        <Title as="h1">bytes ⚡</Title>
        <p>
          Brief notes on code, tools, and tips. Quick insights from my daily
          tech encounters.
        </p>
      </section>
      <section>
        <PostList posts={posts} />
      </section>
    </PageWrapper>
  );
}
