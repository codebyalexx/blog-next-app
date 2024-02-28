import { ContactForm } from "@/src/features/contact/ContactForm";
import Image from "next/image";

const Page = () => (
  <div className="w-full max-w-2xl py-6">
    <ContactForm className="border-none shadow-none" />
    <Image
      src={"/type-computer.gif"}
      alt="Cat typing on computer"
      width={800}
      height={400}
      className="my-12 rounded-lg"
    />
  </div>
);

export default Page;
