import { create } from "zustand";

export interface EmoteType {
  label: string;
  name: string;
  folderName: string;
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
    name: "Emotes",
    folderName: "Twitch Emotes",
    sizes: [28, 56, 112],
    selected: false,
  },
  {
    label: "twitchBadges",
    name: "Badges",
    folderName: "Twitch Badges",
    sizes: [18, 36, 72],
    selected: false,
  },
  {
    label: "discordEmotes",
    name: "Emotes",
    folderName: "Discord Emotes",
    sizes: [128],
    selected: false,
  },
  {
    label: "discordStickers",
    name: "Stickers",
    folderName: "Discord Stickers",
    sizes: [320],
    selected: false,
  },
  {
    label: "youtubeEmotesOrBadges",
    name: "Emotes or Badges",
    folderName: "Youtube Emotes or Badges",
    sizes: [32],
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
