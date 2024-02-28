import { HeaderProfile } from "@/src/features/authentication/HeaderProfile";
import Link from "next/link";
import { ThemeToggle } from "../theme-toggle";
import { Brand } from "./Logo";

export const Header = () => {
  return (
    <header className="*:z-10 flex justify-center border-b border-muted-foreground/10">
      <div className="p-3 w-full max-w-5xl flex items-center justify-between">
        <div className="flex items-center gap-8 w-full">
          <Brand />
          <LeftNav />
        </div>
        <RightNav />
      </div>
    </header>
  );
};

const LeftNav = () => {
  return (
    <nav className="flex items-center gap-3">
      <Link
        href={"/about"}
        className="text-sm text-foreground/75 hover:text-foreground transition-all"
      >
        About me
      </Link>
      <Link
        href={"/contact"}
        className="text-sm text-foreground/75 hover:text-foreground transition-all"
      >
        Contact
      </Link>
    </nav>
  );
};

const RightNav = () => {
  return (
    <div className="flex items-center gap-2">
      <HeaderProfile />
      <ThemeToggle />
    </div>
  );
};
