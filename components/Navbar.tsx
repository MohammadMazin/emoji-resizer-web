"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HoverEffect } from "./ui/CardHoverEffect";

export default function Navbar() {
  return (
    <div className="flex justify-center mx-auto px-8">
      <HoverEffect items={links} />
    </div>
  );
}
export const links = [
  {
    title: "Emotes",
    link: "/",
  },
  {
    title: "Create GIF",
    link: "/create-gif",
  },
];
