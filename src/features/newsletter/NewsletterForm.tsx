"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader } from "@/components/ui/loader";
import { registerToNewsletter } from "@/src/action/newsletter.action";
import { CornerDownLeftIcon, PartyPopperIcon } from "lucide-react";
import { useId, useState, useTransition } from "react";
import { toast } from "sonner";

export const NewsletterForm = () => {
  const id = useId();
  const [sent, setSent] = useState(false);
  const [loading, startTransition] = useTransition();

  return (
    <form
      className="w-full max-w-md flex flex-col space-y-2"
      onSubmit={async (e) => {
        e.preventDefault();
        if (sent || loading) return;

        startTransition(async () => {
          /* It's sending form to the server action */
          let res;
          try {
            const formData = new FormData(e.currentTarget);
            res = await registerToNewsletter(formData.get("email") as string);
          } catch (e) {
            toast.error(
              "An error has occurred while adding you to newsletter!"
            );
            return;
          }

          /* It's parsing the results */
          if (res.success) {
            toast.success("You have successfully registered to newsletter!");
            setSent(true);
            return;
          }

          /* Handling error */
          toast.error(
            res.message ||
              "An error has occurred while adding you to newsletter!"
          );
          return;
        });
      }}
    >
      <label htmlFor={id}>Subscribe to my newsletter</label>
      <div className="w-full flex items-center gap-2">
        <Input
          type="email"
          name="email"
          placeholder="Type your email!"
          className="w-full"
          required
          disabled={sent || loading}
        />
        <Button
          type="submit"
          className="flex items-center gap-2"
          disabled={sent || loading}
        >
          {sent ? (
            <>
              Subscribed! <PartyPopperIcon className="h-4 w-4" />
            </>
          ) : (
            <>
              {loading ? (
                <Loader />
              ) : (
                <>
                  Subscribe <CornerDownLeftIcon className="h-4 w-4" />
                </>
              )}
            </>
          )}
        </Button>
      </div>
    </form>
  );
};
