import { LittleHomeButton } from "@/components/little-home-button";
import PageWrapper from "@/components/page-wrapper";
import PostList from "@/components/post-list";
import { GradientText, Title } from "@/components/typography";
import { SparklesWhimsy } from "@/components/whimsies";
import { getLastXBlogPosts, getLastXBytePosts } from "@/helpers/file-helpers";

export default async function Home() {
  const posts = await getLastXBlogPosts();
  const bytes = await getLastXBytePosts();
  return (
    <PageWrapper>
      <section className="flex flex-col gap-4">
        <Title as="h1">
          welcome to my <LittleHomeButton /> on the web! {"I'm"} Lucas
        </Title>
        <p>
          {"I'm"} a software engineer with a passion for impactful technology
          and building{" "}
          <SparklesWhimsy rainbow>
            <GradientText>magical</GradientText>
          </SparklesWhimsy>{" "}
          experiences.
        </p>
        <p>
          When not coding, {"I'll"} probably be spending time with my fiancée
          and our <span className="line-through">children</span> pets, cooking,
          reading, or enjoying some time in nature. 🍂
        </p>
        <p>
          In this page, {"you'll"} find some of my thoughts and projects. I
          divide my thoughts between two: ideas and bytes. Ideas are longer,
          more thought-out pieces, while bytes are shorter and more frequent.
        </p>
      </section>

      <section className="grid gap-4">
        <Title as="h2">latest ideas 💡</Title>
        <PostList posts={posts} />
      </section>

      <section className="grid gap-4">
        <Title as="h2">latest bytes ⚡</Title>
        <PostList posts={bytes} />
      </section>
    </PageWrapper>
  );
}
