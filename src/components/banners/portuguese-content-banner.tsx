import { useLocale } from "next-intl";

import { LocalStorageDismissableBanner } from "../ui/banner";
import { socials } from "@/helpers/constants";

export default function PortugueseContentBanner() {
  const locale = useLocale();

  if (locale !== "pt-BR") {
    return null;
  }

  return (
    <LocalStorageDismissableBanner
      intent="info"
      localStorageKey="portugueseContentBanner"
    >
      <div>
        Meu conteúdo aqui é apenas em inglês.{" "}
        <a
          href={socials.brNewsletter}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold underline hover:text-blue-600"
        >
          Veja meu conteúdo em português aqui
        </a>
        .
      </div>
    </LocalStorageDismissableBanner>
  );
}
