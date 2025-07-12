import { downloadScreenshot } from "@/services/image";
import { Button } from "./ui/button";
import { AiOutlineDownload } from "react-icons/ai";
import CONSTANTS from "@/lib/constants";
import { FaGear } from "react-icons/fa6";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { DialogClose } from "@radix-ui/react-dialog";

export default ScreenshotButton = ({ id }: { id: string }) => {
  const [watermarkName, setWatermarkName] = useState<string | undefined>("");
  const [startColor, setStartColor] = useState(
    CONSTANTS.colors.screenshot.startColor
  );
  const [endColor, setEndColor] = useState(
    CONSTANTS.colors.screenshot.endColor
  );

  const update = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem(
      CONSTANTS.localStorageKeys.screenShotSettings,
      JSON.stringify({
        watermarkName: watermarkName || undefined,
        startColor,
        endColor,
      })
    );
  };

  const resetToDefault = () => {
    setWatermarkName("");
    setStartColor(CONSTANTS.colors.screenshot.startColor);
    setEndColor(CONSTANTS.colors.screenshot.endColor);
    localStorage.setItem(
      CONSTANTS.localStorageKeys.screenShotSettings,
      JSON.stringify({
        watermarkName: undefined,
        startColor: CONSTANTS.colors.screenshot.startColor,
        endColor: CONSTANTS.colors.screenshot.endColor,
      })
    );
  };

  useEffect(() => {
    const settings = localStorage.getItem(
      CONSTANTS.localStorageKeys.screenShotSettings
    );
    if (settings) {
      const parsedSettings = JSON.parse(settings);
      setWatermarkName(parsedSettings.watermarkName || "");
      setStartColor(
        parsedSettings.startColor || CONSTANTS.colors.screenshot.startColor
      );
      setEndColor(
        parsedSettings.endColor || CONSTANTS.colors.screenshot.endColor
      );
    }
  }, []);

  return (
    <div className="flex items-center gap-[2px]">
      <Button onClick={() => downloadScreenshot(id)} className="rounded-e-none">
        <AiOutlineDownload className="mr-1" size={CONSTANTS.IconSize} />{" "}
        Screenshot
      </Button>

      <Dialog>
        <DialogTrigger>
          <Button className="h-full p-3 rounded-s-none">
            <FaGear />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Screenshot Settings</DialogTitle>
            <DialogDescription>
              <br />
              <form className="space-y-4" onSubmit={update}>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium">
                    Watermark Text (Example: Emotes by Kayleberries)
                  </label>
                  <Input
                    type="text"
                    id="watermark-name"
                    onChange={(e) => setWatermarkName(e.target.value)}
                    value={watermarkName}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="flex gap-4 justify-between">
                  <div className="flex-1">
                    <label
                      htmlFor="startColor"
                      className="block text-sm font-medium"
                    >
                      Background Color 1
                    </label>
                    <Input
                      type="color"
                      value={startColor}
                      onChange={(e) => setStartColor(e.target.value)}
                      id="startColor"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div className="flex-1">
                    <label
                      htmlFor="endColor"
                      className="block text-sm font-medium"
                    >
                      Background Color 2
                    </label>
                    <Input
                      type="color"
                      value={endColor}
                      onChange={(e) => setEndColor(e.target.value)}
                      id="endColor"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
                <br />
                <label>Preview</label>
                <div
                  className="min-h-[60px] w-full rounded-lg font-bold text-white px-4 py-2"
                  style={{
                    background: `linear-gradient(to right, ${startColor}, ${endColor})`,
                    fontSize: "1rem",
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  {watermarkName}
                </div>
                <div className="flex justify-between">
                  <Button
                    variant={"unselected"}
                    className="text-white"
                    onClick={resetToDefault}
                  >
                    Reset to Default
                  </Button>
                  <DialogClose asChild>
                    <Button type="submit">Save</Button>
                  </DialogClose>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};
