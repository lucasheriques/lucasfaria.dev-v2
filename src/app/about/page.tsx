import { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { MDXRemote } from "next-mdx-remote/rsc";

import PageWrapper from "@/components/page-wrapper";
import { SITE_TITLE } from "@/helpers/constants";
import { getAboutMe } from "@/helpers/file-helpers";
import COMPONENT_MAP from "@/helpers/mdx-components";

export const metadata: Metadata = {
  title: `About me | ${SITE_TITLE}`,
  description:
    "Software engineer with a passion for impactful technology and magical digital experiences. Loves coding, cooking, reading, nature, and animals.",
};

export default async function About() {
  const lang = await getLocale();
  const content = await getAboutMe(lang as "en" | "pt-BR");
  return (
    <PageWrapper>
      <article className="prose max-w-full text-lg text-gray-950 dark:prose-invert dark:text-gray-200">
        <MDXRemote components={COMPONENT_MAP} source={content} />
      </article>
    </PageWrapper>
  );
}
