import { useState } from "react";
import useImageStore from "@/lib/store/imageStore";
import Image from "next/image";
import React from "react";
import TwitchChat from "./TwitchChat";
import ImagePreview from "../ui/ImagePreview";
import { Button } from "../ui/button";
import CONSTANTS from "@/lib/constanst";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

const Twitch = () => {
  const { images } = useImageStore();
  const [selectedBadges, setSelectedBadges] = useState(CONSTANTS.defaultBadges);

  function selectDefaultBadge(name: string) {
    const newBadges = selectedBadges.map((badge) => {
      if (badge.name === name) {
        return { ...badge, selected: !badge.selected };
      }
      return badge;
    });
    setSelectedBadges(newBadges);
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
          Why did the Twitch streamer go to therapy? Because they had too many
          viewers, and it was giving them too much &quot;stream&quot; anxiety! -
          ChatGPT
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
    <div className="flex flex-col">
      <div className="flex gap-3 p-2 my-4 flex-wrap">
        {selectedBadges.map((badge) => (
          <TooltipProvider key={badge.name}>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant={badge.selected ? "selected" : "unselected"}
                  key={badge.name}
                  onClick={() => selectDefaultBadge(badge.name)}
                  className={`hover:opacity-100 transition-opacity ${
                    badge.selected ? "opacity-100" : "opacity-50"
                  }`}
                >
                  <Image
                    height={18}
                    width={18}
                    src={badge.link}
                    alt={`${badge.name} twitch badge`}
                  />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{badge.name}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
      <TwitchChat
        darkMode={true}
        defaultBadges={selectedBadges.filter((badge) => badge.selected)}
      />
      <TwitchChat
        defaultBadges={selectedBadges.filter((badge) => badge.selected)}
      />
    </div>
  );
};

export default Twitch;
