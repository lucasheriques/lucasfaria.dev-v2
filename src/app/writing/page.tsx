import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import PageWrapper from "@/components/page-wrapper";
import PostList from "@/components/post-list";
import { Title } from "@/components/ui/typography";
import { SITE_TITLE } from "@/helpers/constants";
import { getBlogPostList, getBytesList } from "@/helpers/file-helpers";

export const metadata: Metadata = {
  title: `Writing | ${SITE_TITLE}`,
  description:
    "Brief notes on code, tools, and tips. Quick insights from my daily tech encounters.",
};

export default async function WritingPage() {
  const t = await getTranslations("writing");
  const ideas = await getBlogPostList();
  const bytes = await getBytesList();
  return (
    <PageWrapper>
      <section>
        <Title as="h1">{t("ideasTitle")}</Title>
        <p className="pb-4">{t("ideasDescription")}</p>
        <PostList posts={ideas} />
      </section>
      <section>
        <Title as="h1">{t("bytesTitle")}</Title>
        <p className="pb-4">{t("bytesDescription")}</p>
        <PostList posts={bytes} />
      </section>
    </PageWrapper>
  );
}
