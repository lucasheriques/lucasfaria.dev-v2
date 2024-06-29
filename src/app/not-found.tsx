import NotFound from "@/components/errors/not-found";
import PageWrapper from "@/components/page-wrapper";

export const metadata = {
  title: "404: Not Found",
};

export default function NotFoundPage() {
  return (
    <PageWrapper>
      <NotFound />
    </PageWrapper>
  );
}
