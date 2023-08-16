import useImageStore from "@/lib/store/imageStore";
import React from "react";
import ImagePreview from "./ImagePreview";

const Discord = () => {
  const { images } = useImageStore();

  return (
    <div className="flex flex-col">
      <div
        className="bg-black flex-1"
        style={{
          marginTop: "1.0625rem",
          minHeight: "2.75rem",
          paddingLeft: "72px",
        }}
      >
        {images.map((file, index) => (
          <>
            <ImagePreview key={index} file={file.blob} size={48} />
          </>
        ))}
      </div>
      <div className="bg-white flex-1">
        {images.map((file, index) => (
          <>
            <ImagePreview key={index} file={file.blob} size={48} />
          </>
        ))}
      </div>
    </div>
  );
};

export default Discord;
