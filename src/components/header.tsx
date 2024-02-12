import HeaderNavigation from "./header-navigation";

const Header = () => {
  return (
    <header className="mx-auto flex h-20 w-full items-center justify-between px-8 md:h-40 md:max-w-3xl">
      <HeaderNavigation />
      <div className="flex gap-2"></div>
    </header>
  );
};

export default Header;
