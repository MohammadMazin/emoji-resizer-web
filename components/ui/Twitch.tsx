import useImageStore from "@/lib/store/imageStore";
import Image from "next/image";
import React from "react";
import TwitchChat from "../Twitch/TwitchChat";
import ImagePreview from "./ImagePreview";

const Twitch = () => {
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
          Why did the Twitch streamer go to therapy? Because they had too many
          viewers, and it was giving them too much &quot;stream&quot; anxiety! -
          ChatGPT
        </p>
        {/* <ImagePreview file={}/> */}
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
    <div className="flex flex-col">
      <TwitchChat darkMode={true} />
      <TwitchChat />
    </div>
  );
};

export default Twitch;
