import useImageStore from "@/lib/store/imageStore";
import Image from "next/image";
import React from "react";
import ImagePreview from "../ui/ImagePreview";
import usePlatformStore from "@/lib/store/platformStore";

type TwitchChatProps = {
  darkMode?: boolean;
  defaultBadges?: any[];
  selectMegaEmote: any;
};

const TwitchChat = ({
  darkMode = false,
  defaultBadges = [],
  selectMegaEmote,
}: TwitchChatProps) => {
  const { images } = useImageStore();
  const { chatMessage, usernameColor } = usePlatformStore();

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
    <div
      className={`${
        darkMode ? "bg-twitch-chat-dark" : "bg-twitch-chat-light"
      } p-2`}
    >
      <div
        className={`${
          darkMode
            ? "bg-twitch-chat-dark hover:bg-twitch-chat-dark-hover"
            : "bg-twitch-chat-light hover:bg-twitch-chat-light-hover text-black"
        } flex-1 flex gap-1 p-2 items-center flex-wrap text-sx`}
      >
        {images
          .filter((file) => file.selected)
          .map((file, index) => (
            <ImagePreview key={index} file={file.blob} size={18} />
          ))}
        {defaultBadges.map((file, index) => (
          <ImagePreview key={index} file={file.link} size={18} />
        ))}

        <span
          className="text-sx font-semibold"
          style={{ color: usernameColor }}
        >
          kayleberries:
        </span>
        <div className="flex gap-[0.1rem]">
          {images.map((file, index) => (
            <>
              <ImagePreview
                key={index}
                file={file.blob}
                size={28}
                onClick={() => selectMegaEmote(file.blob)}
              />
            </>
          ))}
        </div>
        {chatMessage.split(" ").map((message, index) => (
          <span key={index}>{message}</span>
        ))}
      </div>
    </div>
  );
};

export default TwitchChat;
