import { create } from "zustand";

interface EmoteType {
  label: string;
  name: string;
  sizes: number[];
  selected: boolean;
}

// TODO: Define the type for the state
type EmoteTypeState = {
  types: EmoteType[];
  updateSelectedTypes: (label: string) => void;
};

const typesArray = [
  {
    label: "twitchEmotes",
    name: "Twitch Emotes",
    sizes: [28, 56, 112],
    selected: false,
  },
  {
    label: "twitchBadges",
    name: "Twitch Badges",
    sizes: [18, 36, 72],
    selected: false,
  },
  {
    label: "discordEmotes",
    name: "Discord Emotes",
    sizes: [128],
    selected: false,
  },
  {
    label: "discordStickers",
    name: "Discord Stickers",
    sizes: [320],
    selected: false,
  },
];

const useEmoteTypeStore = create<EmoteTypeState>((set) => ({
  types: typesArray,
  updateSelectedTypes: (label: string) => {
    set((state) => ({
      types: state.types.map((type) =>
        type.label === label ? { ...type, selected: !type.selected } : type
      ),
    }));
  },
}));

export default useEmoteTypeStore;
