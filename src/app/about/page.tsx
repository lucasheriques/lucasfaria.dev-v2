import PageWrapper from "@/components/page-wrapper";
import { Title } from "@/components/typography";

export default async function About() {
  return (
    <PageWrapper>
      <section className="flex flex-col gap-4">
        <Title as="h1">a little bit more about me</Title>
        <p>More to come, soon! </p>
      </section>
    </PageWrapper>
  );
}
