import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Title } from "@/components/typography";
import { SparklesWhimsy } from "@/components/whimsies";
import { getBlogPostList } from "@/helpers/file-helpers";

export default async function Home() {
  const posts = await getBlogPostList();
  return (
    <div className="grid gap-y-16">
      <div className="flex flex-col gap-4">
        <h1 className="dark:text-emerald-400 text-xl font-semibold">
          welcome to my little 🏡 on the web! I'm Lucas
        </h1>
        <p>
          I'm a software engineer with a passion for impactful technology and
          building <SparklesWhimsy>magical</SparklesWhimsy> experiences.
        </p>
        <p>
          Whenever I'm not coding, I'll probably be spending time with my
          fiancée and our <span className="line-through">children</span> pets,
          cooking, reading, or enjoying some time in nature. 🍂
        </p>
        <p>
          In this page, you'll find some of my thoughts and projects. I divide
          my thoughts between two: ideas and bytes. Ideas are longer, more
          thought-out pieces, while bytes are shorter and more frequent.
        </p>
      </div>

      <div className="grid gap-4">
        <Title as="h2">💡 latest ideas</Title>
        {posts.map((post) => (
          <Link href={`${post.slug}`} prefetch={true} key={post.slug}>
            <h2 className="flex items-center gap-4">
              {post.title} <ArrowRight size={16} />
            </h2>
          </Link>
        ))}
      </div>

      <div className="grid gap-4">
        <Title as="h2">⚡ latest bytes</Title>
        {posts.map((post) => (
          <Link href={`${post.slug}`} prefetch={true} key={post.slug}>
            <h2 className="flex items-center gap-4">
              {post.title} <ArrowRight size={16} />
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
