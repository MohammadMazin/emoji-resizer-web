"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "./button";
import {
  BsCheckSquare,
  BsSquare,
  BsInfoCircle,
  BsTwitter,
  BsGithub,
  BsDiscord,
} from "react-icons/bs";
import { AiOutlineDownload } from "react-icons/ai";
import { IoAlertCircleOutline } from "react-icons/io5";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import toast from "react-hot-toast";

const Options = () => {
  const { types, updateSelectedTypes } = useEmoteTypeStore();
  const { images } = useImageStore();
  const [customSize, setCustomSize] = useState<string | null>(null);
  const [folderName, setFolderName] = useState<string>("Emotes");
  const [loading, setLoading] = useState<boolean>(false);

  async function resizeAndDownload() {
    setLoading(true);
    let selectedTypes = types.filter((type) => type.selected);
    let resizedImages: Promise<void>[] = [];
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

    selectedTypes.forEach((type) => {
      type.sizes.forEach((size) => {
        resizedImages = images.map(
          (url, index) =>
            new Promise<void>((resolve, reject) => {
              const folder = zip.folder(type.name);
              const image = new Image();
              image.onload = async () => {
                // Resize image with a canvas
                let canvas = document.createElement("canvas");
                let context = canvas.getContext("2d");

                // start with the original size
                canvas.width = image.width;
                canvas.height = image.height;
                context!.drawImage(image, 0, 0, canvas.width, canvas.height);

                // incrementally scale down the image until it's the desired size
                while (canvas.width > 2 * size) {
                  canvas = getHalfScaledCanvas(canvas);
                }

                if (canvas.width > size) {
                  // final step
                  const finalCanvas = document.createElement("canvas");
                  finalCanvas.width = size;
                  finalCanvas.height = size;
                  const finalContext = finalCanvas.getContext("2d");
                  finalContext!.drawImage(canvas, 0, 0, size, size);
                  canvas = finalCanvas;
                }

                canvas.toBlob((blob: any) => {
                  const [name] = url.data.name.split(".");
                  // Add image to zip file
                  folder!.file(
                    `${name}-${index + 1}-${size}x${size}.png`,
                    blob
                  );
                  resolve();
                }, "image/png");
              };
              image.onerror = (e) => {
                console.log("error", e);
                reject();
              };
              image.src = url.blob.toString();
            })
        );
      });
    });

    // A function to produce a new canvas that's half the size of the input canvas
    function getHalfScaledCanvas(canvas: HTMLCanvasElement) {
      const halfCanvas = document.createElement("canvas");
      halfCanvas.width = canvas.width / 2;
      halfCanvas.height = canvas.height / 2;

      halfCanvas!
        .getContext("2d")
        .drawImage(canvas, 0, 0, halfCanvas.width, halfCanvas.height);

      return halfCanvas;
    }

    try {
      // Wait for all images to be added to the zip
      await Promise.all(resizedImages);

      // Generate zip file and trigger download
      const content = await zip.generateAsync({ type: "blob" });

      let output = folderName ? folderName : "Emotes";

      saveAs(content, `${output}.zip`);
    } catch (error) {
      console.error("Failed to resize images and download zip:", error);
    } finally {
      setLoading(false);
    }
  }

  function handleBClick(label: string) {
    updateSelectedTypes(label);
  }

  function disableDownloadButton(): boolean | undefined {
    return (
      images.length === 0 || types.every((type) => type.selected === false)
    );
  }

  function copyDiscordUsername() {
    navigator.clipboard
      .writeText("kayleberrsssies")
      .then(() => toast.success("Copied Discord username to clipboard!"));
  }

  return (
    <div className="flex-1 p-4 flex flex-col gap-4 ">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Emote Resizer
      </h1>
      <h3 className="scroll-m-20 text-2xl tracking-tight">
        For Twitch and Discord!
      </h3>
      <Input
        // className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
        className="appearance-none bg-transparent border-x-0 border-t-0 focus:outline-none"
        type="text"
        pattern="[0-9,]*"
        placeholder="Enter aFolder Name"
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
                <BsCheckSquare className={"ml-2"} color="#1bab23" size={25} />
              ) : (
                <BsSquare className={"ml-2"} size={25} />
              )}
            </Button>
          );
        })}
      </div>
      <div className="flex gap-4">
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
              <BsInfoCircle className="cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Enter sizes separated by comma</p>
              <p>Ex: (120,40 will resize to 120x120 and 40x40)</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <Button
        radius={"none"}
        disabled={disableDownloadButton() || loading}
        onClick={resizeAndDownload}
      >
        <AiOutlineDownload className="mr-1" /> Download as ZIP
      </Button>

      <Dialog>
        <DialogTrigger className="mt-auto mr-auto">
          {" "}
          <Button variant={"link"}>
            Share your feedback <IoAlertCircleOutline className={"ml-2"} />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mt-2">
              Found an issue have a suggestion? You can reach me out on these
              platforms
            </DialogTitle>
            <DialogDescription>
              <div className="flex flex-col gap-4 mt-8">
                <Button variant="outline">
                  <BsTwitter className="mr-4" /> Twitter
                </Button>
                <Button variant="outline">
                  <BsGithub className="mr-4" /> Github
                </Button>
                <Button variant="outline" onClick={copyDiscordUsername}>
                  <BsDiscord className="mr-4" /> Discord - kayleberries
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Options;
