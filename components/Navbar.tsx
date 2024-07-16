import { HoverEffect } from "./ui/CardHoverEffect";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { BsGear } from "react-icons/bs";
import Settings from "./Settings";

export default function Navbar() {
  return (
    <div className="flex justify-center items-center mx-auto px-2 max-w-screen-2xl ml-auto mr-auto">
      <HoverEffect items={links} />
      <div className="ml-auto">
        <Sheet>
          <SheetTrigger>
            <span className="relative flex">
              <span className="animate-ping absolute inline-flex right-0 h-3 w-3 rounded-full bg-yellow-400 opacity-75"></span>
              <BsGear
                size={24}
                className="hover:opacity-75 transition-opacity"
              />
            </span>
          </SheetTrigger>
          <Settings />
        </Sheet>
      </div>
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
