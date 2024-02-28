"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader } from "@/components/ui/loader";
import { Textarea } from "@/components/ui/textarea";
import { sendContactMessage } from "@/src/action/contact.action";
import { AlertCircle, SendIcon } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

export const ContactForm = ({ className }: { className?: string }) => {
  /* form data */
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  /* form misc states */
  const [isLoading, startTransition] = useTransition();
  const [sent, setSent] = useState(false);

  /* errors */
  const [error, setError] = useState("");

  /* parse form */
  const validateForm = () => {
    if (name.length < 4) {
      setError("Name musts be at least 4 characters long.");
      return false;
    }

    if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(email)) {
      setError("Please enter a valid email.");
      return false;
    }

    if (message.length < 20) {
      setError("Message musts be at least 20 characters long.");
      return false;
    }

    return true;
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Contact me</CardTitle>
        <CardDescription>
          Fill out the form below and I&apos;ll get back to you as soon as
          possible.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first-name">Name</Label>
              <Input
                id="first-name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={sent}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Enter your email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={sent}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              className="min-h-[100px]"
              id="message"
              placeholder="Enter your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={sent}
            />
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between gap-2">
        <div>
          {error.length > 0 && (
            <Alert className="w-full">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Heads up!</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>
        <Button
          disabled={isLoading || sent}
          className="flex items-center gap-2"
          type="button"
          onClick={async () => {
            if (!validateForm()) return;

            startTransition(async () => {
              const res = await sendContactMessage({
                name,
                email,
                message,
              });

              if (res.success) {
                setSent(true);
                toast.success("Your message has been successfully sent!");
              } else {
                setError(res.message || "");
                toast.error(res.message);
              }
            });
          }}
        >
          {isLoading ? (
            <>
              Sending <Loader />
            </>
          ) : (
            <>
              Send message <SendIcon className="w-4 h-4" />
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};
