import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import {
  ActivityIcon,
  DollarSignIcon,
  HandCoinsIcon,
  MessageSquare,
} from "lucide-react";
import moment from "moment";
import Link from "next/link";

export const OverviewTab = () => (
  <TabsContent value="overview" className="w-full space-y-4">
    <div className="grid grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Visits
            <span className="text-muted-foreground">
              <ActivityIcon className="w-4 h-4" />
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">0</p>
          <span className="text-sm text-muted-foreground">
            + 0% from last month
          </span>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Comments
            <span className="text-muted-foreground">
              <MessageSquare className="w-4 h-4" />
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">0</p>
          <span className="text-sm text-muted-foreground">
            + 0% from last month
          </span>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Total revenue
            <span className="text-muted-foreground">
              <DollarSignIcon className="w-4 h-4" />
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">0$</p>
          <span className="text-sm text-muted-foreground">
            + 0% from last month
          </span>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Donations
            <span className="text-muted-foreground">
              <HandCoinsIcon className="w-4 h-4" />
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">0</p>
          <span className="text-sm text-muted-foreground">
            + 0% from last month
          </span>
        </CardContent>
      </Card>
    </div>
    <RecentsComments />
  </TabsContent>
);

export const RecentsComments = () => {
  const COMMENTS_PLACEHOLDER = [
    {
      id: "fezjidzajid",
      user: {
        id: "ldodfedzadza",
        image:
          "https://wallpapers.com/images/hd/shadow-boy-white-eyes-unique-cool-pfp-nft-13yuypusuweug9xn.jpg",
        name: "CoucouMax",
      },
      post: {
        id: "dzaniogrzio",
        title: "Super post!",
      },
      message: "Hello World! Here is my comment!",
      createdAt: new Date(),
    },
    {
      id: "fezjidzajid2",
      user: {
        id: "ldodfedzadza2",
        image:
          "https://static.wikia.nocookie.net/d8265e3e-26d0-439d-a336-7bf9c08ec696/scale-to-width/755",
        name: "Bidule",
      },
      post: {
        id: "dzaniogrzio2",
        title: "Garfield?",
      },
      message: "I very liked this post! Do more content like this!!!",
      createdAt: new Date(),
    },
  ];
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recents comments</CardTitle>
        <CardDescription>
          You have received {COMMENTS_PLACEHOLDER.length} comments this month
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {COMMENTS_PLACEHOLDER.map((comment) => (
          <div
            key={comment.id}
            className="flex items-center space-x-2 pb-2 border-b border-b-border"
          >
            <Avatar>
              <AvatarImage src={comment.user.image} alt={comment.user.name} />
              <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p className="">
                {comment.user.name}{" "}
                <span className="text-sm text-muted-foreground/80">
                  •{" "}
                  <Link
                    href={`/post/${comment.post.id}`}
                    className="font-semibold text-foreground underline"
                  >
                    {comment.post.title}
                  </Link>{" "}
                  • {moment(comment.createdAt).format("D MMMM - kk:mm:ss")}
                </span>
              </p>
              <p className="text-muted-foreground text-sm">{comment.message}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
