"use client";
import { BsDiscord, BsGithub, BsTwitter } from "react-icons/bs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IoAlertCircleOutline } from "react-icons/io5";
import { toast } from "react-hot-toast";
import CONSTANTS from "@/lib/constanst";
import Image from "next/image";
import coffee_yellow from "@/public/coffee-yellow.png";

const Footer = () => {
  return (
    <footer>
      <FeedbackModal />
    </footer>
  );
};

const FeedbackModal = () => {
  function copyDiscordUsername() {
    navigator.clipboard
      .writeText("kayleberries")
      .then(() => toast.success("Copied Discord username to clipboard!"));
  }

  return (
    <div className="max-w-screen-2xl flex justify-between items-center ml-auto mr-auto p-2">
      <Dialog>
        <DialogTrigger className="mt-auto">
          {" "}
          <Button variant={"link"}>
            Share your feedback{" "}
            <IoAlertCircleOutline size={CONSTANTS.IconSize} />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mt-2">
              Found an issue or have suggestions? You can reach me out on these
              platforms
            </DialogTitle>
            <DialogDescription>
              <div className="flex flex-col justify-center items-center gap-4 mt-8">
                <Link
                  className="flex items-center w-full justify-center"
                  href="https://twitter.com/kayleberries"
                  target={"_blank"}
                >
                  <Button
                    variant="outline"
                    className="border-twitter hover:bg-twitter/50 hover:text-foreground w-full"
                  >
                    <BsTwitter size={CONSTANTS.IconSize} className="mr-4" />{" "}
                    Twitter
                  </Button>
                </Link>

                <Button
                  variant="outline"
                  className="border-discord hover:bg-discord/50 hover:text-foreground w-full justify-center "
                  onClick={copyDiscordUsername}
                >
                  <BsDiscord size={CONSTANTS.IconSize} className="mr-4" />{" "}
                  Discord - kayleberries
                </Button>

                <Link
                  className="flex items-center w-full justify-center"
                  href="https://github.com/MohammadMazin/emoji-resizer-web"
                  target={"_blank"}
                >
                  <Button variant="outline" className="w-full">
                    <BsGithub size={CONSTANTS.IconSize} className="mr-4" />{" "}
                    Github
                  </Button>
                </Link>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <Link
        href="https://www.buymeacoffee.com/kayleberries"
        target="_blank"
        className="mr-4"
      >
        <Image
          src={coffee_yellow}
          alt="Buy Me A Coffee"
          width={150}
          height={30}
          placeholder="blur"
          className="hover:opacity-80 transition-opacity"
        />
      </Link>
    </div>
  );
};

export default Footer;
