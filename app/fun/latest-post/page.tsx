import { getLatestPostId } from "@/src/query/post.query";
import { redirect } from "next/navigation";

export default async function page() {
  const latestPostId = await getLatestPostId();
  if (!latestPostId) redirect("/");
  redirect(`/post/${latestPostId}`);
}
