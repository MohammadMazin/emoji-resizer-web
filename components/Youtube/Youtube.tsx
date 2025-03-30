"use client";
import { useState } from "react";
import useImageStore from "@/lib/store/imageStore";
import Image from "next/image";
import React from "react";
import YoutubeChat from "./YoutubeChat";
import Info from "../ui/Info";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { Button } from "../ui/button";
import CONSTANTS from "@/lib/constants";

const Youtube = () => {
  const { images, updateImageSelected } = useImageStore();
  const [selectedDefaultBadges, setSelectedDefaultBadges] = useState(
    CONSTANTS.defaultBadges
  );

  function selectDefaultBadge(name: string) {
    const newBadges = selectedDefaultBadges.map((badge) => {
      if (badge.name === name) {
        return { ...badge, selected: !badge.selected };
      }
      return badge;
    });
    setSelectedDefaultBadges(newBadges);
  }

  function selectCustomBadge(blob: string) {
    updateImageSelected(blob);
  }

  if (images.length === 0) {
    return (
      <section className="h-full flex flex-col items-center p-8 text-center">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          No Image Uploaded
        </h1>
        <h3 className="scroll-m-20 text-2xl tracking-tight">
          Here&apos;s a bad pun instead
        </h3>
        <p className="mt-4">
          Why did the computer go to therapy? It had too many unresolved issues
          on Discord! - ChatGPT
        </p>
        <Image
          src="/noImage-1.png"
          alt="no uploaded image"
          width={200}
          height={180}
          className="mt-4"
        />
      </section>
    );
  }

  return (
    <div className="overflow-y-scroll  max-h-[75vh] flex flex-col gap-2">
      {/* <Info message="Preview of Badges will be added soon!" /> */}
      <div className="flex flex-col gap-1">
        <h1 className="font-medium mb-1">Select Badges</h1>
        <div className="p-2 max-w-full overflow-x-auto whitespace-nowrap">
          {images.map((badge) => (
            <Button
              variant={badge.selected ? "selected" : "unselected"}
              key={badge.blob}
              onClick={() => selectCustomBadge(badge.blob)}
              className={`hover:opacity-100 transition-opacity ${
                badge.selected ? "opacity-100" : "opacity-50"
              } mr-2 `}
            >
              <Image
                height={18}
                width={18}
                src={badge.blob}
                alt={`twitch Emote`}
              />
            </Button>
          ))}
        </div>
      </div>
      <div className="rounded-xl">
        <p>Comments</p>
        <YoutubeChat darkMode />
        <YoutubeChat />
        <br />
        <p>Livestream chat</p>
        <YoutubeChat darkMode liveChat />
        <YoutubeChat liveChat />
      </div>
    </div>
  );
};

export default Youtube;
