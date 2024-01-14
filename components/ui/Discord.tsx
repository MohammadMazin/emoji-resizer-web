import useImageStore from "@/lib/store/imageStore";
import Image from "next/image";
import React from "react";
import DiscordChat from "../Discord/DiscordChat";
import ImagePreview from "./ImagePreview";

const Discord = () => {
  const { images } = useImageStore();

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
    <div className="overflow-y-scroll max-h-[80vh]">
      <DiscordChat darkMode messageType="simple" />
      <DiscordChat messageType="simple" />
      <DiscordChat darkMode messageType="small" />
      <DiscordChat messageType="small" />
      <DiscordChat darkMode messageType="sticker" />
      <DiscordChat messageType="sticker" />
    </div>
  );
};

export default Discord;
