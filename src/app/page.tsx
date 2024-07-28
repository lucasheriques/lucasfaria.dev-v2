import { Metadata } from "next";
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
  const posts = await getLastXBlogPosts();
  const bytes = await getLastXBytePosts();

  const playLittleHomeAnimation = cookies().get("playLittleHomeAnimation");

  return (
    <PageWrapper>
      <section className="flex flex-col gap-4 text-lg">
        <Title as="h1">
          welcome to my{" "}
          <LittleHomeButton
            displayAnimation={!!playLittleHomeAnimation?.value}
          />{" "}
          on the web! {"I'm"} Lucas
        </Title>
        <p>
          {"I'm"} a software engineer with a passion for impactful technology
          and building{" "}
          <SparklesText rainbow>
            <GradientText>magical</GradientText>
          </SparklesText>{" "}
          experiences.
        </p>
        <p>
          When not coding, {"I'll"} probably be spending time with my fiancée
          and our pets, cooking, reading, or enjoying some time in nature. 🍂
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

      <section className="grid gap-4" id="projects">
        <Title as="h2">projects 👨‍💻</Title>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Card
            title="📰 Dev na Gringa"
            link="https://devnagringa.substack.com?utm_source=lucasfaria.dev"
          >
            A newsletter for brazilian engineers who wants to grow their careers
            and work for international companies.
          </Card>
          <Card
            title="👾 emojinx"
            link="https://emojinx.lucasfaria.dev"
            expandable
            expandedContent={
              <p>Made with React, TypeScript and Convex (WebSockets).</p>
            }
          >
            A multiplayer memory matching game. Features real-time gameplay and
            timed turns.
          </Card>
          <Card
            title="🧾 mockinvoice"
            link="https://tools.lucasfaria.dev/v1/invoices/fake"
            expandable
            expandedContent={
              <div className="space-y-2">
                <p>
                  REST API to easily mock real
                  <span className="italic">ish</span> invoices.
                </p>
                <p>
                  Supports these query parameters: paymentMethods, vendorName,
                  accountNumber, numberOfItems, invoiceDate, dueDate, currency.
                </p>
                <p>Made with Go, Gotenberg and Docker.</p>
              </div>
            }
          >
            I work daily with invoices, and was tired to create a fake invoice
            every now and then.
          </Card>
        </div>
      </section>
    </PageWrapper>
  );
}
