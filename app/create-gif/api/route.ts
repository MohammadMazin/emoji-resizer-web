import { NextRequest, NextResponse } from "next/server";
import GIFEncoder from "gif-encoder-custom";
import sharp from "sharp";
import { createCanvas, Image } from "canvas";

const TRANSPARENT_RGB = { r: 255, g: 0, b: 255 };
const TRANSPARENT_COLOR = 0xff00ff;

const base64ToBuffer = (base64: string): Buffer => {
  if (base64.includes(";base64,")) {
    const base64Str = base64.split(";base64,").pop() as string;
    return Buffer.from(base64Str, "base64");
  }

  return Buffer.from(base64, "base64");
};

const processImage = async (base64Img: string, size: number): Promise<Buffer> => {
  const imgBuffer = base64ToBuffer(base64Img);
  const processedBuffer = await sharp(imgBuffer)
    .ensureAlpha()
    .resize(size, size, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();
  return processedBuffer;
};

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();
    const { base64Array, size, delay, quality } = body;

    if (
      !Array.isArray(base64Array) ||
      base64Array.length === 0 ||
      !Number.isFinite(size) ||
      size <= 0
    ) {
      return NextResponse.json(
        { message: "Missing or invalid fields" },
        { status: 400 }
      );
    }

    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext("2d");

    const encoder = new GIFEncoder(size, size);
    encoder.setDelay(Number.isFinite(delay) ? delay : 500);
    encoder.setRepeat(0);
    encoder.setTransparent(TRANSPARENT_COLOR);
    encoder.setQuality(Math.max(1, Math.min(30, (Number(quality) || 10) * 3)));
    encoder.start();

    for (const base64Img of base64Array) {
      const processedBuffer = await processImage(base64Img, size);
      const img = new Image();
      img.src = processedBuffer;

      ctx.clearRect(0, 0, size, size);
      ctx.drawImage(img, 0, 0);
      const frame = ctx.getImageData(0, 0, size, size);

      for (let i = 0; i < frame.data.length; i += 4) {
        if (frame.data[i + 3] === 0) {
          frame.data[i] = TRANSPARENT_RGB.r;
          frame.data[i + 1] = TRANSPARENT_RGB.g;
          frame.data[i + 2] = TRANSPARENT_RGB.b;
        }
      }

      encoder.addFrame(frame.data);
    }

    encoder.finish();

    const resizedGif = encoder.out.getData();

    return NextResponse.json({ resizedGif }, { status: 200 });
  } catch (error) {
    console.log("<SERVER>: Failed to create gif: ", error);
    return NextResponse.json(
      { message: "Failed to create gif", error },
      { status: 500 }
    );
  }
}
