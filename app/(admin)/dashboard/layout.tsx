import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReactNode } from "react";

const Page = ({ children }: { children: ReactNode }) => (
  <>
    <div className="w-full max-w-5xl mb-4">
      <header className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            The statistics resets each month
          </p>
        </div>
        <Tabs defaultValue="overview">
          <TabsList className="grid w-full max-w-xl grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="comments">Comments</TabsTrigger>
            <TabsTrigger value="newsletter">Newsletter</TabsTrigger>
          </TabsList>
          {children}
        </Tabs>
      </header>
    </div>
  </>
);
export default Page;
