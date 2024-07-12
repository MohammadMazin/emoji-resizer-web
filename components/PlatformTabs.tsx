"use client";
import usePlatformStore from "@/lib/store/platformStore";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BsGear } from "react-icons/bs";
import CONSTANTS from "@/lib/constanst";
import { useEffect } from "react";

export default function PlatformTabs() {
  const { platforms, setSelectedPlatform, setAllPlatformsAsSelected } =
    usePlatformStore();

  useEffect(() => {
    // TODO: fix if no settings in local storage
    const settingsString = localStorage.getItem("settings");
    if (settingsString) {
      const settings = JSON.parse(settingsString);
      console.log(platforms);
      if (settings.platform) {
        if (settings.platform.twitch) setSelectedPlatform("Twitch", true);
        else setSelectedPlatform("Twitch", false);

        if (settings.platform.discord) setSelectedPlatform("Discord", true);
        else setSelectedPlatform("Discord", false);

        if (settings.platform.youtube) setSelectedPlatform("Youtube", true);
        else setSelectedPlatform("Youtube", false);
      }
    } else {
      setAllPlatformsAsSelected();
    }
  }, []);

  function getBackgroundColor(platform: string): string {
    switch (platform) {
      case "Twitch":
        return "data-[state=active]:bg-twitch";
      case "Discord":
        return "data-[state=active]:bg-discord";
      case "Youtube":
        return "data-[state=active]:bg-youtube";
      default:
        return "";
    }
  }

  return (
    <Tabs defaultValue={CONSTANTS.tabs.options.name}>
      <TabsList className="flex">
        <TabsTrigger value={CONSTANTS.tabs.options.name} className="flex-1">
          <BsGear size={CONSTANTS.IconSize} className="mr-2" />
          <p className="hidden sm:block">Options</p>
        </TabsTrigger>
        {platforms
          .filter((platform) => platform.selected)
          .map((platform) => (
            <TabsTrigger
              value={platform.name.toLowerCase()}
              key={platform.name}
              className={`flex-1 ${getBackgroundColor(platform.name)}`}
            >
              {platform.componentMini}
              <p className="hidden sm:block">{platform.name}</p>
            </TabsTrigger>
          ))}
      </TabsList>
      <TabsContent value={CONSTANTS.tabs.options.name}>
        {CONSTANTS.tabs.options.component}
      </TabsContent>
      <TabsContent value={CONSTANTS.tabs.twitch.name}>
        {CONSTANTS.tabs.twitch.component}
      </TabsContent>
      <TabsContent value={CONSTANTS.tabs.youtube.name}>
        {CONSTANTS.tabs.youtube.component}
      </TabsContent>
      <TabsContent value={CONSTANTS.tabs.discord.name}>
        {CONSTANTS.tabs.discord.component}
      </TabsContent>
    </Tabs>
  );
}
