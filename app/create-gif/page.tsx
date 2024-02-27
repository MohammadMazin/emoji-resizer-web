"use client";
import Preview from "@/components/ui/Preview";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import useImageStore from "@/lib/store/imageStore";
import { arrayBuffer } from "stream/consumers";

export default function CreateGif() {
  const { images, removeAllImages } = useImageStore();

  async function callApi() {
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
      body: JSON.stringify({ base64Array: base64Images, size: 100 }),
    });

    const body = await response.json();
    console.log(body);
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

  const [val, setVal] = useState(10);

  return (
    <main className="overflow-hidden">
      <div className="flex flex-col min-h-[85vh] lg:flex-row md:h-[85vh] px-4 gap-4 lg:justify-center lg:items-center">
        <section className="h-[30vh] lg:h-full w-full">
          <Preview />
        </section>

        <section className="h-[30vh] lg:h-full w-full flex flex-col gap-2">
          <h1>Create GIF</h1>
          <Input />
          <span className="flex gap-2">
            <Slider
              className="cursor-pointer"
              defaultValue={[10]}
              max={10}
              step={1}
              onValueChange={(value) => setVal(value[0])}
            />

            {val}
          </span>

          <Button onClick={callApi}>Load</Button>
        </section>
      </div>
    </main>
  );
}
