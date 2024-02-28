"use client";

import { plugins } from "@/lib/plate/plate-plugins";
import { Plate, PlateContent } from "@udecode/plate-common";

export const PostReader = ({ data }: { data: string }) => {
  return (
    <div>
      <Plate initialValue={JSON.parse(data)} plugins={plugins}>
        <PlateContent readOnly />
      </Plate>
    </div>
  );
};
