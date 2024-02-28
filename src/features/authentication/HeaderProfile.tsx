"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Writers } from "@/lib/utils";
import { Session } from "next-auth";
import { DropdownMenuAddPost } from "./DropdownMenuItemAddPost";
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
          <DropdownMenuAddPost />
          <DropdownMenuSeparator />
        </>
      )}
      <DropdownMenuItemLogout />
    </DropdownMenuContent>
  </DropdownMenu>
);
