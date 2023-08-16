import useImageStore from "@/lib/store/imageStore";
import React from "react";
import ImagePreview from "./ImagePreview";

const Twitch = () => {
  const { images } = useImageStore();
  return (
    <div className="flex flex-col">
      <div className="bg-twitch-chat-dark p-2">
        <div className="bg-twitch-chat-dark hover:bg-twitch-chat-dark-hover flex-1 flex gap-2 p-2 items-center">
          {images.map((file, index) => (
            <>
              <ImagePreview key={index} file={file.blob} size={18} />
            </>
          ))}
          jijimujo:
          {images.map((file, index) => (
            <>
              <ImagePreview key={index} file={file.blob} size={28} />
            </>
          ))}
          hi i love your stream, do you sell cakes?
        </div>
      </div>
      <div className="bg-twitch-chat-light p-2">
        <div className="bg-twitch-chat-light hover:bg-twitch-chat-light-hover flex-1 flex gap-2 p-2 items-center text-black">
          {images.map((file, index) => (
            <>
              <ImagePreview key={index} file={file.blob} size={18} />
            </>
          ))}
          jijimujo:
          {images.map((file, index) => (
            <>
              <ImagePreview key={index} file={file.blob} size={28} />
            </>
          ))}
          hi i love your stream, do you sell cakes?
        </div>
      </div>
    </div>
  );
};

export default Twitch;
