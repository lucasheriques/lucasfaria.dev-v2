import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";

import { LittleHomeButton } from "@/components/little-home-button";
import PageWrapper from "@/components/page-wrapper";
import PostList from "@/components/post-list";
import { SparklesText } from "@/components/text-animations";
import Card from "@/components/ui/card";
import { Title } from "@/components/ui/typography";
import { GradientText } from "@/components/ui/typography/gradient-text";
import { SITE_DESCRIPTION, SITE_TITLE } from "@/helpers/constants";
import { getLastXBlogPosts, getLastXBytePosts } from "@/helpers/file-helpers";

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
};

export default async function Home() {
  const t = await getTranslations("home");
  const posts = await getLastXBlogPosts();
  const bytes = await getLastXBytePosts();

  const playLittleHomeAnimation = cookies().get("playLittleHomeAnimation");

  return (
    <PageWrapper>
      <section className="flex flex-col gap-4 text-lg">
        <Title as="h1">
          {t("welcome")}{" "}
          <LittleHomeButton
            displayAnimation={!!playLittleHomeAnimation?.value}
          />{" "}
          {t("onTheWeb")} {t("imLucas")}
        </Title>
        <p>
          {t("softwareEngineer")}{" "}
          <SparklesText rainbow>
            <GradientText>{t("magical")}</GradientText>
          </SparklesText>{" "}
          {t("experiences")}
        </p>
        <p>{t("whenNotCoding")}</p>
        <p>{t("aboutWriting")}</p>
      </section>

      <section className="grid gap-4">
        <Title as="h2">{t("latestIdeas")}</Title>
        <PostList posts={posts} />
      </section>

      <section className="grid gap-4">
        <Title as="h2">{t("latestBytes")}</Title>
        <PostList posts={bytes} />
      </section>

      <section className="grid gap-4" id="projects">
        <Title as="h2">{t("projects")}</Title>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Card
            title={t("devNaGringa.title")}
            link="https://devnagringa.substack.com?utm_source=lucasfaria.dev"
          >
            {t("devNaGringa.description")}
          </Card>
          <Card
            title={t("emojinx.title")}
            link="https://emojinx.lucasfaria.dev"
            expandable
            expandedContent={<p>{t("emojinx.expandedContent")}</p>}
          >
            {t("emojinx.description")}
          </Card>
          <Card
            title={t("mockinvoice.title")}
            link="https://tools.lucasfaria.dev/v1/invoices/fake"
            expandable
            expandedContent={
              <div className="space-y-2">
                <p>{t("mockinvoice.expandedContent1")}</p>
                <p>{t("mockinvoice.expandedContent2")}</p>
                <p>{t("mockinvoice.expandedContent3")}</p>
              </div>
            }
          >
            {t("mockinvoice.description")}
          </Card>
        </div>
      </section>
    </PageWrapper>
  );
}
