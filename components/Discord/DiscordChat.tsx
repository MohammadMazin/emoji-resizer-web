import useImageStore from "@/lib/store/imageStore";
import Image from "next/image";
import React from "react";
import ImagePreview from "../ui/ImagePreview";

type DiscordChatProps = {
  darkMode?: boolean;
  messageType: "small" | "simple" | "sticker";
};

const DiscordChat = ({ darkMode = false, messageType }: DiscordChatProps) => {
  const { images } = useImageStore();
  const imageSize = setImageSize();

  function setImageSize() {
    switch (messageType) {
      case "small":
        return 22;
      case "simple":
        return 48;
      case "sticker":
        return 160;
      default:
        return 48;
    }
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
    <div
      className={`${
        darkMode
          ? "bg-discord-chat-dark hover:bg-discord-chat-dark-hover"
          : "bg-discord-chat-light hover:bg-discord-chat-light-hover"
      }  flex-1 p-4 flex gap-2 h-max`}
      style={{ minHeight: "2.75rem" }}
    >
      <ProfilePicture />
      <section className="flex flex-col  h-max">
        <div className="flex gap-2 items-center">
          <span className={`text-sm font-medium ${!darkMode && "text-twitch"}`}>
            Kayleberries
          </span>
          <span className="text-sx text-muted-foreground">
            Today at 1:22 AM
          </span>
        </div>
        <div className="flex items-center gap-1 flex-wrap">
          {images.map((file, index) => (
            <ImagePreview key={index} file={file.blob} size={imageSize} />
          ))}
          {messageType === "small" && (
            <p className={`${!darkMode && "text-black"}`}>
              Hi! Do you want to learn about our lord and saviour cheese?
            </p>
          )}
        </div>
        {messageType === "simple" && (
          <div className="flex items-center gap-1 mt-1 flex-wrap ">
            {images.map((file, index) => (
              <span
                key={file.data.name}
                className="rounded-md px-1 border-2 border-discord flex gap-2 items-center"
              >
                <ImagePreview key={index} file={file.blob} size={16} />
                <strong>1</strong>
              </span>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

const ProfilePicture = () => {
  return (
    <Image
      src="/discordProfile.jpg"
      alt="discord profile pic"
      width={50}
      height={70}
      style={{
        borderRadius: "50%",
        width: "50px",
        height: "50px",
        objectFit: "cover",
      }}
    />
  );
};

export default DiscordChat;
