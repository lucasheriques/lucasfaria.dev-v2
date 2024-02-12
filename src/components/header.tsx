import HeaderNavigation from "./header-navigation";

const Header = () => {
  return (
    <header className="flex w-full px-8 justify-between items-center h-20 md:h-40 md:max-w-3xl mx-auto">
      <HeaderNavigation />
      <div className="flex gap-2"></div>
    </header>
  );
};

export default Header;
