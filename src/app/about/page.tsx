import { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import Link from "next/link";

import PageWrapper from "@/components/page-wrapper";
import { Title } from "@/components/typography";
import { SITE_TITLE } from "@/helpers/constants";
import { getAboutMe } from "@/helpers/file-helpers";

export const metadata: Metadata = {
  title: `About me | ${SITE_TITLE}`,
  description:
    "Software engineer with a passion for impactful technology and magical digital experiences. Loves coding, cooking, reading, nature, and animals.",
};

export default async function About() {
  const content = await getAboutMe();
  return (
    <PageWrapper>
      <article className="prose max-w-full text-lg text-gray-950 dark:prose-invert dark:text-gray-200">
        <Title as="h1">hi! {"I'm"} Lucas Faria, nice to meet you. 👋</Title>
        <MDXRemote
          components={{
            Link: (props) => <Link {...props} />,
            Image: (props) => <Image {...props} alt={props.alt} />,
            a: (props) => <a {...props} target="_blank" />,
          }}
          source={content}
        />
      </article>
    </PageWrapper>
  );
}
