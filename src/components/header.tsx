import HeaderNavigation, { HeaderNavigationMobile } from "./header-navigation";

import DarkLightToggle from "@/components/dark-light-toggle";
import LocaleToggle from "@/components/locale-toggle";

export default function Header({
  initialTheme,
}: {
  initialTheme: "light" | "dark";
}) {
  return (
    <header className="mx-auto flex h-20 w-full items-center justify-between px-6 md:h-40 md:max-w-3xl">
      <HeaderNavigation />
      <div className="flex gap-2">
        <HeaderNavigationMobile initialTheme={initialTheme} />
        <DarkLightToggle
          initialTheme={initialTheme}
          className="hidden md:block"
        />
        <LocaleToggle className="hidden md:block" />
      </div>
    </header>
  );
}
