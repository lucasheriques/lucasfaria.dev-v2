import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import PageWrapper from "@/components/page-wrapper";
import PostList from "@/components/post-list";
import { Title } from "@/components/ui/typography";
import { SITE_TITLE } from "@/helpers/constants";
import { getBlogPostList } from "@/helpers/file-helpers";

export const metadata: Metadata = {
  title: `Ideas | ${SITE_TITLE}`,
  description:
    "Longer reflections on software engineering, product management, and personal growth. A personal exploration of the subjects I'm passionate about.",
};

export default async function IdeasPage() {
  const t = await getTranslations("writing");
  const ideas = await getBlogPostList();
  return (
    <PageWrapper>
      <section>
        <Title as="h1">{t("ideasTitle")}</Title>
        <p>{t("ideasDescription")}</p>
      </section>
      <section>
        <PostList posts={ideas} />
      </section>
    </PageWrapper>
  );
}
