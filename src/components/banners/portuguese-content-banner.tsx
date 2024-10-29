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
        Meus artigos aqui são apenas em inglês.{" "}
        <a
          href={socials.brNewsletter}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold underline hover:text-blue-600"
        >
          Veja meus artigos em português aqui
        </a>
        .
      </div>
    </LocalStorageDismissableBanner>
  );
}
