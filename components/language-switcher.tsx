"use client";

import useLanguageSwitcher from "@/src/hooks/useLanguageSwitcher";
import { NextPageContext } from "next";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export type LanguageSwitcherProps = {
  context?: NextPageContext;
};

export const LanguageSwitcher = ({ context }: LanguageSwitcherProps = {}) => {
  const { currentLanguage, switchLanguage, languageConfig } =
    useLanguageSwitcher({ context });

  if (!languageConfig) {
    return null;
  }

  return (
    <Select value={currentLanguage} onValueChange={switchLanguage}>
      <SelectTrigger>
        <SelectValue placeholder="Language..." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">
          <Image
            src={"/flag_US.webp"}
            width={64}
            height={64}
            alt="English"
            className="w-4 h-4"
          />
        </SelectItem>
        <SelectItem value="fr">
          <Image
            src={"/flag_FR.webp"}
            width={64}
            height={64}
            alt="Français"
            className="w-4 h-4"
          />
        </SelectItem>
      </SelectContent>
    </Select>
  );
};
