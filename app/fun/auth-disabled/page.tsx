import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UnplugIcon } from "lucide-react";

const Page = () => (
  <div className="w-full max-w-lg py-8">
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Auth is disabled
          <span className="text-muted-foreground">
            <UnplugIcon className="w-4 h-4" />
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        Hello dear visitor! Im sorry but the Authentication feature is currently
        disabled for security reasons. I&apos;m investigating to solve this
        situation as quick as possible. Thanks for understanding!
        <p className="italic">- Regards</p>
      </CardContent>
    </Card>
  </div>
);

export default Page;
