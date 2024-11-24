import HeaderNavigation, { HeaderNavigationMobile } from "./header-navigation";

import DarkLightToggle from "@/components/dark-light-toggle";
import LocaleToggle from "@/components/locale-toggle";

export default function Header() {
  return (
    <header className="mx-auto flex h-20 w-full items-center justify-between px-6 md:h-40 md:max-w-3xl">
      <HeaderNavigation />
      <div className="flex gap-2 pr-8 md:pr-0">
        <HeaderNavigationMobile />
        <DarkLightToggle />
        <LocaleToggle />
      </div>
    </header>
  );
}
