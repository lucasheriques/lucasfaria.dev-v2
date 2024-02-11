import { Moon, Sun } from "lucide-react";
import React from "react";

import HeaderNavigation from "./header-navigation";

const Header = () => {
  return (
    <header className="flex w-full px-6 justify-between items-center h-40">
      <HeaderNavigation />
      <div className="flex gap-2">
        <Moon />
      </div>
    </header>
  );
};

export default Header;
