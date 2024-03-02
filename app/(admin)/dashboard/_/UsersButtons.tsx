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
  deleteUser,
  toggleUserRestriction,
} from "@/src/action/moderation.action";
import {
  InfoIcon,
  ShieldIcon,
  ShieldMinusIcon,
  Trash2Icon,
} from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

export const UsersButtonsGroup = ({
  user,
  onUserRemove,
  onUserRestrict,
}: {
  user: any;
  onUserRemove: (userId: string) => void;
  onUserRestrict: (userId: string) => void;
}) => {
  return (
    <>
      <RestrictUserButton user={user} onUserRestrict={onUserRestrict} />
      <DeleteUserButton user={user} onUserRemove={onUserRemove} />
    </>
  );
};

export const RestrictUserButton = ({
  user,
  onUserRestrict,
}: {
  user: any;
  onUserRestrict: (userId: string) => void;
}) => {
  const [loading, startTransition] = useTransition();

  const handleUserRestrict = async () => {
    startTransition(async () => {
      const res = await toggleUserRestriction(user.id);

      if (res.success) {
        toast.success(
          res.restricted
            ? "Successfully restricted user!"
            : "Successfully removed restriction!"
        );
        onUserRestrict(user.id);
      } else {
        toast.error(res.message);
      }
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"outline"}>
          {user.restricted ? (
            <ShieldMinusIcon className="w-5 h-5" />
          ) : (
            <ShieldIcon className="w-5 h-5" />
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {user.restricted ? "Disable user restriction?" : "Restrict user?"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {user.restricted
              ? "User will now be able to comment posts."
              : "User will no longer be able to comment posts. User comments will be definitively deleted from our servers."}
            <span className="italic flex items-center gap-1 py-2">
              <InfoIcon className="w-4 h-4" /> User will be notified by mail.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleUserRestrict}>
            {user.restricted ? "Yes, remove restriction" : "Yes, restrict user"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export const DeleteUserButton = ({
  user,
  onUserRemove,
}: {
  user: any;
  onUserRemove: (userId: string) => void;
}) => {
  const [loading, startTransition] = useTransition();

  const handleUserDelete = async () => {
    startTransition(async () => {
      const res = await deleteUser(user.id);

      if (res.success) {
        toast.success("Successfully deleted user!");
        onUserRemove(user.id);
      } else {
        toast.error(res.message);
      }
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"outline"} disabled={loading}>
          <Trash2Icon className="w-5 h-5" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete user
            account from our servers.
            <span className="italic flex items-center gap-1 py-2">
              <InfoIcon className="w-4 h-4" /> User will be notified by mail.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleUserDelete}>
            Yes, delete user account
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
