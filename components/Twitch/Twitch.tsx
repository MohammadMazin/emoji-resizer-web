"use client";
import { useState } from "react";
import useImageStore from "@/lib/store/imageStore";
import Image from "next/image";
import React from "react";
import TwitchChat from "./TwitchChat";
import { Button } from "../ui/button";
import CONSTANTS from "@/lib/constants";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import TwitchMegaEmote from "./TwitchMegaEmote";
import { downloadScreenshot } from "@/services/image";
import { AiOutlineDownload } from "react-icons/ai";

const Twitch = () => {
  const { images, updateImageSelected } = useImageStore();
  const [selectedDefaultBadges, setSelectedDefaultBadges] = useState(
    CONSTANTS.defaultBadges
  );
  const [megaEmote, setMegaEmote] = useState<string | null>(null);

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

  function handleMegaEmote(blob: string) {
    setMegaEmote(blob);
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
    <>
      <div
        className="flex flex-col gap-2 overflow-y-scroll  max-h-[70vh]"
        style={{
          lineHeight: "initial !important",
        }}
      >
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <h1 className="font-medium mb-1">Select Badges</h1>
            <Button onClick={() => downloadScreenshot("twitch-chat")}>
              <AiOutlineDownload className="mr-1" size={CONSTANTS.IconSize} />{" "}
              Screenshot
            </Button>
          </div>
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

            {selectedDefaultBadges.map((badge, index) => (
              <TooltipProvider key={badge.name}>
                <Tooltip>
                  <TooltipTrigger>
                    <Button
                      variant={badge.selected ? "selected" : "unselected"}
                      key={badge.name}
                      onClick={() => selectDefaultBadge(badge.name)}
                      className={`hover:opacity-100 transition-opacity ${
                        badge.selected ? "opacity-100" : "opacity-50"
                      } ${index !== 0 && "ml-2"} `}
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
        </div>
        {/* TODO: better way to pass badges without filtering it 4 times? */}
        <TwitchChat
          darkMode={true}
          defaultBadges={selectedDefaultBadges.filter(
            (badge) => badge.selected
          )}
          selectMegaEmote={handleMegaEmote}
        />
        <TwitchChat
          defaultBadges={selectedDefaultBadges.filter(
            (badge) => badge.selected
          )}
          selectMegaEmote={handleMegaEmote}
        />
        <TwitchMegaEmote
          darkMode
          defaultBadges={selectedDefaultBadges.filter(
            (badge) => badge.selected
          )}
          megaEmote={megaEmote}
        />
        <TwitchMegaEmote
          defaultBadges={selectedDefaultBadges.filter(
            (badge) => badge.selected
          )}
          megaEmote={megaEmote}
        />
      </div>
    </>
  );
};

export default Twitch;
