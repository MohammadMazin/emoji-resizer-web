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
      .writeText("kayleberrsssies")
      .then(() => toast.success("Copied Discord username to clipboard!"));
  }

  return (
    <div className="max-w-screen-2xl flex justify-between items-center ml-auto mr-auto">
      <Dialog>
        <DialogTrigger className="mt-auto">
          {" "}
          <Button variant={"link"}>
            Share your feedback{" "}
            <IoAlertCircleOutline
              className={"ml-2"}
              size={CONSTANTS.IconSize}
            />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mt-2">
              Found an issue or have suggestions? You can reach me out on these
              platforms
            </DialogTitle>
            <DialogDescription>
              <div className="flex flex-col gap-4 mt-8">
                <Button
                  variant="outline"
                  className="border-twitter hover:bg-twitter/50 hover:text-foreground"
                >
                  <Link
                    className="flex items-center"
                    href="https://twitter.com/kayleberries"
                    target={"_blank"}
                  >
                    <BsTwitter size={CONSTANTS.IconSize} className="mr-4" />{" "}
                    Twitter
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  className="border-discord hover:bg-discord/50 hover:text-foreground"
                  onClick={copyDiscordUsername}
                >
                  <BsDiscord size={CONSTANTS.IconSize} className="mr-4" />{" "}
                  Discord - kayleberries
                </Button>

                <Button variant="outline">
                  <Link
                    className="flex items-center"
                    href="https://github.com/MohammadMazin/emoji-resizer-web"
                    target={"_blank"}
                  >
                    <BsGithub size={CONSTANTS.IconSize} className="mr-4" />{" "}
                    Github
                  </Link>
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <Link href="https://www.buymeacoffee.com/kayleberries" target="_blank">
        <Image
          src="https://cdn.buymeacoffee.com/buttons/v2/default-violet.png"
          alt="Buy Me A Coffee"
          width={150}
          height={30}
          className="hover:opacity-80"
        />
      </Link>
    </div>
  );
};

export default Footer;
