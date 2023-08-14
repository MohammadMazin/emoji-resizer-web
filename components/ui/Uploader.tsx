"use client";

import { FiUpload } from "react-icons/fi";
import { useDropzone } from "react-dropzone";
import useImageStore from "@/lib/store/imageStore";
import ImagePreview from "./ImagePreview";

const Uploader = () => {
  const { images, addImage } = useImageStore();

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    multiple: true,
    onDrop: (acceptedFiles) => {
      const files = acceptedFiles.map((file: File) => {
        return { data: file, blob: URL.createObjectURL(file) };
      });
      addImage(files);
    },
  });

  return (
    <div className="flex-1 flex flex-col p-4 border-2 border-gray-400 border-dashed rounded-xl">
      <div
        {...getRootProps()}
        className="flex flex-col justify-center items-center h-full gap-2"
      >
        <input {...getInputProps()} />
        {images.length > 0 ? (
          <div className="flex gap-8 flex-wrap p-8 justify-center">
            {images.map((file, index) => (
              <>
                <ImagePreview key={index} file={file.blob} size={125} />
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
