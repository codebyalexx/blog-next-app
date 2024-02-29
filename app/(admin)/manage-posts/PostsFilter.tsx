"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Clock7Icon, ClockIcon } from "lucide-react";

export const PostsFilter = ({
  filter,
  setFilter,
}: {
  filter: string;
  setFilter: (filter: string) => void;
}) => (
  <Select value={filter} onValueChange={setFilter}>
    <SelectTrigger className="w-[180px]">
      <SelectValue placeholder="Select order" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectItem value="most_recent">
          <div className="flex items-center gap-2">
            <ClockIcon className="h-4 w-4" /> Most recent first
          </div>
        </SelectItem>
        <SelectItem value="older">
          <div className="flex items-center gap-2">
            <Clock7Icon className="h-4 w-4" /> Older first
          </div>
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
);
