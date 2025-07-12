import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import CONSTANTS from "./constants";
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getScreenshotSettings = (): {
  watermarkName: string | undefined,
  startColor:string,
  endColor: string,
} => {
  const settings = localStorage.getItem(
    "screenShotSettings"
  );
  if (settings) {
    return JSON.parse(settings);
  }
  return {
    watermarkName: "",
    startColor: CONSTANTS.colors.screenshot.startColor,
    endColor: CONSTANTS.colors.screenshot.endColor,
  };
}