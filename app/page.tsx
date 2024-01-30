"use client";
import Discord from "@/components/Discord/Discord";
import Options from "@/components/ui/Options";
import Preview from "@/components/ui/Preview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Twitch from "@/components/Twitch/Twitch";
import CONSTANTS from "@/lib/constanst";
import { BsDiscord, BsTwitch, BsGear } from "react-icons/bs";
import OnboardingModal from "@/components/OnboardingModal";

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
    <main className="overflow-hidden">
      <OnboardingModal />
      <div className="flex flex-col min-h-[90vh] lg:flex-row md:h-[90vh] p-4 gap-4 lg:justify-center lg:items-center">
        <section className="h-[30vh] lg:h-full w-full">
          <Preview />
        </section>

        <section className="h-[30vh] lg:h-full w-full">
          <Tabs defaultValue={tabs.options.name} className="flex-1">
            <TabsList className="flex">
              <TabsTrigger value={tabs.options.name} className="flex-1">
                <BsGear size={CONSTANTS.IconSize} className="mr-2" />
                <p className="hidden sm:block">Options</p>
              </TabsTrigger>
              <TabsTrigger
                value={tabs.twitch.name}
                className="flex-1 data-[state=active]:bg-twitch"
              >
                <BsTwitch size={CONSTANTS.IconSize} className="mr-2" />
                <p className="hidden sm:block">Twitch View</p>
              </TabsTrigger>
              <TabsTrigger
                value={tabs.discord.name}
                className="flex-1 data-[state=active]:bg-discord"
              >
                <BsDiscord size={CONSTANTS.IconSize} className="mr-2" />
                <p className="hidden sm:block">Discord View</p>
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
        </section>
      </div>
    </main>
  );
}
