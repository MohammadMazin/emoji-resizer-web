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
  return (
    <main className="overflow-hidden mt-6">
      <div className="flex flex-col min-h-[85vh] lg:flex-row md:h-[85vh] px-4 gap-4 lg:justify-center lg:items-center">
        <section className="h-[30vh] lg:h-full w-full">
          <Preview />
        </section>

        <section className="h-[30vh] lg:h-full w-full flex flex-col justify-start gap-8">
          <Info message="BETA: I'm still testing this out, I'd love any feedback you have on performance or improvements" />
        </section>
      </div>
    </main>
  );
}
