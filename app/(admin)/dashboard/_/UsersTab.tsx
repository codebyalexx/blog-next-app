"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { ShieldAlertIcon } from "lucide-react";
import { useState } from "react";
import { UsersButtonsGroup } from "./UsersButtons";

export const UsersTab = ({ defaultUsers }: { defaultUsers: any }) => {
  const [users, setUsers] = useState<any>(defaultUsers.data || []);
  const handleUserRemove = (userId: string) =>
    setUsers(users.filter((user: any) => user.id !== userId));
  const handleUserRestrict = (userId: string) =>
    setUsers(
      users.map((user: any) => {
        return user.id === userId
          ? {
              ...user,
              restricted: !user.restricted,
            }
          : user;
      })
    );

  return (
    <TabsContent value="users">
      {defaultUsers.success === false && (
        <div className="my-4 border-2 border-border p-4 rounded-lg flex items-center gap-2">
          <ShieldAlertIcon /> Error has happened while retrieving the users
        </div>
      )}

      {users.length > 0 && (
        <ul className="space-y-2 py-2 w-full max-w-3xl">
          {users.map((user: any) => (
            <li
              key={user.id}
              className={cn(
                "flex items-center justify-between py-2",
                users.indexOf(user) !== users.length - 1
                  ? "border-b border-border"
                  : ""
              )}
            >
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src={user.image} alt={user.name} />
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <UsersButtonsGroup
                  user={user}
                  onUserRemove={handleUserRemove}
                  onUserRestrict={handleUserRestrict}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </TabsContent>
  );
};
