"use client";
import { useEffect } from "react";
import { FiUpload, FiPlus } from "react-icons/fi";
import { Accept, useDropzone } from "react-dropzone";
import useImageStore from "@/lib/store/imageStore";
import ImagePreview from "./ImagePreview";
import CONSTANTS from "@/lib/constants";
import { toast } from "react-hot-toast";

const Uploader = () => {
  const { images, addImage } = useImageStore();

  const validateSizeAndDimensions = (
    blob: string,
    file: File
  ): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = blob;

      const maxSizeInBytes = CONSTANTS.MaxAllowedGIFSizeInMB * 1024 * 1024;
      if (file.size > maxSizeInBytes) {
        toast.error(
          `Image '${file.name}' is greater than ${CONSTANTS.MaxAllowedGIFSizeInMB}MB. It cannot be resized and will not be processed`
        );
        resolve(true);
      }

      img.onload = () => {
        if (img.width !== img.height) {
          toast.error(
            `Image '${file.name}' is not a square. The size is ${img.width}x${img.height}`
          );
          resolve(true);
        } else {
          resolve(false);
        }
      };
      img.onerror = () => {
        reject(new Error("Failed to load image"));
      };
    });
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*" as unknown as Accept,
    multiple: true,
    onDrop: async (acceptedFiles) => {
      try {
        const files = await Promise.all(
          acceptedFiles.map(async (file: File) => {
            const blob = URL.createObjectURL(file);
            const error = await validateSizeAndDimensions(blob, file);
            return { data: file, blob: blob, selected: false, error };
          })
        );
        addImage(files);
      } catch (error) {
        console.log(error);
        toast.error(
          `Failed to process file. Please check if the file is an image or GIF`
        );
      }
    },
  });

  useEffect(() => {
    const handlePaste = async (event: ClipboardEvent) => {
      if (event.clipboardData) {
        const items = event.clipboardData.items;
        const files = [];

        for (let i = 0; i < items.length; i++) {
          if (items[i].kind === "file" && items[i].type.includes("image/")) {
            const file = items[i].getAsFile();
            if (!file) return;
            const defaultFileName = `image-${Date.now()}.${
              file.type.split("/")[1]
            }`;
            const newFile = new File([file], defaultFileName, {
              type: file.type,
              lastModified: file.lastModified,
            });
            const blob = URL.createObjectURL(newFile);
            const error = await validateSizeAndDimensions(blob, file);

            files.push({
              data: newFile,
              blob: URL.createObjectURL(newFile),
              selected: false,
              error,
            });
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
  }, [addImage]);

  return (
    <div className="h-full flex-1 flex flex-col p-4 border-2 border-gray-400 border-dashed rounded-xl overflow-y-scroll cursor-pointer hover:text-gray-400">
      <div
        {...getRootProps()}
        className="flex flex-col justify-start h-full gap-2"
      >
        <input {...getInputProps()} />
        {images.length > 0 ? (
          <div className="flex gap-8 flex-wrap p-8 justify-start items-start">
            {images.map((file, index) => (
              <>
                <ImagePreview
                  key={index}
                  file={file.blob}
                  size={125}
                  removeIcon={true}
                  error={file.error}
                />
              </>
            ))}
            {images.length < CONSTANTS.MaxImagesAllowed && (
              <div className="flex items-center justify-center h-[125px] w-[125px] border-2 border-gray-400 border-dashed rounded-xl text-gray-400 hover:text-gray-500 hover:border-gray-500">
                <FiPlus size={50} />
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center h-full gap-2 cursor-pointer text-center">
            <p>Drag and drop some images here, or click to select images</p>
            <p>You can also press Ctrl + V to paste your image here</p>
            <br />
            <b>
              (GIFs must be smaller than {CONSTANTS.MaxAllowedGIFSizeInMB}MB)
            </b>
            <FiUpload size={50} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Uploader;
