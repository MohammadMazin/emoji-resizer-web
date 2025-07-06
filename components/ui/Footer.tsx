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
import posthog from "posthog-js";
import CONSTANTS from "@/lib/constants";
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

    posthog.capture("discordUsername_clicked");
  }

  return (
    <div className="max-w-screen-2xl flex  gap-4 justify-between items-center ml-auto mr-auto p-2">
      <Dialog>
        <DialogTrigger className="mt-auto">
          {" "}
          <div className="flex gap-2 text-yellow-500 items-center text-left ps-2 hover:text-yellow-600 transition-colors">
            Share your feedback V1.4.0{" "}
            <IoAlertCircleOutline size={CONSTANTS.IconSize} />
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mt-2">
              Found an issue or have suggestions? You can reach me out on these
              platforms
            </DialogTitle>
            <DialogDescription>
              <div className="flex flex-col justify-center items-center gap-4 mt-8">
                <Button
                  variant="outline"
                  className="border-twitter hover:bg-twitter/50 hover:text-foreground w-full"
                >
                  <Link
                    className="flex items-center w-full justify-center"
                    href="https://twitter.com/kayleberries"
                    target={"_blank"}
                    onClick={() => {
                      posthog.capture("twitter_clicked");
                    }}
                  >
                    <BsTwitter size={CONSTANTS.IconSize} className="mr-4" />{" "}
                    Twitter
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  className="border-discord hover:bg-discord/50 hover:text-foreground w-full justify-center "
                  onClick={copyDiscordUsername}
                >
                  <BsDiscord size={CONSTANTS.IconSize} className="mr-4" />{" "}
                  Discord - kayleberries
                </Button>

                <Button variant="outline" className="w-full">
                  <Link
                    className="flex items-center w-full justify-center"
                    href="https://github.com/MohammadMazin/emoji-resizer-web"
                    target={"_blank"}
                    onClick={() => {
                      posthog.capture("github_clicked");
                    }}
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
          onClick={() => {
            posthog.capture("buyMeACoffee_clicked");
          }}
          className="hover:opacity-80 transition-opacity"
        />
      </Link>
    </div>
  );
};

export default Footer;
