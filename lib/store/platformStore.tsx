import { ReactNode } from "react";
import { BsDiscord, BsTwitch, BsYoutube } from "react-icons/bs";
import { create } from "zustand";
import CONSTANTS from "../constanst";

interface Platforms {
  name: string;
  component: JSX.Element;
  componentMini: JSX.Element;
  selected: boolean;
}

// TODO: Define the type for the state
// todo change name from updateSelectedPlatform to toggleSelectedPlatform
type PlatformsState = {
  platforms: Platforms[];
  updateSelectedPlatform: (name: string) => void;
  setAllPlatformsAsSelected: () => void;
  setSelectedPlatform: (name: string, value: boolean) => void;
};

const platforms = [
  {
    name: "Twitch",
    component: <BsTwitch size={38} className="text-twitch" />,
    componentMini: <BsTwitch size={CONSTANTS.IconSize} className="mr-2" />,
    selected: false,
  },
  {
    name: "Discord",
    component: <BsDiscord size={38} className="text-discord" />,
    componentMini: <BsDiscord size={CONSTANTS.IconSize} className="mr-2" />,
    selected: false,
  },
  {
    name: "Youtube",
    component: <BsYoutube size={38} className="text-youtube" />,
    componentMini: <BsYoutube size={CONSTANTS.IconSize} className="mr-2" />,
    selected: false,
  },
];

const usePlatformStore = create<PlatformsState>((set) => ({
  platforms,
  updateSelectedPlatform: (name: string) => {
    set((state) => ({
      platforms: state.platforms.map((platform) =>
        platform.name === name
          ? { ...platform, selected: !platform.selected }
          : platform
      ),
    }));
  },
  setSelectedPlatform: (name: string, value: boolean) => {
    set((state) => ({
      platforms: state.platforms.map((platform) =>
        platform.name === name ? { ...platform, selected: value } : platform
      ),
    }));
  },
  setAllPlatformsAsSelected: () => {
    set((state) => ({
      platforms: state.platforms.map((platform) => {
        return { ...platform, selected: true };
      }),
    }));
  },
}));

export default usePlatformStore;
