"use client";
import Discord from "@/components/ui/Discord";
import Options from "@/components/ui/Options";
import Preview from "@/components/ui/Preview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Twitch from "@/components/ui/Twitch";
import CONSTANTS from "@/lib/constanst";
import { BsDiscord, BsGithub, BsTwitch, BsTwitter } from "react-icons/bs";

export default function Home() {
  const tabs = {
    options: {
      name: "options",
      component: <Options />,
    },
    twitch: {
      name: "twitch",
      component: <Twitch />,
    },
    discord: {
      name: "discord",
      component: <Discord />,
    },
  };

  return (
    <main>
      <div className="flex flex-col md:flex-row h-[90vh]">
        <Preview />
        <Tabs defaultValue={tabs.options.name} className="flex-1">
          <TabsList className="flex">
            <TabsTrigger value={tabs.options.name} className="flex-1">
              Options
            </TabsTrigger>
            <TabsTrigger
              value={tabs.twitch.name}
              className="flex-1 data-[state=active]:bg-twitch"
            >
              <BsTwitch size={CONSTANTS.IconSize} className="mr-2" /> View on
              Twitch
            </TabsTrigger>
            <TabsTrigger
              value={tabs.discord.name}
              className="flex-1 data-[state=active]:bg-discord"
            >
              <BsDiscord size={CONSTANTS.IconSize} className="mr-2" />
              View on Discord
            </TabsTrigger>
          </TabsList>
          <TabsContent value={tabs.options.name}>
            {tabs.options.component}
          </TabsContent>
          <TabsContent value={tabs.twitch.name}>
            {tabs.twitch.component}
          </TabsContent>
          <TabsContent value={tabs.discord.name}>
            {tabs.discord.component}
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
