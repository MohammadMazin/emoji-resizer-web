"use client";
import Preview from "@/components/ui/Preview";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import useImageStore from "@/lib/store/imageStore";
import Image from "next/image";
import Info from "@/components/ui/Info";

export default function CreateGif() {
  const { images } = useImageStore();
  const [imgData, setImgData] = useState("");
  const [quality, setQuality] = useState(10);
  const [delay, setDelay] = useState(500);
  const [size, setSize] = useState(200);
  const [memory, setMemory] = useState(0);
  const [loading, setLoading] = useState(false);

  async function createGifAPI() {
    setLoading(true);
    //convert each blob to base64
    const promises = [];
    for (const image of images) {
      const reader = new FileReader();
      const blob = await getBlobFromURL(image.blob.toString());
      const promise = new Promise((resolve, reject) => {
        reader.onload = function (event) {
          const data = arrayBufferToBase64(event?.target?.result);
          resolve(data);
        };
        reader.onerror = function (event) {
          reject(event?.target?.error);
        };
        reader.readAsArrayBuffer(blob);
      });
      promises.push(promise);
    }
    const base64Images = await Promise.all(promises);

    const response = await fetch("/create-gif/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ base64Array: base64Images, size, delay, quality }),
    });

    const body = await response.json();

    setMemory(body.resizedGif.data.length);

    const blob = new Blob([new Uint8Array(body.resizedGif.data)], {
      type: "application/octet-stream",
    });
    const reader = new FileReader();

    reader.onloadend = function () {
      const data = reader!.result! as string;
      const base64data = data.split(",")[1]; // Split the data URL and get the Base64 part
      setImgData(base64data);
      setLoading(false);
    };

    reader.readAsDataURL(blob);
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
    <main className="overflow-hidden mt-6">
      <div className="flex flex-col min-h-[85vh] lg:flex-row md:h-[85vh] px-4 gap-4 lg:justify-center lg:items-center">
        <section className="h-[30vh] lg:h-full w-full">
          {/* <Preview /> */}
        </section>

        <section className="h-[30vh] lg:h-full w-full flex flex-col justify-start gap-8">
          {/* <Info message="BETA: I'm still testing this out, I'd love any feedback you have on performance or improvements" /> */}

          <div className="flex gap-2 w-50 items-center">
            Size:
            <Input
              value={size}
              placeholder={"200"}
              onChange={(e) => setSize(parseInt(e.target.value))}
            />
            x
            <Input
              value={size}
              placeholder={"200"}
              onChange={(e) => setSize(parseInt(e.target.value))}
            />
          </div>
          <div className="flex gap-2 items-center">
            Delay(ms)
            <Input
              onChange={(e) => setDelay(parseInt(e.target.value))}
              placeholder="500"
            />
          </div>
          <div className="flex gap-2 w-full">
            Quality:
            <span className="flex gap-2 w-full">
              <Slider
                className="cursor-pointer"
                defaultValue={[10]}
                max={10}
                step={1}
                onValueChange={(value) => setQuality(value[0])}
              />
              {quality}
            </span>
          </div>

          {/* <Checkbox /> */}

          <Button
            className="mt-4"
            onClick={createGifAPI}
            disabled={loading || images.length === 0}
          >
            Create GIF
          </Button>
          {memory > 0 && (
            <div className="w-full flex flex-col items-center justify-content-center">
              <Image
                src={`data:image/png;base64,${imgData}`}
                width={280}
                height={280}
                alt="resized GIF"
              />
              <span>
                <b>GIF Size:</b> {memory / 1000} KB
              </span>
              <div>
                <h1 className="text-2xl font-bold">Limits</h1>
                <p className="text-xs text-gray">
                  <b>Twitch:</b> 1MB file size max for auto-resize mode. If
                  using manual mode, each of the file sizes cannot exceed 512KB
                </p>
                <p>GIF images cannot be more than 60 frames</p>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
