import { ReactNode } from "react";

export const dynamic = "force-dynamic";

export default async function layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
