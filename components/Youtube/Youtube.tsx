"use client";
import { useState } from "react";
import useImageStore from "@/lib/store/imageStore";
import Image from "next/image";
import React from "react";
import YoutubeChat from "./YoutubeChat";
import Info from "../ui/Info";

const Youtube = () => {
  const { images } = useImageStore();

  if (images.length === 0) {
    return (
      <section className="h-full flex flex-col items-center p-8 text-center">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          No Image Uploaded
        </h1>
        <h3 className="scroll-m-20 text-2xl tracking-tight">
          Here&apos;s a bad pun instead
        </h3>
        <p className="mt-4">
          Why did the computer go to therapy? It had too many unresolved issues
          on Discord! - ChatGPT
        </p>
        <Image
          src="/noImage-1.png"
          alt="no uploaded image"
          width={200}
          height={180}
          className="mt-4"
        />
      </section>
    );
  }

  return (
    <div className="overflow-y-scroll  max-h-[75vh] flex flex-col gap-2">
      <Info message="Preview of Badges will be added soon!" />
      <div className="rounded-xl">
        <YoutubeChat darkMode />
        <YoutubeChat />
      </div>
    </div>
  );
};

export default Youtube;
