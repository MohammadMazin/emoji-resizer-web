import useImageStore from "@/lib/store/imageStore";
import Image from "next/image";
import React from "react";
import ImagePreview from "../ui/ImagePreview";

type TwitchMegaEmoteProps = {
  darkMode?: boolean;
  defaultBadges?: any[];
  megaEmote: string | null;
};

const TwitchMegaEmote = ({
  darkMode = false,
  defaultBadges = [],
  megaEmote,
}: TwitchMegaEmoteProps) => {
  const { images } = useImageStore();

  return (
    <div
      className={`${
        darkMode ? "bg-twitch-chat-dark" : "bg-twitch-chat-light"
      } p-2`}
    >
      <div
        className={`
      ${
        darkMode
          ? "bg-twitch-chat-dark hover:bg-twitch-chat-dark-hover"
          : "bg-twitch-chat-light hover:bg-twitch-chat-light-hover text-black"
      } 
      flex flex-col`}
      >
        <div className={`flex-1 flex gap-1 p-2 items-center flex-wrap`}>
          {images
            .filter((file) => file.selected)
            .map((file, index) => (
              <ImagePreview key={index} file={file.blob} size={18} />
            ))}
          {defaultBadges.map((file, index) => (
              <ImagePreview key={index} file={file.link} size={18} />
          ))}

          <span className="text-sx font-semibold text-pink-400">
            kayleberries:
          </span>
          <span className="text-sx">
            hi i love your stream, do you sell cakes?
          </span>
        </div>
        {megaEmote ? (
          <ImagePreview file={megaEmote} size={112} />
        ) : (
          <div
            className={`w-[112px] h-[112px] p-2 border-2 border-dashed ${
              !darkMode && "border-slate-700"
            } text-sx font-medium flex align-items-center justify-items-center rounded-md`}
          >
            Click on an emote to gigantify it!
          </div>
        )}
        {/*  */}
      </div>
    </div>
  );
};

export default TwitchMegaEmote;
