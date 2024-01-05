"use client";
import { useEffect } from "react";
import { FiUpload } from "react-icons/fi";
import { Accept, useDropzone } from "react-dropzone";
import useImageStore from "@/lib/store/imageStore";
import ImagePreview from "./ImagePreview";
import { ImageData } from "@/lib/store/imageStore";

const Uploader = () => {
  const { images, addImage } = useImageStore();

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*" as unknown as Accept,
    multiple: true,
    onDrop: (acceptedFiles) => {
      const files = acceptedFiles.map((file: File) => {
        return { data: file, blob: URL.createObjectURL(file) };
      });
      addImage(files);
    },
  });

  useEffect(() => {
    const handlePaste = (event) => {
      if (event.clipboardData) {
        const items = event.clipboardData.items;
        const files = [];

        for (let i = 0; i < items.length; i++) {
          console.log(items[i]);
          if (items[i].kind === "file" && items[i].type.includes("image/")) {
            const file = items[i].getAsFile();
            const defaultFileName = `image-${Date.now()}.${
              file.type.split("/")[1]
            }`;
            const newFile = new File([file], defaultFileName, {
              type: file.type,
              lastModified: file.lastModified,
            });
            files.push({ data: newFile, blob: URL.createObjectURL(newFile) });
          }
        }

        if (files.length > 0) {
          addImage(files);
        }
      }
    };

    window.addEventListener("paste", handlePaste);

    return () => {
      window.removeEventListener("paste", handlePaste);
    };
  }, []);

  return (
    <div className="flex-1 flex flex-col p-4 border-2 border-gray-400 border-dashed rounded-xl overflow-y-scroll">
      <div
        {...getRootProps()}
        className="flex flex-col justify-center items-center h-full gap-2"
      >
        <input {...getInputProps()} />
        {images.length > 0 ? (
          <div className="flex gap-8 flex-wrap p-8 justify-center">
            {images.map((file, index) => (
              <>
                <ImagePreview
                  key={index}
                  file={file.blob}
                  size={125}
                  removeIcon={true}
                />
              </>
            ))}
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center h-full gap-2 cursor-pointer hover:text-gray-400">
            <p>Drag and drop some images here, or click to select images </p>
            <FiUpload size={50} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Uploader;
