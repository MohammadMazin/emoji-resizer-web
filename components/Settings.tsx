"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import usePlatformStore from "@/lib/store/platformStore";
import { Button } from "./ui/button";
import { BsDiscord, BsTwitch, BsYoutube } from "react-icons/bs";

export default function Settings() {
  const { platforms, updateSelectedPlatform } = usePlatformStore();

  function setSelectedPlatform(name: string) {
    updateSelectedPlatform(name);
    let settingsString = localStorage.getItem("settings");
    if (settingsString) {
      const settings = JSON.parse(settingsString);
      console.log(settings);
      console.log(platforms);

      settings.platform = {
        twitch: platforms[0].selected,
        discord: platforms[1].selected,
        youtube: platforms[2].selected,
      };
      settings.platform[name.toLowerCase()] =
        !settings.platform[name.toLowerCase()];
      localStorage.setItem("settings", JSON.stringify(settings));
    } else {
      const settings = {
        platform: { twitch: true, discord: true, youtube: true },
      };
      settings.platform = {
        twitch: platforms[0].selected,
        discord: platforms[1].selected,
        youtube: platforms[2].selected,
      };
      settings.platform[name.toLowerCase() as keyof typeof settings.platform] =
        !settings.platform[
          name.toLowerCase() as keyof typeof settings.platform
        ];
      localStorage.setItem("settings", JSON.stringify(settings));
    }
  }

  function generateButton(platform: string): JSX.Element | undefined {
    switch (platform) {
      case "Twitch":
        return <BsTwitch size={38} className="text-twitch" />;
      case "Discord":
        return <BsDiscord size={38} className="text-discord" />;
      case "Youtube":
        return <BsYoutube size={38} className="text-youtube" />;
    }
  }

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Settings</SheetTitle>
        <SheetDescription>Choose your platforms</SheetDescription>
        <div className="flex flex-wrap gap-4">
          {platforms.map((platform) => (
            <Button
              variant={platform.selected ? "selected" : "unselected"}
              key={platform.name}
              onClick={() => setSelectedPlatform(platform.name)}
              className={`hover:opacity-100 transition-opacity ${
                platform.selected ? "opacity-100" : "opacity-50"
              }`}
            >
              {generateButton(platform.name)}
            </Button>
          ))}
        </div>
      </SheetHeader>
    </SheetContent>
  );
}
