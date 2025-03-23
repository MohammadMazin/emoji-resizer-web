import Discord from "@/components/Discord/Discord";
import Twitch from "@/components/Twitch/Twitch";
import Youtube from "@/components/Youtube/Youtube";
import Options from "@/components/ui/Options";

const CONSTANTS = {
  IconSize: 25,
  MaxImagesAllowed: 15,
  MaxAllowedGIFSizeInMB: 4.5,
  defaultBadges: [
    {
      name: "Staff",
      link: "https://static-cdn.jtvnw.net/badges/v1/d97c37bd-a6f5-4c38-8f57-4e4bef88af34/1",
      selected: false,
    },
    {
      name: "Admin",
      link: "https://static-cdn.jtvnw.net/badges/v1/9ef7e029-4cdf-4d4d-a0d5-e2b3fb2583fe/1",
      selected: false,
    },
    {
      name: "Broadcaster",
      link: "https://static-cdn.jtvnw.net/badges/v1/5527c58c-fb7d-422d-b71b-f309dcb85cc1/1",
      selected: false,
    },
    {
      name: "Moderator",
      link: "https://static-cdn.jtvnw.net/badges/v1/3267646d-33f0-4b17-b3df-f923a41db1d0/1",
      selected: false,
    },
    {
      name: "Verified",
      link: "https://static-cdn.jtvnw.net/badges/v1/d12a2e27-16f6-41d0-ab77-b780518f00a3/3",
      selected: false,
    },
    {
      name: "VIP",
      link: "https://static-cdn.jtvnw.net/badges/v1/b817aba4-fad8-49e2-b88a-7cc744dfa6ec/3",
      selected: false,
    },
    {
      name: "Artist",
      link: "https://assets.help.twitch.tv/article/img/000002399-05.png",
      selected: false,
    },
    {
      name: "Game Developer",
      link: "https://assets.help.twitch.tv/article/img/659115-04a.png",
      selected: false,
    },
    {
      name: "Watching Without Video",
      link: "https://assets.help.twitch.tv/article/img/659115-05.png",
      selected: false,
    },
    {
      name: "Watching Without Audio",
      link: "https://assets.help.twitch.tv/article/img/659115-04.png",
      selected: false,
    },
    {
      name: "Turbo User",
      link: "https://static-cdn.jtvnw.net/badges/v1/bd444ec6-8f34-4bf9-91f4-af1e3428d80f/1",
      selected: false,
    },
    {
      name: "Prime Gaming User",
      link: "https://static-cdn.jtvnw.net/badges/v1/a1dd5073-19c3-4911-8cb4-c464a7bc1510/1",
      selected: false,
    },
    {
      name: "Subscriber",
      link: "https://assets.help.twitch.tv/article/img/000002722-04.png",
      selected: false,
    },
    {
      name: "Founders Badge",
      link: "https://assets.help.twitch.tv/article/img/000002722-05.png",
      selected: false,
    },
    {
      name: "Cheer Chat Badge",
      link: "https://assets.help.twitch.tv/article/img/000002722-06.png",
      selected: false,
    },
    {
      name: "Sub Gifter Badge",
      link: "https://assets.help.twitch.tv/article/img/000002722-07.png",
      selected: false,
    },
    {
      name: "Leaderboard Badge",
      link: "https://assets.help.twitch.tv/article/img/000002722-08.png",
      selected: false,
    },
    {
      name: "Hype Train Badge",
      link: "https://assets.help.twitch.tv/article/img/000002722-09.png",
      selected: false,
    },
  ],
  colors: {
    secondary: "#f8b10d",
  },
  tabs: {
    options: {
      name: "options",
      component: <Options />,
    },
    twitch: {
      name: "twitch",
      component: <Twitch />,
    },
    youtube: {
      name: "youtube",
      component: <Youtube />,
    },
    discord: {
      name: "discord",
      component: <Discord />,
    },
  },
};

export default CONSTANTS;
