import { NewsletterForm } from "@/src/features/newsletter/NewsletterForm";
import Image from "next/image";

export const Hero = () => {
  return (
    <div className="w-full max-w-7xl mb-4 py-12 grid grid-cols-2 gap-4">
      <div className="h-full w-full flex flex-col items-start space-y-6 justify-center max-lg:col-span-2">
        <p className="font-extrabold uppercase inline bg-gradient-to-r from-[#F596D3]  to-[#D247BF] text-transparent bg-clip-text">
          — Believe the hike
        </p>
        <h1 className="text-7xl font-medium">
          Let&apos;s{" "}
          <span className="inline bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text">
            explore
          </span>{" "}
          life{" "}
          <span className="inline bg-gradient-to-r from-[#b0fb61] via-[#81f11f] to-[#46d703] text-transparent bg-clip-text">
            together
          </span>
          !
        </h1>
        <p className="text-foreground/80">
          Welcome to my world! Join me, Alex, on a journey through life&apos;s
          diverse landscapes - from outdoor adventures to personal wellness. My
          blog shares candid tales of sports, weight loss, exploration, hiking,
          and personal projects. Let&apos;s explore together!
        </p>
        <NewsletterForm />
      </div>
      <div className="hidden lg:flex items-center space-x-5">
        <Image
          className="h-[580px] w-[80%] rounded-md object-cover object-center shadow-md"
          src={"/assets/images/static/hero2.webp"}
          width={1000}
          height={1450}
          alt="Sunset on the ocean"
        />

        <Image
          className="h-[580px] w-[80%] rounded-md object-cover object-center shadow-md"
          src={"/assets/images/static/hero0.webp"}
          width={1000}
          height={1450}
          alt="Sunset on the ocean"
        />

        <Image
          className="h-[580px] w-[80%] rounded-md object-cover object-center shadow-md"
          src={"/assets/images/static/hero1.webp"}
          width={1000}
          height={800}
          alt="Sunset on the ocean"
        />
      </div>
    </div>
  );
};
