"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PlusIcon } from "lucide-react";
import { Session } from "next-auth";
import Link from "next/link";
import { useState } from "react";
import { EditPostItem } from "./EditPostItem";
import { PostsFilter } from "./PostsFilter";

export const dynamic = "force-dynamic";

const getFilter = (filter: string, a: any, b: any) => {
  switch (filter) {
    case "older":
      return a.releasedAt - b.releasedAt;
      break;
    default: // newest first
      return b.releasedAt - a.releasedAt;
      break;
  }
};

export default function Page({
  posts,
}: {
  session?: Session | null;
  posts: any[];
}) {
  const [postsState, setPostsState] = useState(posts);
  const [filter, setFilter] = useState("most_recent");

  const onPostRemove = (postId: string) =>
    setPostsState(postsState.filter((p: any) => p.id !== postId));

  return (
    <div className="w-full max-w-4xl space-y-2">
      <div className="flex items-center justify-between max-md:flex-wrap">
        <div className="flex items-center space-x-2">
          <h1 className="text-3xl font-bold mb-2">Manage posts</h1>
          <PostsFilter filter={filter} setFilter={setFilter} />
        </div>
        <div>
          <Button className="flex items-center gap-2" asChild>
            <Link href={"/write"}>
              <PlusIcon className="w-4 h-4" /> Create post
            </Link>
          </Button>
        </div>
      </div>
      <Separator />
      <div className="space-y-2 py-3">
        {postsState
          .sort((a, b) => getFilter(filter, a, b))
          .map((post) => (
            <EditPostItem
              key={post.id}
              post={post}
              onPostRemove={onPostRemove}
            />
          ))}
      </div>
    </div>
  );
}
