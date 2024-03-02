import { Hero } from "@/components/layout/Hero";
import { BlogFeed } from "@/components/layout/blog/BlogFeed";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
      <Hero />
      <BlogFeed />
    </>
  );
}
