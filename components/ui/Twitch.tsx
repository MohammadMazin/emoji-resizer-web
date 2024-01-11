import useImageStore from "@/lib/store/imageStore";
import Image from "next/image";
import React from "react";
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
      <div className="bg-twitch-chat-dark p-2">
        <div className="bg-twitch-chat-dark hover:bg-twitch-chat-dark-hover flex-1 flex gap-2 p-2 items-center flex-wrap">
          {images.map((file, index) => (
            <>
              <ImagePreview key={index} file={file.blob} size={18} />
            </>
          ))}
          <span className="text-sx font-semibold text-pink-400">
            kayleberries:
          </span>
          {images.map((file, index) => (
            <>
              <ImagePreview key={index} file={file.blob} size={28} />
            </>
          ))}
          <span className="text-sx">
            hi i love your stream, do you sell cakes?
          </span>
        </div>
      </div>
      <div className="bg-twitch-chat-light p-2">
        <div className="bg-twitch-chat-light hover:bg-twitch-chat-light-hover flex-1 flex gap-2 p-2 items-center text-black flex-wrap">
          {images.map((file, index) => (
            <>
              <ImagePreview key={index} file={file.blob} size={18} />
            </>
          ))}
          <span className="text-sx font-semibold text-pink-400">
            kayleberries:
          </span>
          {images.map((file, index) => (
            <>
              <ImagePreview key={index} file={file.blob} size={28} />
            </>
          ))}
          <span className="text-sx">
            hi i love your stream, do you sell cakes?
          </span>
        </div>
      </div>
    </div>
  );
};

export default Twitch;
