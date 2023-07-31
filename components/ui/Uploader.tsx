"use client";

import { useState, useEffect } from "react";
import { FiUpload } from "react-icons/fi";
import { useDropzone } from "react-dropzone";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { ImCheckboxUnchecked, ImCheckboxChecked } from "react-icons/im";
import useImageStore from "@/lib/store/store";

const Uploader = () => {
  return (
    <div className="flex-1 flex flex-col p-4 border-2 border-gray-400 border-dashed rounded-xl">
      <div className="flex flex-col justify-center items-center h-full gap-2">
        <h3>Click here or drag images into this box to upload your emotes</h3>
        <FiUpload size={50} />
      </div>
    </div>
  );
};

export default Uploader;
