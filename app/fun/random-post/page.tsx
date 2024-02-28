import { getRandomPostId } from "@/src/query/post.query";
import { redirect } from "next/navigation";

export default async function page() {
  const randomPostId = await getRandomPostId();
  if (!randomPostId) redirect("/");
  redirect(`/post/${randomPostId}`);
}
