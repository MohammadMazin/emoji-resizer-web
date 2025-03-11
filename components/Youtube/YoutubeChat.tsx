import useImageStore from "@/lib/store/imageStore";
import Image from "next/image";
import React from "react";
import ImagePreview from "../ui/ImagePreview";
import usePlatformStore from "@/lib/store/platformStore";

type YoutubeChatProps = {
  darkMode?: boolean;
  defaultBadges?: any[];
};

const YoutubeChat = ({
  darkMode = false,
  defaultBadges = [],
}: YoutubeChatProps) => {
  const { images } = useImageStore();
  const { chatMessage } = usePlatformStore();

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
          height={160}
          className="mt-4"
        />
      </section>
    );
  }

  return (
    <div
      className={`${
        darkMode ? "bg-youtube-chat-dark" : "bg-youtube-chat-light"
      } p-2`}
    >
      <div
        className={`${
          darkMode
            ? "bg-youtube-chat-dark hover:bg-youtube-chat-dark-hover"
            : "bg-youtube-chat-light hover:bg-youtube-chat-light-hover text-black"
        } flex-1 flex gap-1 p-2 items-center flex-wrap text-sx`}
      >
        <ProfilePicture width={24} height={24} />{" "}
        <span className="text-sx font-semibold text-gray-500 ml-[8px] mr-[4px] flex gap-2">
          kayleberries
          {images
            .filter((file) => file.selected)
            .map((file, index) => (
              <ImagePreview key={index} file={file.blob} size={16} />
            ))}
        </span>
        <div className="flex gap-[0.1rem]">
          {images.map((file, index) => (
            <>
              <ImagePreview key={index} file={file.blob} size={24} />
            </>
          ))}
        </div>
        {chatMessage.split(" ").map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </div>
    </div>
  );
};

type ProfilePictureProps = {
  width?: number;
  height?: number;
};
const ProfilePicture = ({ width, height }: ProfilePictureProps) => {
  return (
    <Image
      src="/discordProfile.jpg"
      alt="discord profile pic"
      width={width || 50}
      height={height || 70}
      style={{
        borderRadius: "50%",
        width: `${width || 50}px`,
        height: `${width || 50}px`,
        objectFit: "cover",
      }}
    />
  );
};

export default YoutubeChat;
