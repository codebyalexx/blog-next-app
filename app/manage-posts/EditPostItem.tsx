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
import { deletePost } from "@/src/action/post.action";
import { ArchiveIcon, PenIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export const EditPostItem = ({
  post,
  onPostRemove,
}: {
  post: any;
  onPostRemove: (postId: string) => void;
}) => {
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
        <DeleteButton postId={post.id} onPostRemove={onPostRemove} />
      </CardFooter>
    </Card>
  );
};

const DeleteButton = ({
  postId,
  onPostRemove,
}: {
  postId: string;
  onPostRemove: (postId: string) => void;
}) => (
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
        <AlertDialogAction
          onClick={async () => {
            const res = await deletePost(postId);

            if (res.success) {
              onPostRemove(postId);
              return toast.success("Successfully deleted post!");
            }

            toast.error(res.message || "");
          }}
        >
          Yes, delete
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);
