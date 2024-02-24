"use client";
import Discord from "@/components/Discord/Discord";
import Options from "@/components/ui/Options";
import Preview from "@/components/ui/Preview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Twitch from "@/components/Twitch/Twitch";
import CONSTANTS from "@/lib/constanst";
import { BsDiscord, BsTwitch, BsGear } from "react-icons/bs";
import OnboardingModal from "@/components/OnboardingModal";

export default function CreateGif() {
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
      <div className="flex flex-col min-h-[90vh] lg:flex-row md:h-[90vh] p-4 gap-4 lg:justify-center lg:items-center">
        <section className="h-[30vh] lg:h-full w-full">Section 1</section>

        <section className="h-[30vh] lg:h-full w-full">Section 2</section>
      </div>
    </main>
  );
}
