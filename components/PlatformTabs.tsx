"use client";
import usePlatformStore from "@/lib/store/platformStore";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BsGear } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import CONSTANTS from "@/lib/constants";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import Settings from "./Settings";

export default function PlatformTabs() {
  const {
    platforms,
    usernameColor,
    setUsernameColor,
    setChatMessage,
    setSelectedPlatform,
    setAllPlatformsAsSelected,
  } = usePlatformStore();

  const [showAddPlatform, setShowAddPlatform] = useState(false);

  useEffect(() => {
    const settingsString = localStorage.getItem("settings");
    if (settingsString) {
      const settings = JSON.parse(settingsString);
      if (settings.platform) {
        if (settings.platform.twitch) setSelectedPlatform("Twitch", true);
        else setSelectedPlatform("Twitch", false);

        if (settings.platform.discord) setSelectedPlatform("Discord", true);
        else setSelectedPlatform("Discord", false);

        if (settings.platform.youtube) setSelectedPlatform("Youtube", true);
        else setSelectedPlatform("Youtube", false);

        setShowAddPlatform(true);
      } else setAllPlatformsAsSelected();
    } else {
      setAllPlatformsAsSelected();
    }
  }, []);

  useEffect(() => {
    const notAllPlatformsSelected = platforms.some(
      (platform) => platform.selected === false
    );
    if (notAllPlatformsSelected) {
      setShowAddPlatform(true);
      return;
    }
    setShowAddPlatform(false);
  }, [platforms]);

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
    <Tabs
      defaultValue={CONSTANTS.tabs.options.name}
      className="relative h-full flex flex-col"
    >
      <div className="flex items-center">
        <TabsList
          className={`flex flex-1 ${showAddPlatform ? "rounded-e-none" : ""}`}
        >
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
                onClick={(e) => console.log(e.target)}
              >
                {platform.componentMini}
                <p className="hidden sm:block">{platform.name}</p>
              </TabsTrigger>
            ))}
        </TabsList>
        <AddMoreTabs visible={showAddPlatform} />
      </div>

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
      <div className="w-full grid grid-cols-5 md:grid-cols-8 mt-auto items-center gap-2">
        <p>Color</p>
        <p className="col-span-4 md:col-span-7">Chat Message</p>
        <Input
          type="color"
          className=""
          value={usernameColor}
          onChange={(e) => setUsernameColor(e.target.value)}
        />
        <Input
          placeholder="hi i love your stream, do you sell cakes?"
          onChange={(e) => setChatMessage(e.target.value)}
          className="col-span-4 md:col-span-7"
        />
      </div>
    </Tabs>
  );
}

const AddMoreTabs = ({ visible }: { visible: boolean }) => {
  if (visible)
    return (
      <Sheet>
        <SheetTrigger>
          <span className="relative flex p-2 bg-gray-400 text-primary-foreground/80 border-s-2 border-primary-foreground/80 rounded-e-sm">
            <FaPlus size={24} className="hover:opacity-75 transition-opacity" />
          </span>
        </SheetTrigger>
        <Settings />
      </Sheet>
    );
  return null;
};
