import PageWrapper from "@/components/page-wrapper";
import { GradientText, Title } from "@/components/typography";
import { SparklesWhimsy } from "@/components/whimsies";

export default function About() {
  <PageWrapper>
    <section className="flex flex-col gap-4">
      <Title as="h1">
        welcome to my little 🏡<span className="sr-only">home</span> on the web!{" "}
        {"I'm"} Lucas
      </Title>
      <p>
        {"I'm"} a software engineer with a passion for impactful technology and
        building{" "}
        <SparklesWhimsy rainbow>
          <GradientText>magical</GradientText>
        </SparklesWhimsy>{" "}
        experiences.
      </p>
      <p>
        When not coding, {"I'll"} probably be spending time with my fiancée and
        our <span className="line-through">children</span> pets, cooking,
        reading, or enjoying some time in nature. 🍂
      </p>
      <p>
        In this page, {"you'll"} find some of my thoughts and projects. I divide
        my thoughts between two: ideas and bytes. Ideas are longer, more
        thought-out pieces, while bytes are shorter and more frequent.
      </p>
      <p>More to come, soon! </p>
    </section>
  </PageWrapper>;
}
