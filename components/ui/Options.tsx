import Link from "next/link";
import { Button } from "./button";
import { BsCheckSquare } from "react-icons/bs";
import { AiOutlineDownload } from "react-icons/ai";
import {IoAlertCircleOutline} from "react-icons/io5"

const Options = () => {
  return (
    <div className="flex-1 p-4 flex flex-col ">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Emote Resizer
      </h1>
      <h3 className="scroll-m-20 text-2xl tracking-tight">
        For Twitch and Discord!
      </h3>
      <div className="mt-8 flex gap-4">
        <Button variant={"unselected"} className="flex-1">
          Discord Emotes
          <BsCheckSquare className={"ml-2"} color="#1bab23" size={25}/>
        </Button>
        <Button variant={"selected"} className="flex-1">
          Discord Stickers
        </Button>
      </div>
      <div className="mt-4 flex gap-4">
        <Button variant={"unselected"} className="flex-1">
          Twitch Emotes
          <BsCheckSquare className={"ml-2"} color="#1bab23" size={25}/>
        </Button>
        <Button variant={"selected"} className="flex-1">
          Twitch Badges
        </Button>
      </div>
      <Button radius={"none"} className="mt-8">
        <AiOutlineDownload /> Download
      </Button>
      <Link
        href="https://github.com/MohammadMazin"
        target="_blank"
        className="mt-auto"
      >
        <Button variant={"link"}>Report an Issue <IoAlertCircleOutline className={"ml-2"}/></Button>
      </Link>
    </div>
  );
};

export default Options;
