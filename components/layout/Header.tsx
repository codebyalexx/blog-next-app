import { SignInButton } from "@/src/features/authentication/SignInButton";
import Link from "next/link";
import Logo from "../../public/Logo.svg";
import { ThemeToggle } from "../theme-toggle";

export const Header = () => {
  return (
    <header className="flex justify-center border-b border-muted-foreground/10">
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

const Brand = () => {
  return (
    <Link href={"/"} className="flex items-center gap-2">
      <Logo className="w-14 fill-black dark:fill-white" />
      <h1 className="font-bold">Adventures By Alexx</h1>
    </Link>
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
      <SignInButton />
      <ThemeToggle />
    </div>
  );
};
