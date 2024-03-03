"use client";

import { cn } from "@/lib/utils";
import { HeaderProfile } from "@/src/features/authentication/HeaderProfile";
import { MenuIcon } from "lucide-react";
import { Session } from "next-auth";
import Link from "next/link";
import { useState } from "react";
import { LanguageSwitcher } from "../language-switcher";
import { ThemeToggle } from "../theme-toggle";
import { Button } from "../ui/button";
import { Brand } from "./Logo";

export const Header = ({ session }: { session: Session | null }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <header
      className="*:z-20 flex justify-center border-b border-muted-foreground/10"
      onClick={() => setExpanded(false)}
    >
      <div className="p-3 w-full max-w-5xl flex items-center justify-between gap-8 relative">
        <div className="flex items-center min-w-fit w-fit">
          <Brand />
        </div>
        <div
          className={cn(
            "max-sm:hidden !z-50 bg-background max-sm:border-b border-gray-500 dark:border-gray-300 max-sm:flex-col max-sm:gap-4 max-sm:absolute max-sm:left-0 max-sm:right-0 max-sm:top-full max-sm:p-4 sm:flex items-center justify-between w-full translate-x-6 transition-all",
            expanded ? "!flex translate-x-0" : ""
          )}
        >
          <nav className="flex max-sm:flex-col items-center gap-3">
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
          <div className="flex items-center gap-2">
            <HeaderProfile session={session} />
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
        <div className="items-center justify-end hidden max-sm:block">
          <Button
            variant={"ghost"}
            onClick={(e) => {
              e.stopPropagation();
              setExpanded((v) => !v);
            }}
          >
            <MenuIcon />
          </Button>
        </div>
        {expanded && (
          <div className="fixed left-0 right-0 top-0 bottom-0 w-full h-full z-10"></div>
        )}
      </div>
    </header>
  );
};
