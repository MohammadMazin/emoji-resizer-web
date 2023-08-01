"use client";

import { useState, useEffect } from "react";
import { FiUpload } from "react-icons/fi";
import { useDropzone } from "react-dropzone";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { ImCheckboxUnchecked, ImCheckboxChecked } from "react-icons/im";
import useImageStore from "@/lib/store/imageStore";
import ImagePreview from "./ImagePreview";
import { Button } from "./button";
import useEmoteTypeStore from "@/lib/store/emoteTypeStore";

const Uploader = () => {
  const [selectedFile, setSelectedFile] = useState([]);
  const [preview, setPreview] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const { types } = useEmoteTypeStore();
  const { images, addImage, removeImage } = useImageStore();

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    multiple: true,
    onDrop: (acceptedFiles) => {
      addImage(acceptedFiles);
      // setSelectedFile((prevFiles) => [...prevFiles, ...acceptedFiles]);
    },
  });

  useEffect(() => {
    if (images.length === 0) {
      return;
    }
    let previewArray: any = [];
    for (let i = 0; i < images.length; i++) {
      previewArray.push(URL.createObjectURL(images[i]));
    }

    setPreview(previewArray);
    setShowPreview(true);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(previewArray);
  }, [images]);

  const handleClick = (event: any, file: any) => {
    event.stopPropagation();
    // Add your custom function logic here...
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

        <h3>Click here or drag images into this box to upload your emotes</h3>
        <FiUpload size={50} />
        {showPreview ? (
          <div className="flex gap-8 flex-wrap p-8 justify-center">
            {preview.map((file, index) => (
              <>
                <ImagePreview
                  onClick={(e, file) => handleClick(e, file)}
                  file={file}
                  size={125}
                />
              </>
            ))}
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p>Drag and drop some images here, or click to select images </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Uploader;
