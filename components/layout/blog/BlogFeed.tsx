import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

const SAMPLE_POSTS = [
  {
    title: "Lorem ipsum j'connais pas la suite",
    image: "http://localhost:3000/_next/image?url=%2Fhero2.jpg&w=1080&q=75",
    createdAt: Date.now(),
  },
  {
    title: "Lorem ipsum j'connais pas la suite",
    image: "http://localhost:3000/_next/image?url=%2Fhero2.jpg&w=1080&q=75",
    createdAt: Date.now(),
  },
  {
    title: "Lorem ipsum j'connais pas la suite",
    image: "http://localhost:3000/_next/image?url=%2Fhero2.jpg&w=1080&q=75",
    createdAt: Date.now(),
  },
  {
    title: "Lorem ipsum j'connais pas la suite",
    image: "http://localhost:3000/_next/image?url=%2Fhero2.jpg&w=1080&q=75",
    createdAt: Date.now(),
  },
  {
    title: "Lorem ipsum j'connais pas la suite",
    image: "http://localhost:3000/_next/image?url=%2Fhero2.jpg&w=1080&q=75",
    createdAt: Date.now(),
  },
];

export const BlogFeed = () => {
  return (
    <div className="w-full max-w-6xl p-4 space-y-4">
      <h2 className="text-3xl font-bold">Blog Feed</h2>
      <BlogBento posts={SAMPLE_POSTS} />
    </div>
  );
};

export const BlogBento = ({ posts }: { posts: any[] }) => {
  const items = [];
  let last = true;
  for (let i = 0; i < posts.length; i++) {
    if (i % 2 === 0) {
      if (last)
        items.push(<FirstBentoLayout posts={posts.slice(i, i + 2)} key={i} />);
      if (!last)
        items.push(<SecondBentoLayout posts={posts.slice(i, i + 2)} key={i} />);
      last = !last;
    }
  }

  return <div className="space-y-4">{items.map((i) => i)}</div>;
};

export const FirstBentoLayout = ({ posts }: { posts: any[] }) => {
  return (
    <div className="grid grid-cols-3 space-x-4">
      <BlogElement post={posts[0]} className={posts[1] ? "" : "col-span-3"} />
      {posts[1] && <BlogElement post={posts[1]} className="col-span-2" />}
    </div>
  );
};

export const SecondBentoLayout = ({ posts }: { posts: any[] }) => {
  return (
    <div className="grid grid-cols-3 space-x-4">
      <BlogElement
        post={posts[0]}
        className={cn("col-span-2", posts[1] ? "" : "col-span-3")}
      />
      {posts[1] && <BlogElement post={posts[1]} />}
    </div>
  );
};

export const BlogElement = ({
  post,
  className,
}: {
  post?: any;
  className?: string;
}) => {
  return (
    <Link
      href={"/"}
      className={cn(
        "w-full min-h-[260px] rounded-lg cursor-pointer bg-center bg-cover overflow-hidden",
        className
      )}
      style={{
        backgroundImage:
          "url('" + post?.image ||
          "https://generated.vusercontent.net/placeholder.svg" + "')",
      }}
    >
      <div className="bg-black bg-opacity-70 h-full w-full p-4 flex flex-col items-start justify-between">
        <h3 className="text-xl font-semibold text-white">{post?.title}</h3>
        <Button>Read more</Button>
      </div>
    </Link>
  );
};
