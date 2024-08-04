import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

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
  const t = await getTranslations("writing");
  const posts = await getBytesList();
  return (
    <PageWrapper>
      <section>
        <Title as="h1">{t("bytesTitle")}</Title>
        <p>{t("bytesDescription")}</p>
      </section>
      <section>
        <PostList posts={posts} />
      </section>
    </PageWrapper>
  );
}
