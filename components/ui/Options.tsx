"use client";
import pica from "pica";
import { ReactElement, useState } from "react";
import { Button } from "./button";
import {
  BsCheckSquare,
  BsSquare,
  BsInfoCircle,
  BsDiscord,
  BsTwitch,
  BsYoutube,
} from "react-icons/bs";
import { AiOutlineDownload } from "react-icons/ai";
import { ImSpinner2 } from "react-icons/im";
import useImageStore from "@/lib/store/imageStore";
import useEmoteTypeStore, { EmoteType } from "@/lib/store/emoteTypeStore";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { Input } from "./input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import CONSTANTS from "@/lib/constants";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import { DialogClose } from "@radix-ui/react-dialog";

function getUniqueSizes(selectedTypes: EmoteType[]): number[] {
  const allSizes = selectedTypes.flatMap((obj) => obj.sizes);
  const uniqueSizes = new Set(allSizes);
  return Array.from(uniqueSizes);
}

const Options = () => {
  const { types, updateSelectedTypes } = useEmoteTypeStore();
  const { images, removeAllImages } = useImageStore();
  const [customSize, setCustomSize] = useState<string | null>(null);
  const [folderName, setFolderName] = useState<string>("Emotes");
  const [loading, setLoading] = useState<boolean>(false);
  const [total, setTotal] = useState(0);
  const [processed, setProcessed] = useState(0);

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
        folderName: "Custom Size",
        sizes: customSizeArray,
        selected: true,
      });
    }

    setTotal((selectedTypes.length || 0) * images.length);
    setProcessed((_) => 0);

    try {
      const promises = [];
      const uniqueSizes = getUniqueSizes(selectedTypes);
      for (const url of images) {
        const [name, format] = url.data.name.split(".");
        if (format === "gif") {
          const reader = new FileReader();
          const blob = await getBlobFromURL(url.blob.toString());

          // todo: make a timing class
          console.log(`GIF Image resizing START - ${name}`);

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
                  body: JSON.stringify({ base64String, sizes: uniqueSizes }),
                });
                const data = await resizedGif.json();

                for (const type of selectedTypes) {
                  for (const size of type.sizes) {
                    const folder = zip.folder(type.folderName);
                    const blobOutput = new Blob(
                      [new Uint8Array(data.resizedGifs[size].data)],
                      {
                        type: "image/gif",
                      }
                    );
                    const filename = `${type.folderName}-${name}-${size}x${size}.${format}`;
                    folder!.file(filename, blobOutput);
                  }
                }
                console.log(`GIF Processing done - ${name}`);
                resolve();
                setProcessed(
                  (prevCount) => prevCount + 1 * selectedTypes.length
                );
              } catch (error) {
                console.log("<CLIENT>: resizeAndDownload ERROR: ", error);
                reject(error);
              }
            };
          });

          reader.readAsArrayBuffer(blob);
          promises.push(promise);
        } else {
          for (const type of selectedTypes) {
            for (const size of type.sizes) {
              const image = await loadImage(url.blob.toString());
              const resizedCanvas = await resizeImage(image, size);
              const resizedBlob = await canvasToBlob(resizedCanvas);

              const folder = zip.folder(type.folderName);
              const filename = `${type.folderName}-${name}-${size}x${size}.${format}`;
              folder!.file(filename, resizedBlob);
            }
            setProcessed((prevCount) => prevCount + 1);
          }
        }
      }

      await Promise.all(promises);
      const content = await zip.generateAsync({ type: "blob" });
      const output = folderName ? folderName : "Emotes";
      saveAs(content, `${output}.zip`);
      console.log("<CLIENT>: Download successful! ");
    } catch (error) {
      console.log("<CLIENT>: Failed to resize images and download zip:", error);
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

    const p = pica();
    await p.resize(image, canvas, { unsharpAmount: 80, unsharpRadius: 0.6 });

    return canvas;
  }

  async function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob> {
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          console.error("canvas.toBlob returned null");
          resolve(new Blob());
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

  function generateIcon(name: string): ReactElement | undefined {
    if (name.includes("twitch")) return <BsTwitch className="mr-1" size={20} />;
    else if (name.includes("discord"))
      return <BsDiscord className="mr-1" size={20} />;
    else if (name.includes("youtube"))
      return <BsYoutube className="mr-1" size={20} />;
    return undefined;
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

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 ">
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
              {generateIcon(label)}
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

      <div className="flex gap-4 items-end">
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
              <p>Ex: (120,40 will create emotes of size 120x120 and 40x40)</p>
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
            Processing ( {processed} of {total} )
          </>
        ) : (
          <>
            <AiOutlineDownload className="mr-1" size={CONSTANTS.IconSize} />{" "}
            Download as ZIP
          </>
        )}
      </Button>

      <ConfirmActionButtonWithModal
        disabled={images.length === 0 || loading}
        onConfirm={removeAllImages}
      />
    </div>
  );
};

export default Options;

// -------------------------

type ConfirmActionButtonWithModalType = {
  disabled: boolean;
  onConfirm: () => void;
};

const ConfirmActionButtonWithModal = ({
  disabled,
  onConfirm,
}: ConfirmActionButtonWithModalType) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          radius={"none"}
          id="clear-all-emotes"
          disabled={disabled}
          // onClick={removeAllImages}
          variant="destructive"
        >
          Clear All Emotes
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mt-2 flex flex-col items-center">
            <h3 className="scroll-m-20 mt-2 text-2xl tracking-tight">
              Are you sure you want to clear all your emotes?
            </h3>
          </DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="unselected">No</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="destructive" onClick={onConfirm}>
              Yes, Clear all emotes
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
