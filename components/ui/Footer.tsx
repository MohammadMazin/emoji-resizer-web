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
    <Dialog>
      <DialogTrigger className="mt-auto mr-auto">
        {" "}
        <Button variant={"link"}>
          Share your feedback{" "}
          <IoAlertCircleOutline className={"ml-2"} size={CONSTANTS.IconSize} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mt-2">
            Found an issue have a suggestion? You can reach me out on these
            platforms
          </DialogTitle>
          <DialogDescription>
            <div className="flex flex-col gap-4 mt-8">
              <Button variant="outline">
                <Link
                  className="flex items-center"
                  href="https://twitter.com/kayleberries"
                  target={"_blank"}
                >
                  <BsTwitter className="mr-4" /> Twitter
                </Link>
              </Button>

              <Button variant="outline">
                <Link
                  className="flex items-center"
                  href="https://github.com/MohammadMazin/emoji-resizer-web"
                  target={"_blank"}
                >
                  <BsGithub className="mr-4" /> Github
                </Link>
              </Button>

              <Button variant="outline" onClick={copyDiscordUsername}>
                <BsDiscord className="mr-4" /> Discord - kayleberries
              </Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default Footer;
