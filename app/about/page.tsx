import { Button } from "@/components/ui/button";
import Link from "next/link";

const Page = () => (
  <div className="w-full py-6 max-w-xl text-foreground/80 text-center">
    <h1 className="text-3xl font-bold mb-4 text-foreground">About Me</h1>
    <p className="text-lg mb-6">
      Hey there, I&apos;m Alex, also known as Alex Development, and I&apos;m
      thrilled to welcome you to my corner of the internet!
    </p>
    <p className="text-lg mb-6">
      I&apos;m a passionate advocate for living life to the fullest and
      embracing every opportunity for growth and adventure. From a young age,
      I&apos;ve been drawn to exploration and discovery, whether it&apos;s
      conquering challenging hiking trails, pushing my limits in sports, or
      embarking on personal wellness journeys.
    </p>
    <p className="text-lg mb-6">
      On this blog, I aim to share my experiences and insights with you,
      offering a glimpse into my world as I navigate the ups and downs of life.
      From the exhilaration of reaching a fitness milestone to the satisfaction
      of completing a personal project, I believe in celebrating every victory,
      big or small.
    </p>
    <p className="text-lg mb-6">
      When I&apos;m not busy exploring the great outdoors or pursuing my latest
      fitness goal, you can find me immersed in the world of technology and
      coding. As Codebyalexx, I&apos;m constantly honing my skills and seeking
      out new challenges in the digital realm.
    </p>
    <p className="text-lg mb-6">
      But above all, I&apos;m just a regular guy with a passion for living life
      authentically and inspiring others to do the same. So whether you&apos;re
      here for fitness tips, travel inspiration, or simply a friendly chat,
      I&apos;m excited to connect with you and embark on this journey together.
      Thanks for stopping by!
    </p>
    <p className="text-lg ">
      Let&apos;s make every moment count and create memories that last a
      lifetime. Cheers to new adventures and endless possibilities!
    </p>
    <div className="flex items-center justify-center my-8">
      <Button
        variant={"ghost"}
        className="text-foreground flex items-center gap-2 text-lg p-6"
        asChild
      >
        <Link href={"/fun/latest-post"}>
          Read my latest post <span className="animate-bounce">🥳</span>
        </Link>
      </Button>
    </div>
  </div>
);

export default Page;
