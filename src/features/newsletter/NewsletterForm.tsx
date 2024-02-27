"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PartyPopperIcon } from "lucide-react";
import { useId } from "react";

export const NewsletterForm = () => {
  const id = useId();

  return (
    <form
      className="w-full max-w-md flex flex-col space-y-2"
      onSubmit={async () => {}}
    >
      <label htmlFor={id}>Subscribe to my newsletter</label>
      <div className="w-full flex items-center gap-2">
        <Input type="email" placeholder="Type your email!" className="w-full" />
        <Button type="submit" className="flex items-center gap-2">
          Subscribe <PartyPopperIcon scale={"icon"} />
        </Button>
      </div>
    </form>
  );
};
