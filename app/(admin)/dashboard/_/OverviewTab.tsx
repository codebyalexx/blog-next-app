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

export const OverviewTab = ({ comments }: { comments: any[] }) => (
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
    <RecentsComments comments={comments} />
  </TabsContent>
);

export const RecentsComments = ({ comments }: { comments: any[] }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recents comments</CardTitle>
        <CardDescription>
          You have received {comments.length} comments this month
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {comments.map((comment) => (
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
