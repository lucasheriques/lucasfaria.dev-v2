import { Title } from "@/components/typography";
import { getBlogPostList } from "@/helpers/file-helpers";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const posts = await getBlogPostList();
  return (
    <div>
      <div className="pb-16 flex flex-col gap-4">
        <h1 className="dark:text-emerald-400 text-xl font-semibold">
          welcome to my little 🏡 on the web! I'm Lucas
        </h1>
        <p>
          I'm a software engineer with a passion for impactful technology and
          building magical experiences. ✨
        </p>
        <p>
          Whenever I'm not coding, I'll probably be spending time with my
          fiancée and our <span className="line-through">children</span> pets,
          cooking, reading, or enjoying some time in nature. 🍂
        </p>
        <p>
          In this page, you'll find some of my thoughts and projects. I divide
          my thoughts between two: ideas and bytes. Ideas are longer, more
          thought-out pieces, while bytes are shorter, more frequent thoughts.
        </p>
      </div>

      <div className="grid gap-4">
        <Title as="h2">ideas</Title>
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
