import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import moment from "moment";
import Link from "next/link";

export const BentoFeed = ({ posts }: { posts: any[] }) => {
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

  return <div className="space-y-6">{items.map((i) => i)}</div>;
};

export const FirstBentoLayout = ({ posts }: { posts: any[] }) => {
  return (
    <div className="grid grid-cols-3 gap-6">
      <BlogBentoItem post={posts[0]} className={posts[1] ? "" : "col-span-3"} />
      {posts[1] && <BlogBentoItem post={posts[1]} className="col-span-2" />}
    </div>
  );
};

export const SecondBentoLayout = ({ posts }: { posts: any[] }) => {
  return (
    <div className="grid grid-cols-3 gap-6">
      <BlogBentoItem
        post={posts[0]}
        className={cn("col-span-2", posts[1] ? "" : "col-span-3")}
      />
      {posts[1] && <BlogBentoItem post={posts[1]} />}
    </div>
  );
};

export const BlogBentoItem = ({
  post,
  className,
}: {
  post?: any;
  className?: string;
}) => {
  const rotateDirection = Math.round(Math.random() * 1);

  return (
    <Link
      href={`/post/${post.id}`}
      className={cn(
        "w-full min-h-[260px] rounded-lg cursor-pointer bg-center bg-cover overflow-hidden shadow-white/5 shadow-xl",
        "hover:scale-105 transition-all max-lg:col-span-3",
        rotateDirection === 0 ? "hover:rotate-1" : "hover:-rotate-1",
        className
      )}
      style={{
        backgroundImage:
          "url('" + post?.imageURL ||
          "https://generated.vusercontent.net/placeholder.svg" + "')",
      }}
    >
      <div className="bg-black bg-opacity-70 h-full w-full p-4 flex flex-col items-start justify-between">
        <h3 className="text-xl font-semibold text-white">{post.title}</h3>
        <div className="flex items-center gap-2">
          <p className="text-xs text-white/80">
            {moment(post.releasedAt).format("D MMMM")} • {post.duration} minutes
            read
          </p>
          <Badge variant={"secondary"}>{post.tags.split(";")[0] || ""}</Badge>
        </div>
      </div>
    </Link>
  );
};
