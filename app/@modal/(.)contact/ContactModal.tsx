"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ContactForm } from "@/src/features/contact/ContactForm";
import { usePathname, useRouter } from "next/navigation";

export const ContactModal = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Dialog
      open={pathname === "/contact"}
      onOpenChange={() => {
        router.back();
      }}
    >
      <DialogContent className="w-full max-w-xl">
        <ContactForm className="border-none shadow-none" />
      </DialogContent>
    </Dialog>
  );
};

export default ContactModal;
