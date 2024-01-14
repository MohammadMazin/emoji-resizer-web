import { useState } from "react";
import useImageStore from "@/lib/store/imageStore";
import Image from "next/image";
import React from "react";
import DiscordChat from "./DiscordChat";
import ImagePreview from "../ui/ImagePreview";
import Info from "../ui/Info";

const Discord = () => {
  const { images } = useImageStore();
  const [selectedRole, setSelectedRole] = useState(null);

  console.log(selectedRole);

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
    <>
      <Info message="Click on an emote to see how it looks as a role next to the username!" />
      <div className="overflow-y-scroll max-h-[75vh] rounded-xl">
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
    </>
  );
};

export default Discord;
