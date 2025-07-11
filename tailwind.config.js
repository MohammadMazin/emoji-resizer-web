/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    fontSize: {
      "yt-username": "13px",
      "yt-time": "12px",
      "yt-message": "14px",
      sx: "13px",
      sm: "1rem",
      twitch: "hsl(var(--twitch-text))",
      base: "2rem",
      xl: "1.25rem",
      "2xl": "1.563rem",
      "3xl": "1.953rem",
      "4xl": "2.441rem",
      "5xl": "3.052rem",
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        md: "800px",
        lg: "1024px",
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        twitch: {
          DEFAULT: "hsl(var(--twitch))",
          "chat-dark": "hsl(var(--twitch-chat-dark))",
          "chat-dark-hover": "hsl(var(--twitch-chat-dark-hover))",
          "chat-light": "hsl(var(--twitch-chat-light))",
          "chat-light-hover": "hsl(var(--twitch-chat-light-hover))",
        },
        youtube: {
          DEFAULT: "hsl(var(--youtube))",
          "chat-dark": "hsl(var(--youtube-chat-dark))",
          "chat-dark-hover": "hsl(var(--youtube-chat-dark-hover))",
          "chat-light": "hsl(var(--youtube-chat-light))",
          "chat-light-hover": "hsl(var(--youtube-chat-light-hover))",
        },
        discord: {
          DEFAULT: "hsl(var(--discord))",
          100: "hsl(235, 85%, 95%)",
          "chat-dark": "hsl(var(--discord-chat-dark))",
          "chat-dark-hover": "hsl(var(--discord-chat-dark-hover))",
          "chat-light": "hsl(var(--discord-chat-light))",
          "chat-light-hover": "hsl(var(--discord-chat-light-hover))",
        },
        twitter: {
          DEFAULT: "hsl(203, 89%, 53%)",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
