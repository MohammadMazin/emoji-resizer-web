"use client";

import { useState, useEffect } from "react";
import { FiUpload } from "react-icons/fi";
import { useDropzone } from "react-dropzone";
import useImageStore from "@/lib/store/imageStore";
import ImagePreview from "./ImagePreview";
import useEmoteTypeStore from "@/lib/store/emoteTypeStore";

const Uploader = () => {
  const [selectedFile, setSelectedFile] = useState([]);
  const [preview, setPreview] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const { images, addImage, removeImage } = useImageStore();

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    multiple: true,
    onDrop: (acceptedFiles) => {
      // addImage(acceptedFiles);
      setSelectedFile((prevFiles) => [...prevFiles, ...acceptedFiles]);
    },
  });

  useEffect(() => {
    if (selectedFile.length === 0) {
      return;
    }
    let previewArray: any = [];
    for (let i = 0; i < selectedFile.length; i++) {
      previewArray.push(URL.createObjectURL(selectedFile[i]));
    }

    console.log(previewArray);

    setPreview(previewArray);
    addImage(previewArray);
    setShowPreview(true);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(previewArray);
  }, [selectedFile]);

  const handleClick = (event: any, file: any) => {
    event.stopPropagation();
    console.log(images);
    removeImage(file);
  };

  return (
    <div className="flex-1 flex flex-col p-4 border-2 border-gray-400 border-dashed rounded-xl">
      <div
        {...getRootProps()}
        className="flex flex-col justify-center items-center h-full gap-2"
      >
        <input {...getInputProps()} />
        {showPreview ? (
          <div className="flex gap-8 flex-wrap p-8 justify-center">
            {preview.map((file, index) => (
              <>
                <ImagePreview
                  key={index}
                  onClick={(e, file) => handleClick(e, file)}
                  file={file}
                  size={125}
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
