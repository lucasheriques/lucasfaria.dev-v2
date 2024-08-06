import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";

import { PortugueseContentBanner } from "@/components/banners";
import { LittleHomeButton } from "@/components/little-home-button";
import PageWrapper from "@/components/page-wrapper";
import PostList from "@/components/post-list";
import ProjectList from "@/components/project-list";
import { SparklesText } from "@/components/text-animations";
import { Title } from "@/components/ui/typography";
import { GradientText } from "@/components/ui/typography/gradient-text";
import { SITE_DESCRIPTION, SITE_TITLE } from "@/helpers/constants";
import { getLastXBlogPosts, getLastXBytePosts } from "@/helpers/file-helpers";

export const metadata: Metadata = {
  title: `${SITE_TITLE} | Product-minded software engineer`,
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
            <GradientText>{t("magicalExperiences")}</GradientText>
          </SparklesText>
          .
        </p>
        <p>{t("whenNotCoding")}</p>
        <p>{t("aboutWriting")}</p>
      </section>

      <PortugueseContentBanner />

      <section className="grid gap-4">
        <Title as="h2">{t("latestIdeas")} 💡</Title>
        <PostList posts={posts} />
      </section>

      <section className="grid gap-4">
        <Title as="h2">{t("latestBytes")} ⚡</Title>
        <PostList posts={bytes} />
      </section>

      <section className="grid gap-6" id="projects">
        <Title as="h2">
          {t("projects")}{" "}
          <span className="text-amber-600 dark:text-blue-400">👨‍💻</span>
        </Title>
        <ProjectList />
      </section>
    </PageWrapper>
  );
}
