import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import Link from "next/link";

import PageWrapper from "@/components/page-wrapper";
import { Title } from "@/components/typography";
import { getAboutMe } from "@/helpers/file-helpers";

export default async function About() {
  const content = await getAboutMe();
  return (
    <PageWrapper>
      <article className="prose max-w-full text-lg text-gray-950 dark:prose-invert dark:text-gray-200">
        <Title as="h1">a little bit more about me</Title>
        <MDXRemote
          components={{
            Link: (props) => <Link {...props} />,
            Image: (props) => <Image {...props} />,
            a: (props) => <a {...props} target="_blank" />,
          }}
          source={content}
        />
      </article>
    </PageWrapper>
  );
}
