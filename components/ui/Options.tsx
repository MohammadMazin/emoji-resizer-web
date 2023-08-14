"use client";
import Link from "next/link";
import { Button } from "./button";
import { BsCheckSquare, BsSquare } from "react-icons/bs";
import { AiOutlineDownload } from "react-icons/ai";
import { IoAlertCircleOutline } from "react-icons/io5";
import useImageStore from "@/lib/store/imageStore";
import useEmoteTypeStore from "@/lib/store/emoteTypeStore";
import JSZip from "jszip";
import { saveAs } from "file-saver";

const Options = () => {
  const { types, updateSelectedTypes } = useEmoteTypeStore();
  const { images } = useImageStore();

  const resizeAndDownload = async () => {
    let selectedTypes = types.filter((type) => type.selected);
    let resizedImages = [];
    const zip = new JSZip();

    selectedTypes.forEach((type) => {
      type.sizes.forEach((size) => {
        resizedImages = images.map(
          (url, index) =>
            new Promise<void>((resolve, reject) => {
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
                  // Add image to zip file
                  zip.file(
                    `${type.name}-image-${index + 1}-${size}x${size}.png`,
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

      halfCanvas
        .getContext("2d")
        .drawImage(canvas, 0, 0, halfCanvas.width, halfCanvas.height);

      return halfCanvas;
    }

    try {
      // Wait for all images to be added to the zip
      await Promise.all(resizedImages);

      // Generate zip file and trigger download
      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, "images.zip");
    } catch (error) {
      console.error("Failed to resize images and download zip:", error);
    }
  };

  function handleBClick(label: string) {
    updateSelectedTypes(label);
  }

  return (
    <div className="flex-1 p-4 flex flex-col ">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Emote Resizer
      </h1>
      <h3 className="scroll-m-20 text-2xl tracking-tight">
        For Twitch and Discord!
      </h3>
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

      <Button
        radius={"none"}
        className="mt-8"
        disabled={images.length === 0}
        onClick={resizeAndDownload}
      >
        <AiOutlineDownload className="mr-1" /> Download
      </Button>
      <Link
        href="https://github.com/MohammadMazin"
        target="_blank"
        className="mt-auto"
      >
        <Button variant={"link"}>
          Report an Issue <IoAlertCircleOutline className={"ml-2"} />
        </Button>
      </Link>
    </div>
  );
};

export default Options;
