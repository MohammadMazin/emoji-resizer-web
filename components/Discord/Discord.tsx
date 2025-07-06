"use client";
import { useState } from "react";
import useImageStore from "@/lib/store/imageStore";
import Image from "next/image";
import React from "react";
import DiscordChat from "./DiscordChat";
import Info from "../ui/Info";
import { Button } from "../ui/button";
import { downloadScreenshot } from "@/services/image";
import { AiOutlineDownload } from "react-icons/ai";
import CONSTANTS from "@/lib/constants";

const Discord = () => {
  const { images } = useImageStore();
  const [selectedRole, setSelectedRole] = useState(null);

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
    <div className="overflow-y-scroll  max-h-[70vh]">
      <div className="flex gap-2 items-center justify-center w-full">
        <Info
          message="Click on an emote to see as a role next to the username!"
          className="flex-1"
        />
        <Button onClick={() => downloadScreenshot("discord-chat")}>
          <AiOutlineDownload className="mr-1" size={CONSTANTS.IconSize} />{" "}
          Screenshot
        </Button>
      </div>
      <div
        className="rounded-xl"
        style={{
          lineHeight: "initial !important",
        }}
      >
        <DiscordChat
          darkMode
          messageType="simple"
          role={selectedRole}
          setSelectedRole={setSelectedRole}
        />
        <DiscordChat
          messageType="simple"
          role={selectedRole}
          setSelectedRole={setSelectedRole}
        />
        <DiscordChat
          darkMode
          messageType="simple"
          isReply
          role={selectedRole}
          setSelectedRole={setSelectedRole}
        />
        <DiscordChat
          messageType="simple"
          isReply
          role={selectedRole}
          setSelectedRole={setSelectedRole}
        />
        <DiscordChat
          darkMode
          messageType="small"
          role={selectedRole}
          setSelectedRole={setSelectedRole}
        />
        <DiscordChat
          messageType="small"
          role={selectedRole}
          setSelectedRole={setSelectedRole}
        />
        <DiscordChat
          darkMode
          messageType="sticker"
          role={selectedRole}
          setSelectedRole={setSelectedRole}
        />
        <DiscordChat
          messageType="sticker"
          role={selectedRole}
          setSelectedRole={setSelectedRole}
        />
      </div>
    </div>
  );
};

export default Discord;
