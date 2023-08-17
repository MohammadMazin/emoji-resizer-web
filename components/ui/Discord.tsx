import useImageStore from "@/lib/store/imageStore";
import Image from "next/image";
import React from "react";
import ImagePreview from "./ImagePreview";

const Discord = () => {
  const { images } = useImageStore();

  return (
    <div className="flex flex-col">
      <div
        className="bg-discord-chat-dark hover:bg-discord-chat-dark-hover flex-1 p-4 flex gap-2"
        style={{ minHeight: "2.75rem" }}
      >
        <Image
          src="/discordProfile.jpg"
          alt="discord profile pic"
          width={50}
          height={70}
          style={{ borderRadius: "50%", width: "50px", height: "50px" }}
        />
        <section className="flex flex-col">
          <div className="flex gap-2 items-center">
            <span className="text-sm font-medium">Kayleberries</span>
            <span className="text-sx text-muted-foreground">
              Today at 1:22 AM
            </span>
          </div>
          <div className="flex items-center gap-1">
            {images.map((file, index) => (
              <ImagePreview key={index} file={file.blob} size={48} />
            ))}
          </div>
          <div className="flex items-center gap-1 mt-1">
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
        </section>
      </div>
      <div
        className="bg-discord-chat-dark hover:bg-discord-chat-dark-hover flex-1 p-4 flex gap-2"
        style={{ minHeight: "2.75rem" }}
      >
        <Image
          src="/discordProfile.jpg"
          alt="discord profile pic"
          width={50}
          height={70}
          style={{ borderRadius: "50%" }}
        />
        <section className="flex flex-col">
          <div className="flex gap-2 items-center">
            <span className="text-sm font-medium">Kayleberries</span>
            <span className="text-sx text-muted-foreground">
              Today at 1:22 AM
            </span>
          </div>
          <div className="flex items-center gap-1">
            {images.map((file, index) => (
              <ImagePreview key={index} file={file.blob} size={22} />
            ))}
            <p>Hi! Do you want to learn about our lord and saviour cheese?</p>
          </div>
        </section>
      </div>

      {/*  */}

      <div
        className="bg-discord-chat-light hover:bg-discord-chat-light-hover flex-1 p-4 flex gap-2"
        style={{ minHeight: "2.75rem" }}
      >
        <Image
          src="/discordProfile.jpg"
          alt="discord profile pic"
          width={50}
          height={70}
          style={{ borderRadius: "50%", width: "50px", height: "50px" }}
        />
        <section className="flex flex-col">
          <div className="flex gap-2 items-center">
            <span className="text-sm font-medium text-twitch">
              Kayleberries
            </span>
            <span className="text-sx text-muted-foreground">
              Today at 1:22 AM
            </span>
          </div>
          <div className="flex items-center gap-1">
            {images.map((file, index) => (
              <ImagePreview key={index} file={file.blob} size={48} />
            ))}
          </div>
          <div className="flex items-center gap-1 mt-1">
            {images.map((file, index) => (
              <span
                key={file.data.name}
                className="rounded-md px-1 border-2 border-discord bg-discord-100 flex gap-2 items-center"
              >
                <ImagePreview key={index} file={file.blob} size={16} />
                <strong className="text-black">1</strong>
              </span>
            ))}
          </div>
        </section>
      </div>
      <div
        className="bg-discord-chat-light hover:bg-discord-chat-light-hover flex-1 p-4 flex gap-2"
        style={{ minHeight: "2.75rem" }}
      >
        <Image
          src="/discordProfile.jpg"
          alt="discord profile pic"
          width={50}
          height={70}
          style={{ borderRadius: "50%" }}
        />
        <section className="flex flex-col">
          <div className="flex gap-2 items-center">
            <span className="text-sm font-medium text-twitch">
              Kayleberries
            </span>
            <span className="text-sx text-muted-foreground">
              Today at 1:22 AM
            </span>
          </div>
          <div className="flex items-center gap-1 text-black">
            {images.map((file, index) => (
              <ImagePreview key={index} file={file.blob} size={22} />
            ))}
            <p>Hi! Do you want to learn about our lord and saviour cheese?</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Discord;
