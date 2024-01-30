import pica from "pica";
import { useState } from "react";
import { Button } from "./button";
import { BsCheckSquare, BsSquare, BsInfoCircle } from "react-icons/bs";
import { AiOutlineDownload } from "react-icons/ai";
import { ImSpinner2 } from "react-icons/im";
import useImageStore from "@/lib/store/imageStore";
import useEmoteTypeStore from "@/lib/store/emoteTypeStore";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { Input } from "./input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import CONSTANTS from "@/lib/constanst";
import GIFOptions from "../GIFOptions";

const Options = () => {
  const { types, updateSelectedTypes } = useEmoteTypeStore();
  const { images, removeAllImages } = useImageStore();
  const [customSize, setCustomSize] = useState<string | null>(null);
  const [folderName, setFolderName] = useState<string>("Emotes");
  const [loading, setLoading] = useState<boolean>(false);

  async function resizeAndDownload(): Promise<void> {
    setLoading(true);
    const selectedTypes = types.filter((type) => type.selected);
    const zip = new JSZip();

    if (customSize && customSize !== "") {
      const customSizeArray = customSize
        .split(",")
        .map((size) => parseInt(size));
      selectedTypes.push({
        name: "Custom Size",
        label: "Custom Size",
        sizes: customSizeArray,
        selected: true,
      });
    }

    try {
      const promises = [];
      for (const type of selectedTypes) {
        for (const size of type.sizes) {
          for (const url of images) {
            const [name, format] = url.data.name.split(".");

            if (format === "gif") {
              const reader = new FileReader();
              const folder = zip.folder(type.name);
              const filename = `${name}-${size}x${size}.${format}`;

              const blob = await getBlobFromURL(url.blob.toString());

              const promise = new Promise<void>((resolve, reject) => {
                reader.onload = async function (event) {
                  try {
                    const readerData = event.target!.result;
                    const base64String = arrayBufferToBase64(readerData);

                    const resizedGif = await fetch("api/", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({ base64String, size }),
                    });

                    const data = await resizedGif.json();

                    const blobOutput = new Blob(
                      [new Uint8Array(data.resizedGif.data)],
                      {
                        type: "image/gif",
                      }
                    );
                    folder!.file(filename, blobOutput);
                    resolve(); // Resolve the promise once the blob is added
                  } catch (error) {
                    console.log("error ", error);
                    reject(error); // Reject the promise in case of an error
                  }
                };
              });

              reader.readAsArrayBuffer(blob);
              promises.push(promise);
            } else {
              const image = await loadImage(url.blob.toString());
              const resizedCanvas = await resizeImage(image, size);
              const resizedBlob = await canvasToBlob(resizedCanvas);

              const folder = zip.folder(type.name);
              const filename = `${name}-${size}x${size}.${format}`;
              folder!.file(filename, resizedBlob);
            }
          }
        }
      }

      // Wait for all promises to resolve before generating and downloading the zip
      await Promise.all(promises);
      const content = await zip.generateAsync({ type: "blob" });
      const output = folderName ? folderName : "Emotes";
      saveAs(content, `${output}.zip`);
    } catch (error) {
      console.error("Failed to resize images and download zip:", error);
    } finally {
      setLoading(false);
    }
  }

  async function loadImage(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = (e) => reject(e);
      image.src = url;
    });
  }

  async function resizeImage(
    image: HTMLImageElement,
    size: number
  ): Promise<HTMLCanvasElement> {
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const context = canvas.getContext("2d");

    const p = pica(); // Create a new pica instance
    await p.resize(image, canvas, { unsharpAmount: 80, unsharpRadius: 0.6 }); // Apply sharpening

    return canvas;
  }

  async function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob> {
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          // Handle the case where toBlob returns null
          console.error("canvas.toBlob returned null");
          resolve(new Blob()); // Create an empty blob as a placeholder
        }
      }, "image/png");
    });
  }

  function handleBClick(label: string) {
    updateSelectedTypes(label);
  }

  function disableDownloadButton(): boolean | undefined {
    return (
      images.length === 0 || types.every((type) => type.selected === false)
    );
  }

  function arrayBufferToBase64(arrayBuffer: any) {
    const uint8Array = new Uint8Array(arrayBuffer);
    let binaryString = "";
    for (let i = 0; i < uint8Array.length; i++) {
      binaryString += String.fromCharCode(uint8Array[i]);
    }
    return btoa(binaryString);
  }

  async function getBlobFromURL(blobURL: string) {
    const response = await fetch(blobURL);
    const blob = await response.blob();
    return blob;
  }

  return (
    <div className="flex-1 p-4 flex flex-col gap-4 ">
      <Input
        className="appearance-none bg-transparent border-x-0 border-t-0 focus:outline-none"
        type="text"
        pattern="[0-9,]*"
        placeholder="Enter a Folder Name"
        onChange={(e) => {
          setFolderName(e.target.value);
        }}
      />

      <div className="mt-8 grid grid-cols-2 gap-4">
        {types.map((type) => {
          const { label, name, selected } = type;
          return (
            <Button
              key={label}
              variant={selected ? "selected" : "unselected"}
              className="flex-1"
              onClick={() => {
                handleBClick(label);
              }}
            >
              {name}
              {selected ? (
                <BsCheckSquare
                  className={"ml-2"}
                  color="#1bab23"
                  size={CONSTANTS.IconSize}
                />
              ) : (
                <BsSquare className={"ml-2"} size={CONSTANTS.IconSize} />
              )}
            </Button>
          );
        })}
      </div>

      <div className="flex gap-4 items-center">
        <Input
          className="appearance-none bg-transparent border-x-0 border-t-0 focus:outline-none mt-4"
          type="text"
          pattern="[0-9,]*"
          placeholder="Custom Sizes- Separated by comma"
          onChange={(e) => {
            setCustomSize(e.target.value);
          }}
        />

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <BsInfoCircle
                className="cursor-pointer"
                size={CONSTANTS.IconSize}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Enter sizes separated by comma</p>
              <p>Ex: (120,40 will resize to 120x120 and 40x40)</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* <GIFOptions /> */}

      <Button
        radius={"none"}
        disabled={disableDownloadButton() || loading}
        onClick={resizeAndDownload}
      >
        {loading ? (
          <>
            <ImSpinner2
              className="mr-1 animate-spin"
              size={CONSTANTS.IconSize}
            />{" "}
            Processing
          </>
        ) : (
          <>
            <AiOutlineDownload className="mr-1" size={CONSTANTS.IconSize} />{" "}
            Download as ZIP
          </>
        )}
      </Button>
      <Button
        radius={"none"}
        disabled={images.length === 0 || loading}
        onClick={removeAllImages}
        variant="destructive"
      >
        Clear All Emotes
      </Button>
    </div>
  );
};

export default Options;
