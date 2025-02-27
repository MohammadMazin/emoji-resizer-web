"use client";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

if (typeof window !== "undefined" && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    enable_recording_console_log: true,
  });
}
export function CSPostHogProvider({ children }: any) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
