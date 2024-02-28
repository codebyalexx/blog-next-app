"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

export const DropdownMenuAddPost = () => {
  return (
    <DropdownMenuItem asChild>
      <Link href={"/write"}>
        <PlusIcon className={"mr-2 h-4 w-4"} />
        Create post
      </Link>
    </DropdownMenuItem>
  );
};
