import HeaderNavigation from "./header-navigation";

import DarkLightToggle from "@/components/dark-light-toggle";

export default function Header({
  initialTheme,
}: {
  initialTheme: "light" | "dark";
}) {
  return (
    <header className="mx-auto flex h-20 w-full items-center justify-between px-8 md:h-40 md:max-w-3xl">
      <HeaderNavigation />
      <div className="flex gap-2">
        <DarkLightToggle initialTheme={initialTheme} />
      </div>
    </header>
  );
}
