"use client";

import { PostEditor } from "@/src/features/write/PostEditor";
import { Session } from "next-auth";

const Page = ({ session }: { session: Session }) => (
  <PostEditor session={session} />
);

export default Page;
