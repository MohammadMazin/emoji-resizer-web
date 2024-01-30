import { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { DialogClose } from "@radix-ui/react-dialog";
import { Settings } from "@/lib/types";
import Image from "next/image";
import CONSTANTS from "@/lib/constanst";
import onboardingImage from "@/public/onboarding.png";

const OnboardingModal = () => {
  useEffect(() => {
    let settings = localStorage.getItem("settings");
    if (settings) {
      const parsedSettings: Settings = JSON.parse(settings);
      if (parsedSettings?.hasOnboarded) return;
    }
    const button = document.getElementById("onboarding-button");
    button!.click();
  }, []);

  function setHasOnboarded() {
    let settings: any = localStorage.getItem("settings");
    if (!settings) settings = { hasOnboarded: true };
    else settings.hasOnboarded = true;
    localStorage.setItem("settings", JSON.stringify(settings));
  }

  return (
    <Dialog>
      <DialogTrigger className="mt-auto">
        <button id="onboarding-button" className="hidden m-0 p-0">
          sss
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mt-2 flex flex-col items-center">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              Emote Resizer
            </h1>
            <h3 className="scroll-m-20 mt-2 text-2xl tracking-tight">
              For Twitch and Discord!
            </h3>
            <Image
              src={onboardingImage}
              width={337}
              height={189}
              alt={"onboading image"}
              placeholder="blur"
              className="mt-4"
            />
          </DialogTitle>
          <DialogDescription>
            <div className="flex flex-col items-center justify-center mt-4">
              <p>
                A site where you can view how your emotes (JPG, PNG, GIF) will
                appear on Twitch and Discord while also being able to resize
                them to meet the requirement of each platform
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={setHasOnboarded} variant="unselected">
              Dont show again
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingModal;
