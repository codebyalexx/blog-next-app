"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ArchiveIcon, PenIcon, TrashIcon } from "lucide-react";
import Link from "next/link";

export const EditPostItem = ({ post }: { post: any }) => {
  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-bold">{post.title}</h2>
      </CardHeader>
      <CardContent>
        <p className="text-foreground/80">{post.description}</p>
      </CardContent>
      <CardFooter className="space-x-2">
        <Button className="flex items-center gap-2" asChild>
          <Link href={`/edit/${post.id}`}>
            <PenIcon className="w-4 h-4" /> Edit
          </Link>
        </Button>
        <Button className="flex items-center gap-2" variant={"secondary"}>
          <ArchiveIcon className="w-4 h-4" />
          Archive
        </Button>
        <DeleteButton postId={post.id} />
      </CardFooter>
    </Card>
  );
};

const DeleteButton = ({ postId }: { postId: string }) => (
  <AlertDialog>
    <AlertDialogTrigger asChild>
      <Button variant={"destructive"} className="flex items-center gap-2">
        <TrashIcon className="w-4 h-4" />
        Delete
      </Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete this post
          and remove data from the database.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction>Yes, delete</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);
