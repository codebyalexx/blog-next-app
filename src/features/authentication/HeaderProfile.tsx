"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Writers } from "@/lib/utils";
import { GaugeCircleIcon, ListIcon, PlusIcon } from "lucide-react";
import { Session } from "next-auth";
import Link from "next/link";
import { DropdownMenuItemLogout } from "./DropdownMenuItemLogout";
import { SignInButton } from "./SignInButton";

export const HeaderProfile = ({ session }: { session: Session | null }) => {
  return (
    <>
      {session?.user ? (
        <HeaderProfileDropdown session={session} />
      ) : (
        <SignInButton />
      )}
    </>
  );
};

export const HeaderProfileDropdown = ({
  session,
}: {
  session: Session | null;
}) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Avatar className="cursor-pointer h-8 w-8">
        <AvatarImage src={session?.user?.image || ""} alt="profile picture" />
        <AvatarFallback>HELLO</AvatarFallback>
      </Avatar>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-56">
      {Writers.includes(session?.user?.email || "") && (
        <>
          <DropdownMenuItem asChild>
            <Link href={"/dashboard"}>
              <GaugeCircleIcon className={"mr-2 h-4 w-4"} />
              Dashboard
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={"/manage-posts"}>
              <ListIcon className={"mr-2 h-4 w-4"} />
              Manage posts
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={"/write"}>
              <PlusIcon className={"mr-2 h-4 w-4"} />
              Create post
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
        </>
      )}
      <DropdownMenuItemLogout />
    </DropdownMenuContent>
  </DropdownMenu>
);
