import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getPostData } from "@/src/query/post.query";
import { redirect } from "next/navigation";
import { PostReader } from "./PostReader";

const Page = async ({ params }: { params: { id: string } }) => {
  const postData = await getPostData(params.id);
  if (!postData) redirect("/");

  return (
    <div className="w-full max-w-4xl py-12 space-y-6">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">{postData.title}</h1>
        <p className="text-muted-foreground">{postData.description}</p>
        <div className="flex items-center gap-2">
          <Badge>Tag</Badge>
        </div>
      </div>
      <Separator />
      <div>
        <PostReader data={postData.contents} />
      </div>
    </div>
  );
};

export default Page;
