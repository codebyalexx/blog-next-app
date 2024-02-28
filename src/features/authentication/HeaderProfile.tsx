import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getAuthSession } from "@/lib/auth";
import { Session } from "next-auth";
import { DropdownMenuItemLogout } from "./DropdownMenuItemLogout";
import { SignInButton } from "./SignInButton";

export const HeaderProfile = async () => {
  const session = await getAuthSession();

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

export const HeaderProfileDropdown = ({ session }: { session: Session }) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Avatar className="cursor-pointer h-8 w-8">
        <AvatarImage src={session?.user?.image} alt="profile picture" />
        <AvatarFallback>HELLO</AvatarFallback>
      </Avatar>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-56">
      <DropdownMenuItemLogout />
    </DropdownMenuContent>
  </DropdownMenu>
);