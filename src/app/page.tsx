import { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { cookies } from "next/headers";
import Link from "next/link";

import { PortugueseContentBanner } from "@/components/banners";
import { LittleHomeButton } from "@/components/little-home-button";
import PageWrapper from "@/components/page-wrapper";
import PostList from "@/components/post-list";
import ProjectList from "@/components/project-list";
import { SparklesText } from "@/components/text-animations";
import Button from "@/components/ui/buttons/button";
import { Title } from "@/components/ui/typography";
import { GradientText } from "@/components/ui/typography/gradient-text";
import { SITE_DESCRIPTION, SITE_TITLE } from "@/helpers/constants";
import { getLastXBlogPosts, getLastXBytePosts } from "@/helpers/file-helpers";

const TALKS_BR = [
  {
    title:
      "Produto vs. Plataforma: Será que a separação entre frontend e backend faz sentido para sua carreira?",
    slug: "https://www.youtube.com/watch?v=WzHoMcLUQ4w",
    language: "pt-BR",
    target: "_blank",
  },
  {
    title:
      "Como trabalhar em empresas Americanas: Um guia para Devs Brasileiros",
    slug: "https://www.youtube.com/watch?v=PYMADF4hXtI",
    language: "pt-BR",
    target: "_blank",
  },
];

const TALKS_EN = [
  {
    title:
      "Product vs. Platform: Does separating frontend and backend make sense for your career?",
    slug: "https://www.youtube.com/watch?v=WzHoMcLUQ4w",
    language: "pt-BR",
    target: "_blank",
  },
  {
    title: "How to work in American companies: A guide for Brazilian Devs",
    slug: "https://www.youtube.com/watch?v=PYMADF4hXtI",
    language: "pt-BR",
    target: "_blank",
  },
];

export const metadata: Metadata = {
  title: `${SITE_TITLE} | Product-minded software engineer`,
  description: SITE_DESCRIPTION,
};

export default async function Home() {
  const t = await getTranslations("home");
  const posts = await getLastXBlogPosts();
  const bytes = await getLastXBytePosts();

  const locale = await getLocale();

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

      <section className="flex flex-col gap-4">
        <Title as="h2">{t("latestIdeas")} 💡</Title>
        <PostList posts={posts} />
      </section>

      <section className="flex flex-col gap-4">
        <Title as="h2">{t("latestBytes")} ⚡</Title>
        <PostList posts={bytes} />
        <Button variant="linktree" as={Link} href="/writing">
          {t("seeAllPosts")}
        </Button>
      </section>

      <section className="flex flex-col gap-4" id="talks">
        <Title as="h2">{t("talks")} 💬</Title>
        {locale === "pt-BR" ? (
          <PostList posts={TALKS_BR} />
        ) : (
          <PostList posts={TALKS_EN} />
        )}
      </section>

      <section className="flex flex-col gap-6" id="projects">
        <Title as="h2">{t("projects")} 👨‍💻</Title>
        <ProjectList />
      </section>
    </PageWrapper>
  );
}
