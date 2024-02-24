import useImageStore from "@/lib/store/imageStore";
import Image from "next/image";
import React from "react";
import ImagePreview from "../ui/ImagePreview";

type DiscordChatProps = {
  darkMode?: boolean;
  messageType: "small" | "simple" | "sticker" | "reply";
  role: any;
  setSelectedRole?: any;
  isReply?: boolean;
};

const DiscordChat = ({
  darkMode = false,
  messageType,
  role = null,
  setSelectedRole,
  isReply = false,
}: DiscordChatProps) => {
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
      case "reply":
        return 18;
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
      } 
      ${
        isReply &&
        darkMode &&
        "border-s-4 border-yellow-400 bg-[#444037] hover:bg-[#403d38]"
      }

      ${
        isReply &&
        !darkMode &&
        "border-s-4 border-yellow-400 bg-[#fdf7ea] hover:bg-[#fcefd6]"
      }
      
      flex-1 p-4 flex-col gap-2 h-max`}
      style={{ minHeight: "2.75rem" }}
    >
      {isReply && (
        <section
          className={`${
            !darkMode && "text-black"
          } flex items-center gap-2 ml-5  `}
        >
          <span
            className="px-1 border-t-2 border-s-2 border-slate-400 flex gap-2 items-center"
            style={{
              width: "50px",
              height: "13px",
              borderTopLeftRadius: "8px",
            }}
          ></span>
          <ProfilePicture width={16} height={16} />
          <span className="font-medium opacity-70 text-twitch">
            @Kayleberries
          </span>
          <span className=" text-sx">this is a reply</span>
          {images.map((file, index) => (
            <ImagePreview
              key={index}
              file={file.blob}
              size={18}
              onClick={() => setSelectedRole(file.blob)}
            />
          ))}
        </section>
      )}
      <div className="flex-1 flex gap-2">
        <ProfilePicture />
        <section className="flex flex-col  h-max">
          <div className="flex gap-2 items-center">
            <span className={`text-sm font-medium flex gap-1 text-twitch`}>
              Kayleberries
              {role === null ? (
                <svg
                  aria-hidden="true"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="none"
                  viewBox="0 0 24 24"
                  color="rgb(45, 199, 112)"
                >
                  <path
                    fill="currentColor"
                    d="M11.55 14.4c.28.17.62.17.9 0 1.6-.96 6.88-4.46 6.88-8.57A3.83 3.83 0 0 0 15.5 2c-1.56 0-2.58.6-3.5 1.5A4.66 4.66 0 0 0 8.5 2a3.83 3.83 0 0 0-3.83 3.83c0 4.1 5.29 7.61 6.88 8.57Z"
                    className=""
                  ></path>
                  <path
                    fill="currentColor"
                    d="M3.11 14.86a1 1 0 0 0-.83 1.24l.23.89a6 6 0 0 0 6.46 4.45l2.03-.22V22a1 1 0 1 0 2 0v-.78l2.03.22A6 6 0 0 0 21.5 17l.23-.89a1 1 0 0 0-.83-1.24l-2.05-.29a6 6 0 0 0-6.1 3.07L12 19l-.74-1.36a6 6 0 0 0-6.1-3.07l-2.05.29ZM2.93 9.4a.6.6 0 0 1 1.14 0l.1.25a2 2 0 0 0 1.18 1.19l.25.1a.6.6 0 0 1 0 1.13l-.25.1a2 2 0 0 0-1.19 1.18l-.1.25a.6.6 0 0 1-1.13 0l-.1-.25a2 2 0 0 0-1.18-1.19l-.25-.1a.6.6 0 0 1 0-1.13l.25-.1a2 2 0 0 0 1.19-1.18l.1-.25ZM21.46 9.82a.49.49 0 0 0-.92 0v.03a2 2 0 0 1-1.19 1.18l-.03.01a.49.49 0 0 0 0 .92h.03a2 2 0 0 1 1.18 1.19l.01.03c.16.43.76.43.92 0v-.03a2 2 0 0 1 1.19-1.18l.03-.01a.49.49 0 0 0 0-.92h-.03a2 2 0 0 1-1.18-1.19l-.01-.03Z"
                    className=""
                  ></path>
                </svg>
              ) : (
                <>
                  <ImagePreview file={role} size={18} />
                </>
              )}
            </span>
            <span className="text-sx text-muted-foreground">
              Today at 1:22 AM
            </span>
          </div>
          <div className="flex items-center gap-1 flex-wrap">
            {images.map((file, index) => (
              <ImagePreview
                key={index}
                file={file.blob}
                size={imageSize}
                onClick={() => setSelectedRole(file.blob)}
              />
            ))}
            {messageType === "small" && (
              <p className={`${!darkMode && "text-black"}`}>
                Hi! Do you want to learn about our lord and saviour cheese?
              </p>
            )}
          </div>
          {messageType === "simple" && (
            <div
              className={`flex items-center gap-1 mt-1 flex-wrap ${
                !darkMode && "text-black"
              }`}
            >
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

export default DiscordChat;
