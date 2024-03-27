import { NextRequest, NextResponse } from "next/server";
import GIFEncoder from 'gif-encoder-custom';
import sharp from 'sharp';
import { createCanvas, Image } from 'canvas';

const base64ToBuffer = (base64: string) => {
    const base64Str = base64.split(';base64,').pop() as string;
    return Buffer.from(base64Str, 'base64');
};

const processImage = async (base64Img: string, size: number) => {
    const imgBuffer = base64ToBuffer(base64Img);
    const processedBuffer = await sharp(imgBuffer)
        .resize(size, size)
        .toBuffer();
    return processedBuffer;
};

const findTransparentColor = async (base64Array: string[], size: number) => {
  const colorCounts = {};

  for (const base64Img of base64Array) {
    const processedBuffer = await processImage(base64Img, size);
    const image = await sharp(processedBuffer).raw().toBuffer();
    
    for (let i = 0; i < image.length; i += 4) {
      const color = image.slice(i, i + 3).toString();
      colorCounts[color] = (colorCounts[color] || 0) + 1;
    }
  }

  let transparentColor = null;
  let minCount = Infinity;
  for (const color in colorCounts) {
    if (colorCounts[color] < minCount) {
      transparentColor = color;
      minCount = colorCounts[color];
    }
  }

  return parseInt(transparentColor as string, 10);
};

export async function POST(req: NextRequest, res:NextResponse) {
  try {
    const body = await req.json()
    const { base64Array, size , delay,quality} = body

    const canvas = createCanvas(size, size)
    const ctx = canvas.getContext('2d')

    const encoder = new GIFEncoder(size, size)
    encoder.setDelay(delay)
    encoder.setRepeat(0)
    const transparentColor = await findTransparentColor(base64Array, size)
    console.log('c: ',transparentColor)
    encoder.setTransparent(0xFFF)
    encoder.setQuality(quality*3)
    encoder.start()

    for (const base64Img of base64Array) {
      const processedBuffer = await processImage(base64Img, size)
      const img = new Image()
      img.src = processedBuffer

      ctx.clearRect(0, 0, size, size)

      ctx.drawImage(img, 0, 0)
      encoder.addFrame(ctx)
    }

    encoder.finish()

    const resizedGif = encoder.out.getData()

    return NextResponse.json(
      { resizedGif },
      { status: 200 }
    );
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: "Failed to resize gif", error },
      { status: 404 }
    )
  }
}
